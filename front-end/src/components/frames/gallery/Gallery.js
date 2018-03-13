import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import Thumbnail from './Thumbnail';
import BrowseButton from './BrowseButton';

const Gallery = ({
  onDrop,
  uploading,
  files,
  totalBytes,
  uploadInitiated = false,
  onUploadClick,
  handleCancel,
  handleDelete,
}) => {
  let dropzoneRef;

  return (
    <div className="GalleryFrameContainer">

      { uploading === false ?
        <Dropzone
          ref={(node) => { dropzoneRef = node; }}
          onDrop={onDrop}
          id="dropZone"
          className="dropZone"
          disabled={uploading}
        >
          <p>Drop your files here or click to browse.</p>
        </Dropzone>
      :
        <div id="dropZone" className="dropZone disabled">
          <p>Your files are uploading.</p>
        </div>
      }

      {uploading === false ?
        <BrowseButton
          files={files}
          totalBytes={totalBytes(files)}
          totalFiles={files.length}
          render={() => (
            <button
              type="button"
              onClick={() => { dropzoneRef.open(); }}
              disabled={uploadInitiated}
            >
            Choose Files
            </button>
        )}
        />
      : null }

      { files.length > 0 ?
        <button className="btn btn-primary" onClick={onUploadClick}>UPLOAD FILES</button>
      : null }

      <output id="list" className="container p-0">
        <div className="grid">
          {
            files.map((item, i) => {
              const image = files[i].file;
              if (image) {
                return (<Thumbnail
                  key={i}
                  handleCancel={handleCancel}
                  handleDelete={handleDelete}
                  index={i}
                  fileSize={image.size || image.fileSize}
                  fileName={image.name}
                  percentageComplete={image.percentCompleted ? image.percentCompleted : 0}
                  uploadInitiated={image.uploadInitiated ? image.uploadInitiated : false}
                  uploadSuccess={image.uploadSuccess ? image.uploadSuccess : false}
                  render={() => (
                    <figure>
                      <img alt="" src={item.thumbnail} className="responsive-image" />
                    </figure>
                  )}
                />);
              }
              return null;
            })
          }
        </div>
      </output>
    </div>
  );
};

Gallery.propTypes = {
  uploading: PropTypes.bool.isRequired,
  files: PropTypes.array.isRequired,
  uploadInitiated: PropTypes.bool,
  onDrop: PropTypes.func.isRequired,
  totalBytes: PropTypes.func.isRequired,
  onUploadClick: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

Gallery.defaultProps = {
  uploadInitiated: false,
};

export default Gallery;
