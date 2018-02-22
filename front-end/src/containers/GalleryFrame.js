import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withApollo } from 'react-apollo';

import Gallery from 'components/frames/gallery/Gallery';

import { readFile } from 'utils/ImageHelpers';
import { getSignedUrls, addS3Files, updatePageMutation } from 'api/apolloProxy';

export class GalleryFrame extends Component {
  /*
  * Constructor
  * ----------------------
  */
  constructor(props) {
    super(props);

    const uploadPath = `${props.activeNode.author.name}/${props.activeNode.uuid}/`;
    this.state = {
      title: 'null',
      body: '',
      mids: [],
      files: [],
      maxWidth: 400,
      maxHeight: 225,
      uploading: false,
      uploadPath,
    };
  }

  /*
  * Utilities
  * ----------------------
  */

  onDrop = (files) => {
    const len = files.length;
    for (let i = 0; i < len; i += 1) {
      const file = files[i];
      // Only process image files.
      if (!file.type.match('image.*')) { break; }
      this.createFileObject(file, i);
    }
  };

  // STEP 1 - Upload button clicked
  onUploadClick = () => {
    this.setState({ uploading: true });
    const { files } = this.state;
    this.fetchSignedUrls(files, this.onFetchSignedUrlsCompletionHandler);
  }

  onFetchSignedUrlsCompletionHandler = (files, signedUrls) => {
    // Assumptions: the returned signedURLs order matches the files state - always the case?
    signedUrls.map((item, i) => {
      this.handleUpload(item, files[i].file, this.onUploadCompletionHandler);
      return true;
    });
  }

  onUploadCompletionHandler = () => {
    this.syncS3FilesBackToDrupalAndCreateMediaEntities(
      this.state.files,
      this.onSyncCompletionHandler,
    );
  }

  onSyncCompletionHandler = (mids) => {
    this.updateNode(mids);
    setTimeout(() => { this.setState({ files: [] }); }, 500);
  }

  setPropOnFile = (file, prop, value) => {
    const newFiles = this.state.files;
    const index = this.computedFileIndex(newFiles, file);
    if (index >= 0) {
      newFiles[index].file[prop] = value;
      this.setState({ files: newFiles });
    }
  }

  /*
  * Computed Properties
  * ----------------------
  */

  computedPath = files => files.map(f => this.state.uploadPath + f.file.name)

  computedFileIndex = (files, file) => files.findIndex(f => f.file.name === file.name)

  totalBytes = (files) => {
    // calculate total file size
    const totalBytes = files
      .map(f => f.file.size || f.file.fileSize)
      .reduce((a, c) => a + c, 0);
    return totalBytes;
  }

  isAllFilesUploaded = (files) => {
    const finished = files.filter(f => (!f.file.uploadSuccess));

    return finished.length === 0;
  }

  createFileObject = (file) => {
    const { maxWidth, maxHeight } = this.state;
    readFile(file, maxWidth, maxHeight, (resizeDataUrl) => {
      const fileObject = {
        file,
        thumbnail: resizeDataUrl,
      };

      this.setState({
        files: [
          ...this.state.files,
          fileObject,
        ],
      });
    });
  }

  handleDelete = (index) => {
    const newFileArray = this.state.files;
    newFileArray.splice(index, 1);
    this.setState({
      files: newFileArray,
    });
  }

  handleCancel = (index) => {
    this.state.files[index].cancel();
    this.handleDelete(index);
  }

  catchError = (error) => {
    console.log(`Error ${error}`);
  }

  /**
  * NETWORKING - REMOTE FETCH/GRAPHQL
  * ASYNC Sequential Upload and Drupal Sync Steps
  * 1. Upload button clicked
  * 2. Get Signed S3 Upload URLsFiles
  * 3. Upload files to S3 w/ Progress , Sync with DASYNC Series
  * ----------------------
  */

