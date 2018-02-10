import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import Thumbnails from 'components/frames/gallery/Thumbnails';
import BrowseButton from 'components/frames/gallery/BrowseButton';

const Gallery = (props) => {

  let dropzoneRef = undefined;

  return (

      <div className="GalleryFrameContainer">

        { props.uploading === false ?
          <Dropzone ref={ (node) => { dropzoneRef = node; } } onDrop={  props.onDrop } id="dropZone" className="dropZone" disabled={props.uploading} >
            <p>Drop your files here or click to browse.</p>
          </Dropzone>
        : <div id="dropZone" className="dropZone disabled">
          <p>Your files are uploading.</p>
        </div> }

        { props.uploading === false ?
          <BrowseButton files={props.files} totalBytes={ props.computedTotalBytes(props.files) } totalFiles={props.files.length} render={ () => (
            <button type="button" onClick={() => { dropzoneRef.open() } } disabled={props.uploadInitiated} >
                Choose Files
            </button>
          )} />
        : null }

        { props.files.length > 0 ? <button className={"btn btn-primary"} onClick={ props.onUploadClick }>UPLOAD FILES</button>: null }

        <output id="list" className="container">
          <div className={"grid"}>
            {
              props.files.map((item, i) => {
                const image = props.files[i].file;
                if(image){
                  return <Thumbnails 
                    key={i} 
                    handleCancel={ props.handleCancel } 
                    handleDelete={ props.handleDelete } 
                    index={i}
                    fileSize={image.size || image.fileSize}
                    fileName={image.name}
                    percentageComplete={image.percentCompleted ? image.percentCompleted : 0 }
                    uploadInitiated={image.uploadInitiated ? image.uploadInitiated : false }
                    uploadSuccess={image.uploadSuccess ? true : false }
                    render={ () => (
                      <figure>
                        <img alt={""} src={item.thumbnail} className={"responsive-image"}/>
                      </figure>
                    )} />
                }else{
                  return null;
                }
              })
            }
          </div>
        </output>
      </div>
    )
  
}

Gallery.propTypes = {
  uploading: PropTypes.bool.isRequired,
  files: PropTypes.array.isRequired,
  uploadInitiated: PropTypes.bool.isRequired,
  onDrop: PropTypes.func.isRequired,
  computedTotalBytes: PropTypes.func.isRequired,
  onUploadClick: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Gallery;