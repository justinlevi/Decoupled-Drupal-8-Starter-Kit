import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withApollo } from 'react-apollo';

import Gallery from "components/frames/gallery/Gallery";

import { readFile } from 'utils/ImageHelpers';
import { getSignedUrls, addS3Files, updatePageMutation } from 'api/queries';

export class GalleryFrame extends Component {

  static propTypes = {
    activeNode: PropTypes.object.isRequired
  }

  /*
  * Constructor
  * ----------------------
  */
  constructor(props){
    super(props);

    const uploadPath = props.activeNode.author.name + '/' + props.activeNode.uuid + '/';
    this.state = {
      totalBytes: 0,
      title: 'null',
      body: '',
      mids: [],
      files: [],
      maxWidth: 400,
      maxHeight: 225,
      uploading: false,
      uploadPath: '',
      uploadPath: uploadPath
    };
  }

  /*
  * Computed Properties
  * ----------------------
  */

  computedPath = (files) => {
    return files.map(f => { return this.state.uploadPath + f.file.name; })
  }

  computedFileIndex = (files, file) => {
    return files.findIndex((f) => { return f.file.name === file.name;});
  }

  computedTotalBytes = (files) => {
    // calculate total file size
    var totalBytes = files
    .map(f => { return f.file.size || f.file.fileSize;})
    .reduce((a, c) => { return a + c; }, 0);
    return totalBytes;
  }

  isAllFilesUploaded = (files) => {
    const finished = files.filter((f) => {
      return f.file.uploadSuccess ? false : true;
    });

    return finished.length === 0 ? true : false;
  }

  /*
  * Utilities
  * ----------------------
  */

  setPropOnFile = (file, prop, value) => {
    const newFiles = this.state.files;
    const index = this.computedFileIndex(newFiles, file);
    if(index >= 0){
      newFiles[index].file[prop] = value;
      this.setState({files: newFiles});
    }
  }

  createFileObject = (file, index) => {
    const { maxWidth, maxHeight } = this.state;
    readFile(file, maxWidth, maxHeight, (resizeDataUrl) => {
      let fileObject = {
        file: file,
        thumbnail: resizeDataUrl
      }

      this.setState({
        files:[
          ...this.state.files,
          fileObject
        ]
      })
    });
  }

  handleDelete = (index) => {
    let newFileArray = this.state.files;
    newFileArray.splice(index,1);
    this.setState({
      files: newFileArray,
    });
  }

  handleCancel = (index) => {
    this.state.files[index].cancel();
    this.handleDelete(index);
  }

  catchError = (error) => {
    console.log('Error ' + error);
  }

  onDrop = (files) => {
    const len = files.length;
    for (var i = 0; i < len; i++) {
      let file = files[i];
      // Only process image files.
      if (!file.type.match('image.*')) { continue; }
      this.createFileObject(file, i);
    }
  };


  /**
  * NETWORKING - REMOTE FETCH/GRAPHQL
  * ASYNC Sequential Upload and Drupal Sync Steps
  * 1. Upload button clicked
  * 2. Get Signed S3 Upload URLsFiles
  * 3. Upload files to S3 w/ Progress , Sync with DASYNC Series
  * ----------------------
  */


  // STEP 1 - Upload button clicked
  onUploadClick = () => {
    this.setState({ uploading: true });
    const files = this.state.files;
    this.fetchSignedUrls(files, this.onFetchSignedUrlsCompletionHandler);
  }

  // STEP 2 - Fetch remote upload Urls
  fetchSignedUrls = (files, onFetchSignedUrlsCompletionHandler = () => {}) => {
    this.setState({ uploading: true });
    const variables = {"input": {"fileNames": this.computedPath(files)}};
    this.props.client.query({ query: getSignedUrls, variables: variables})
    .then(response => {
      // send signedUrls to callback
      onFetchSignedUrlsCompletionHandler(files, response.data.signedUploadURL)
    }).catch(this.catchError);
  }

