import { EventEmitter } from 'events';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Progress } from 'reactstrap';

import { readFile } from '../utils/ImageHelpers';
import Thumbnail from '../components/frames/gallery/Thumbnail';
import AddMediaSVG from '../components/addMedia';

import { fileUploadMutation } from '../api/apolloProxy';
import { xhr } from '../api/customFetch';
// import ARTICLE_SHAPE from '../utils/articlePropType';

export class MediaImageField extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.images === prevState.images) {
      return null;
    }
    return { images: nextProps.images };
  }

  constructor(props) {
    super(props);
    this.proxy = new EventEmitter();
    xhr.addEventListener('load', (e) => {
      this.proxy.removeAllListeners(['abort']);
      const newState = { progress: 100 };
      if (xhr.status >= 200 && xhr.status <= 299) {
        this.setState(newState, () => {
          this.props.onLoad(e, xhr);
        });
      } else {
        newState.hasError = true;
        this.setState(newState, () => {
          this.props.onError(e, xhr);
        });
      }
    }, false);

    xhr.addEventListener('error', (e) => {
      this.setState({
        hasError: true,
      }, () => {
        this.props.onError(e, xhr);
      });
    }, false);

    xhr.upload.addEventListener('progress', (e) => {
      let progress = 0;
      if (e.total !== 0) {
        progress = parseInt((e.loaded / e.total) * 100, 10);
      }
      this.setState({
        progress,
      }, () => {
        this.props.onProgress(e, xhr, progress);
      });
    }, false);

    xhr.addEventListener('abort', (e) => {
      this.setState({
        progress: -1,
      }, () => {
        this.props.onAbort(e, xhr);
      });
    }, false);
  }

  state = {
    trash: [],
    images: [],
    uploading: false,
    progress: 0,
    hasError: false,
  };

  onDrop = async (files) => {
    const len = files.length;
    for (let i = 0; i < len; i += 1) {
      const file = files[i];
      // Only process image files.
      if (!file.type.match('image.*')) { break; }
      this.createFileObject(file, i);
    }

    this.setState({ uploading: true });
    const result = await fileUploadMutation(files);
    const { data: { imagesUploadMediaCreation } } = result;

    // Loop through our local state array and update mids from upload result
    const updatedImages = this.state.images.slice().map((image) => {
      const { mid, fileName, fileSize } = image;
      if (typeof mid === 'number') {
        return image;
      }

      const uploadedImage = imagesUploadMediaCreation
        .filter(({ entity: { image: { file: { filename, filesize } } } }) =>
          (filename === fileName && filesize === fileSize))
        .shift();

      return { ...image, mid: Number(uploadedImage.entity.mid) };
    });

    this.props.updateImages(updatedImages);
  };

  handleDelete = (index) => {
    const { images, trash } = this.state;
    const newTrash = [...trash, images[index]];
    const newImages = images.filter((_, i) => i !== index);
    this.setState({
      trash: newTrash,
      images: newImages,
    });
    return newImages;
  }

  handleCancel = (index) => {
    const { images } = this.state;
    images[index].cancel();
    this.handleDelete(index);
  }

  createFileObject = (file, maxWidth = 500, maxHeight = 250) => {
    readFile(file, 500, 250, (resizeDataUrl) => {
      const fileObject = {
        mid: `temp_${new Date().getTime()}`, // temporary id
        url: resizeDataUrl,
        fileSize: file.size || file.fileSize,
        fileName: file.name,
        file,
      };

      this.setState({
        images: [
          ...this.state.images,
          fileObject,
        ],
      });
    });
  }

  dropzoneRef = undefined;

  render() {
    const { onDrop, handleCancel, handleDelete } = this;
    const { uploading, images } = this.state;
    const { updateImages } = this.props;

    return (

      <div className="container p-0">
        { this.state.progress > 0 ?
          <div>
            <Progress value={this.state.progress}>({this.state.progress}%)</Progress>
          Uploading...
            <button onClick={this.handleCancel}>
              Cancel Upload
            </button>
          </div>
        : null
      }
        <Dropzone
          ref={(node) => { this.dropzoneRef = node; }}
          onDrop={onDrop}
          id="dropZone"
          className="dropZone"
          disabled={uploading}
        >
          <div className="grid">
            {
              images.length > 0 ?
                images.map((image, i) => {
                  const imageUploading = typeof image.mid === 'number';
                  return (
                    <Thumbnail
                      key={image.mid}
                      handleCancel={handleCancel}
                      handleDelete={() => {
                        const newImages = handleDelete(i);
                        if (typeof image.mid === 'number') {
                          updateImages(newImages);
                        }
                      }}
                      index={i}
                      fileSize={image.size || image.fileSize}
                      fileName={image.fileName}
                      percentageComplete={image.percentCompleted ? image.percentCompleted : 0}
                      uploadInitiated={image.uploadInitiated ? image.uploadInitiated : false}
                      uploadSuccess={image.uploadSuccess ? image.uploadSuccess : false}
                      render={() => (
                        <img alt="" src={image.url} className={`responsive-image ${imageUploading ? 'uploaded' : 'temp'}`} />
                      )}
                    />
                  );
                })
              :
                <div>
                  <AddMediaSVG />
                </div>
              }
          </div>
        </Dropzone>
        <p className="w-100 text-right">Drop files here or click to upload.</p>
      </div>
    );
  }
}

MediaImageField.propTypes = {
  updateImages: PropTypes.func.isRequired,
  onProgress: PropTypes.func,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  onAbort: PropTypes.func,
};

MediaImageField.defaultProps = {
  onProgress: (e, request, progress) => {},
  onLoad: (e, request) => {},
  onError: (e, request) => {},
  onAbort: (e, request) => {},
};

export default MediaImageField;
