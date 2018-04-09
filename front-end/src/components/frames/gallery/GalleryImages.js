import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

import Thumbnail from './Thumbnail';

export const GalleryImages = ({
  images,
  handleDelete,
}) => (
  <div className="GalleryFrameContainer">

    <div id="list" className="container p-0">
      <div className="grid">
        {
          images.map((image, i) => (<Thumbnail
            key={i}
            handleDelete={handleDelete}
            index={i}
            render={() => (
              <figure>
                <img alt="" src={image.url} className="responsive-image" />
              </figure>
              )}
          />))
        }
      </div>
    </div>
  </div>
);

GalleryImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape()),
  handleDelete: PropTypes.func.isRequired,
};

GalleryImages.defaultProps = {
  images: [],
};

// const mapStateToProps = (state) => {
//   const { activeArticleNid } = state.articleReducer;
//   const index = state.articleReducer.articles.findIndex(a => a.nid === activeArticleNid);
//   const { images } = state.articleReducer.articles[index];
//   return {
//     images,
//   };
// };
// const GalleryImagesWrapper = connect(mapStateToProps)(GalleryImages);

// export default GalleryImagesWrapper;

export default GalleryImages;
