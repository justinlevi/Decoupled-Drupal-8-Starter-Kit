import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Mutation } from "react-apollo";

import { readFile } from '../utils/ImageHelpers';
import Thumbnail from '../components/frames/gallery/Thumbnail';
import AddMediaSVG from '../components/addMedia';
import { UPDATE_ARTICLE_MUTATION, fileUploadMutation } from '../api/apolloProxy';

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
      trash: [],
      images,
      uploading: false,
    }
  }

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
    const { data: {imagesUploadMediaCreation } } = result;

    // Loop through our local state array and update mids from upload result
    const updatedImages = this.state.images.slice().map((image) => {
      const { mid, fileName, fileSize } = image;
      if (!isNaN(mid)){
        return image;
      }

      const uploadedImage = imagesUploadMediaCreation.filter(
        ({ entity: { image: { file: { filename, filesize } } } }) => {
          return (filename === fileName && filesize === fileSize);
        }).shift();

      return {...image, mid: Number(uploadedImage.entity.mid) };
    });

    this.setState({ images: updatedImages }, async () => {
      const mids = this.state.images.map((image) => image.mid);
      this.props.updateNode({ mids });
    })

  };

  handleDelete = (index) => {
    const images = this.state.images.filter((_, i) => i !== index); 
    this.setState({ images });
    return images.map(image => image.mid);
  }

  handleCancel = (index) => {
    const { images } = this.state;
    images[index].cancel();
    this.handleDelete(index);
  }

  createFileObject = (file, maxWidth = 200, maxHeight = 200) => {
    readFile(file, 500, 250, (resizeDataUrl) => {
      const fileObject = {
        mid: `temp_ ${new Date().getTime()}`, // temporary id
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
    const { article: { title, body }, updateNode } = this.props;

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
                  // <Mutation mutation={UPDATE_ARTICLE_MUTATION} key={image.mid}>
                  //   {(updateArticle, { loading, error }) => (
                      <Thumbnail
                        key={image.mid}
                        handleCancel={handleCancel}
                        handleDelete={() => { 
                          const mids = this.handleDelete(i);
                          if (!isNaN(image.mid)){
                            updateNode({ mids });
                          }
                        }}
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
                  //   )}
                  // </Mutation>
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
