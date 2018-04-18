import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Mutation } from "react-apollo";

import { readFile } from '../utils/ImageHelpers';
import Thumbnail from '../components/frames/gallery/Thumbnail';
import AddMediaSVG from '../components/addMedia';
import { UPDATE_ARTICLE_MUTATION } from '../api/apolloProxy';

export class MediaImageField extends Component {

  constructor(props) {
    super(props);

    const images = props.article.images.map(({ entity, mid }) => {
      if (entity && entity.image && entity.image.derivative && entity.image.derivative.url) {
        const { image: { derivative: { url }, file: { filesize, filename } } } = entity;
        return {
          mid,
          url,
          fileSize: filesize,
          fileName: filename,
        };
      }
      return null;
    })

    this.state = {
      images,
      uploading: false,
    }
  }

  
  onDrop = (files) => {
    const len = files.length;
    for (let i = 0; i < len; i += 1) {
      const file = files[i];
      // Only process image files.
      if (!file.type.match('image.*')) { break; }
      this.createFileObject(file, i);
    }
  };
  
  normalizeImages = () => {
    return 
  }

  handleDelete = (index) => {
    const { images } = this.state;
    this.setState(prevState => (
      { images: prevState.images.filter((_, i) => i !== index) }
    ));
  }

  handleCancel = (index) => {
    const { images } = this.state;
    images[index].cancel();
    this.handleDelete(index);
  }

  createFileObject = (file, maxWidth = 200, maxHeight = 200) => {
    readFile(file, 500, 250, (resizeDataUrl) => {
      const fileObject = {
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

    return (
      <div>
        <div className="container p-0">
          <Dropzone
            ref={(node) => { this.dropzoneRef = node; }}
            onDrop={onDrop}
            id="dropZone"
            className="dropZone"
            disabled={uploading}
          >
            <div className="grid">
              <div>
                <AddMediaSVG />
              </div>
              {
                images.map((image, i) => (
                <Mutation mutation={UPDATE_ARTICLE_MUTATION} key={image.mid}>
                  {(updateTodo, { loading, error }) => (
                    <Thumbnail
                      handleCancel={handleCancel}
                      handleDelete={handleDelete}
                      index={i}
                      fileSize={image.size || image.fileSize}
                      fileName={image.fileName}
                      percentageComplete={image.percentCompleted ? image.percentCompleted : 0}
                      uploadInitiated={image.uploadInitiated ? image.uploadInitiated : false}
                      uploadSuccess={image.uploadSuccess ? image.uploadSuccess : false}
                      render={() => (
                        <figure>
                          <img alt="" src={image.url} className="responsive-image" />
                        </figure>
                      )}
                    />
                  )}
                </Mutation>
                    
                ))
              }
            </div>
          </Dropzone>
          <p className="w-100 text-right">Select above, or drag/drop images to upload</p>
        </div>
      </div>
    );
  }
}

export default MediaImageField;
