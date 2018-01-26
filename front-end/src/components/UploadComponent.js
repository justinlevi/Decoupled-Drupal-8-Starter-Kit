import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// handles browser nuances with drag/drop
import Dropzone from 'react-dropzone';

import Thumbnails from './Thumbnails';
import BrowseButton from './BrowseButton';
import { readFile } from './ImageHelpers';

import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

import './UploadComponent.css';

const initialState = {
  totalBytes: 0,
  pid: 0,
  files: [],
  thumbnails: [],
  maxWidth: 400,
  maxHeight: 225,
  uploading: false,
  uploadPath: ''
};

class UploadComponent extends Component {

  static propTypes = {
    username: PropTypes.string.isRequired,
    pid: PropTypes.string.isRequired
  }

  dropzoneRef = undefined;

  /*
  * Constructor
  * ----------------------
  */
  constructor(props){
    super(props);

    const uploadPath = props.username + '/' + props.pid + '/';
    this.state = {
      ...initialState, 
      uid: props.uid, 
      pid: props.pid, 
      uploadPath: uploadPath
    };

    this.onDrop = this.onDrop.bind(this);
    this.onUploadClick = this.onUploadClick.bind(this); 
    this.handleDelete = this.handleDelete.bind(this); 
  }

  /*
  * Computed Properties
  * ----------------------
  */

  computedPath = (files) => { 
    return files.map(f => { return this.state.uploadPath + f.name; }) 
  }

  computedFileIndex = (files, file) => {
    return files.findIndex((f) => { return f.name === file.name;});
  }

  computedTotalBytes = (files) => {
    // calculate total file size
    var totalBytes = files
    .map(f => { return f.size || f.fileSize;})
    .reduce((a, c) => { return a + c; }, 0);
    return totalBytes;
  }

  /*
  * Utilities
  * ----------------------
  */

  setPropOnFile = (file, prop, value) => {
    const newFiles = this.state.files;
    const index = this.computedFileIndex(newFiles, file);
    if(index >= 0){
      newFiles[index][prop] = value;
      this.setState({files: newFiles});
    }
  }

  createThumbnail = (file, index) => {
    const { maxWidth, maxHeight } = this.state;
    readFile(file, maxWidth, maxHeight, (resizeDataUrl) => {
      let newThumbnails = this.state.thumbnails;
      newThumbnails.splice(index, 0, resizeDataUrl);
      this.setState({
        thumbnails: newThumbnails
      });
    });
  }

  handleDelete = (index) => {
    let newFileArray = this.state.files;
    let newThumbnailArray = this.state.thumbnails;
    newFileArray.splice(index,1);
    newThumbnailArray.splice(index,1);
    this.setState({
      files: newFileArray,
      thumbnails: newThumbnailArray
    });
  }

  handleCancel = (index) => {
    // TODO
  }

  /*
  * Remote Networking 
  * ----------------------
  */

  fetchSignedUrls = (files, onFetchComplete) => {
    this.setState({ uploading: true });
    const variables = {"input": {"fileNames": this.computedPath(files)}};
    this.props.client.query({ query: getSignedUrls, variables: variables})
    .then(response => {
      // send signedUrls to callback
      onFetchComplete(response.data.signedUploadURL)
    }).catch((error) => {
      console.log('error ' + error);
    });
  }

  handleUpload = (signedUrl, file) => {
    const config = {
      headers: {
          'Content-Type': file.type
      },
      onUploadProgress: progressEvent => {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        // update progress on image object
        this.setPropOnFile(file, 'percentCompleted', percentCompleted);
      }
    };

    axios.put(signedUrl, file, config)
    .then((response) => {
      this.setPropOnFile(file, 'uploadSuccess', true);
      this.onUploadComplete(this.state.files)
    }).catch((error) => {
      console.log('error ' + error);
    });
    this.setPropOnFile(file, 'uploadInitiated', true);
  }

  syncS3FilesWithDrupalS3fs(files, onSyncComplete = () => {} ){

    const p = this.state.uploadPath;
    const filesMap = files.map(f => { 
      return {
        filename: f.name,
        filesize: f.size,
        url: p + f.name
      }; 
    });

    this.setState({ synchronizing: true });
    const variables = {"input": {"files": filesMap}};
    this.props.client.mutate({ mutation: addS3Files, variables: variables})
    .then(response => {
      // send signedUrls to callback
        console.log('SYNC COMPLETE')
        onSyncComplete()
    }).catch((error) => {
      console.log('error ' + error);
    });
  }

  /*
  * Event Handling
  * ----------------------
  */

  onUploadClick = () => {
    this.setState({ uploading: true });
    const files = this.state.files;
    this.fetchSignedUrls(files, (signedUrls) => {
      // Assumptions: the returned signedURLs order matches the files state - always the case?
      signedUrls.map(
        (item,i) => {
          this.handleUpload(item, files[i]);
          return true;
        }
      )
    });
  }

  onUploadComplete = (files) => {
    if ( files.filter((f) => {
      return f.uploadSuccess ? false : true; 
    }).length === 0 ) {
      setTimeout(() => { 
        this.syncS3FilesWithDrupalS3fs(files, 
          () => {
            this.setState({
              files: [], 
              thumbnails: [],
              uploading: false
            }); 
          }
        );
      }, 500);   
    }
  }

  onDrop = (files) => {
    const newFiles = [];
    const len = files.length;
    for (var i = 0; i < len; i++) {
      let file = files[i];
      // Only process image files.
      if (!file.type.match('image.*')) { continue; }
      this.createThumbnail(file, i);
      newFiles.push(file);
    }
    this.setState({files: [...this.state.files, ...newFiles]});
  };

  /*
  * Render
  * ----------------------
  */

  render() {
    return (
      <div className="uploadComponentContainer">

        { this.state.uploading === false ? 
          <Dropzone ref={(node) => { this.dropzoneRef = node; }} onDrop={this.onDrop} id="dropZone" className="dropZone" disabled={this.state.uploading} >
            <p>Drop your files here or click to browse.</p>
          </Dropzone>
        : null }

        { this.state.uploading === false ? 
          <BrowseButton files={this.state.files} totalBytes={this.computedTotalBytes(this.state.files)} totalFiles={this.state.files.length} render={ () => (
            <button type="button" onClick={() => { this.dropzoneRef.open() }} disabled={this.state.uploadInitiated} >
                Choose Files
            </button>
          )} />
        : null }

        { this.state.files.length > 0 ? <button className={"btn btn-primary"} onClick={this.onUploadClick}>UPLOAD FILES</button>: null }

        <output id="list" className="container">
          <div className={"grid"}>
            {
              this.state.thumbnails.map((thumbnail, i) => { 
                const image = this.state.files[i];
                return <Thumbnails key={i} handleDelete={this.handleDelete} index={i} 
                  fileSize={image.size || image.fileSize} 
                  fileName={image.name} 
                  percentageComplete={image.percentCompleted ? image.percentCompleted : 0 } 
                  uploadInitiated={image.uploadInitiated ? image.uploadInitiated : false } 
                  uploadSuccess={image.uploadSuccess ? true : false } 
                  render={ () => (
                    <figure>
                      <img alt={""} src={thumbnail} className={"responsive-image"}/>
                    </figure>
                  )} /> 
              })
            }
          </div>
        </output>
      </div>
    )
  }
}

const getSignedUrls = gql `
query signedUploadURL ($input: SignedUploadInput!) {
  signedUploadURL(input:$input)
}
`;

const addS3Files = gql `
mutation addS3Files($input: S3FilesInput!) {
  addS3Files(input:$input)
}
`;

export default withApollo(UploadComponent);