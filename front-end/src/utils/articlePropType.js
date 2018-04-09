import PropTypes, { shape, arrayOf } from 'prop-types';

const ARTICLE_SHAPE = {
  author: shape({
    name: PropTypes.string.isRequired,
  }),
  body: shape({
    value: PropTypes.string.isRequired,
  }),
  images: arrayOf(shape({})),
  nid: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
};

export default ARTICLE_SHAPE;