  // STEP 2 - Fetch remote upload Urls
  fetchSignedUrls = (files, onFetchSignedUrlsCompletionHandler = () => {}) => {
    const { client } = this.props;
    this.setState({ uploading: true });
    const variables = { input: { fileNames: this.computedPath(files) } };
    client.query({ query: getSignedUrls, variables })
      .then((response) => {
      // send signedUrls to callback
        onFetchSignedUrlsCompletionHandler(files, response.data.signedUploadURL);
      }).catch(this.catchError);
  }

  // STEP 3 - Upload to S3 w/ progress
  handleUpload = (signedUrl, file, onUploadCompletionHandler = () => {}) => {
    const { CancelToken } = axios;
    let cancel;
    const config = {
      headers: { 'Content-Type': file.type },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        // update progress on image object
        this.setPropOnFile(file, 'percentCompleted', percentCompleted);
      },
      cancelToken: new CancelToken(((c) => {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      })),
    };

    const { files } = this.state;
    axios.put(signedUrl, file, config)
      .then(() => {
        this.setPropOnFile(file, 'uploadSuccess', true);
        if (this.isAllFilesUploaded(files)) {
          console.log('ALL FILES ARE UPLOADED');
          onUploadCompletionHandler();
        }
      }).catch((error) => {
        if (axios.isCancel(error)) {
          if (this.isAllFilesUploaded(files)) {
            console.log('ALL FILES ARE UPLOADED');
            onUploadCompletionHandler();
          }
        } else {
          console.log(`Error ${error}`);
        }
      });

    if (this.state.files.length > 0) {
      const localFileArray = this.state.files;

      for (let i = 0; i < localFileArray.length; i += 1) {
        if (localFileArray[i].file.name === file.name) {
          const curFile = localFileArray[i];
          curFile.cancel = cancel;

          this.setState({
            ...this.state.files,
            curFile,
          });
        }
      }
    }

    this.setPropOnFile(file, 'uploadInitiated', true);
  }

  // STEP 4 - SyncS3withDrupal
  syncS3FilesBackToDrupalAndCreateMediaEntities(files, onSyncCompletionHandler = () => {}) {
    const { client } = this.props;
    const p = this.state.uploadPath;
    const filesMap = files.map(f => ({
      filename: f.file.name,
      filesize: f.file.size,
      url: p + f.file.name,
    }));

    this.setState({ synchronizing: true });
    const variables = { input: { files: filesMap } };
    client.mutate({ mutation: addS3Files, variables })
      .then((response) => {
      // send signedUrls to callback
        console.log('SYNC COMPLETE');
        const mids = response.data.addS3Files.map(item => item.mid);
        onSyncCompletionHandler(mids);
      }).catch(this.catchError);
  }

  // STEP 5 -
  updateNode = (mids = []) => {
    const { client, activeNode } = this.props;
    const activeMids = activeNode.images.map(item => item.mid);
    const newMids = mids.concat(activeMids).concat(this.state.mids);

    const variables = {
      id: Number(activeNode.nid),
      title: activeNode.title,
      body: activeNode.body.value,
      field_media_image: newMids,
    };

    client.mutate({ mutation: updatePageMutation, variables })
      .then((response) => {
      // send signedUrls to callback
        if (response.data.updatePage.page !== null) {
          console.log('UPDATE PAGE WITH UPLOADED MEDIA COMPLETE');
        } else {
          console.error('ERROR: The page was not updated correctly');
        }
        this.setState({ mids: newMids });
      }).catch(this.catchError);
  }

  /*
  * Render
  * ----------------------
  */

  render() {
    return (<Gallery
      onDrop={this.onDrop}
      totalBytes={this.totalBytes}
      onUploadClick={this.onUploadClick}
      handleCancel={this.handleCancel}
      handleDelete={this.handleDelete}
      {...this.state}
    />);
  }
}

GalleryFrame.propTypes = {
  client: PropTypes.func.isRequired,
  activeNode: PropTypes.object.isRequired,
};

export const GalleryFrameWrapper = withApollo(GalleryFrame);
export default GalleryFrameWrapper;