  onFetchSignedUrlsCompletionHandler = (files, signedUrls) => {
    // Assumptions: the returned signedURLs order matches the files state - always the case?
    signedUrls.map(
      (item,i) => {
        this.handleUpload(item, files[i].file, this.onUploadCompletionHandler);
        return true;
      }
    )
  }

  // STEP 3 - Upload to S3 w/ progress
  handleUpload = (signedUrl, file, onUploadCompletionHandler = () => {}) => {
    const CancelToken = axios.CancelToken;
    let cancel;
    const config = {
      headers: {'Content-Type': file.type},
      onUploadProgress: progressEvent => {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        // update progress on image object
        this.setPropOnFile(file, 'percentCompleted', percentCompleted);
      },
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      })
    };

    const {files} = this.state;
    axios.put(signedUrl, file, config)
    .then((response) => {
      this.setPropOnFile(file, 'uploadSuccess', true);
      if (this.isAllFilesUploaded(files)){
        console.log('ALL FILES ARE UPLOADED')
        onUploadCompletionHandler()
      }
    }).catch(error => {
      if(axios.isCancel(error)) {
        if (this.isAllFilesUploaded(files)){
          console.log('ALL FILES ARE UPLOADED')
          onUploadCompletionHandler()
        }
      }else{
        console.log('Error ' + error)
      }
    });

    if(this.state.files.length > 0){
      let localFileArray = this.state.files;

      for(let i = 0; i < localFileArray.length; i++){
        if(localFileArray[i].file.name === file.name){
          let curFile = localFileArray[i];
          curFile['cancel'] = cancel;

          this.setState({
            ...this.state.files,
            curFile
          })

        }
      }
    }

    this.setPropOnFile(file, 'uploadInitiated', true);
  }

  onUploadCompletionHandler = () => {
    this.syncS3FilesBackToDrupalAndCreateMediaEntities(this.state.files, this.onSyncCompletionHandler);
  }

  // STEP 4 - SyncS3withDrupal
  syncS3FilesBackToDrupalAndCreateMediaEntities(files, onSyncCompletionHandler = () => {} ){
    const p = this.state.uploadPath;
    const filesMap = files.map(f => {
      return {
        filename: f.file.name,
        filesize: f.file.size,
        url: p + f.file.name
      };
    });

    this.setState({ synchronizing: true });
    const variables = {"input": {"files": filesMap}};
    this.props.client.mutate({ mutation: addS3Files, variables: variables})
    .then(response => {
      // send signedUrls to callback
      console.log('SYNC COMPLETE')
      const mids = response.data.addS3Files.map(item => { return item.mid});
      onSyncCompletionHandler(mids)
    }).catch(this.catchError);
  }

  onSyncCompletionHandler = (mids) => {
    this.updateNode(mids);
    setTimeout(() => { this.setState({files:[]}); }, 500);
  }

  //STEP 5 -
  updateNode = (mids = []) => {
    const activeMids = this.props.activeNode.images.map((item) => { return item.mid })
    const newMids = mids.concat(activeMids).concat(this.state.mids);
    const variables = {
      id: Number(this.props.activeNode.nid), 
      title: this.props.activeNode.title,
      body: this.props.activeNode.body.value,
      field_media_image: newMids
    };

    this.props.client.mutate({ mutation: updatePageMutation, variables: variables})
    .then(response => {
      // send signedUrls to callback
      if(response.data.updatePage.page !== null){
        console.log('UPDATE PAGE WITH UPLOADED MEDIA COMPLETE');
      }else{
        console.error("ERROR: The page was not updated correctly")
      }
      this.setState({mids: newMids});
    }).catch(this.catchError);
  }

  /*
  * Render
  * ----------------------
  */

  render() {
    return <Gallery 
    onDrop={this.onDrop} 
    computedTotalBytes={this.computedTotalBytes} 
    onUploadClick={this.onUploadClick}
    handleCancel={this.handleCancel}
    handleDelete={this.handleDelete}
    {...this.state} />
  }

}

export const GalleryFrameWrapper = withApollo(GalleryFrame);
export default GalleryFrameWrapper; 
