import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import { readFile } from '../utils/ImageHelpers';
import Thumbnail from '../components/frames/gallery/Thumbnail';
import AddMediaSVG from '../components/addMedia';

import { fileUploadMutation } from '../api/apolloProxy';
// import ARTICLE_SHAPE from '../utils/articlePropType';

export class MediaImageField extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.images === prevState.images) {
      return null;
    }
    return { images: nextProps.images };
  }

  state = {
    trash: [],
    images: [],
    uploading: false,
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
};

export default MediaImageField;
