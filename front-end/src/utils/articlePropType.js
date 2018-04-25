import { shape, arrayOf, string, number } from 'prop-types';

const ARTICLE_SHAPE = {
  author: shape({
    name: string.isRequired,
  }),
  body: shape({
    value: string.isRequired,
  }),
  images: arrayOf(shape({
    mid: number.isRequired,
    url: string.isRequired,
    fileSize: number.isRequired,
    fileName: string.isRequired,
    file: shape({}),
  })),
  nid: number.isRequired,
  title: string.isRequired,
  uuid: string.isRequired,
};

export default ARTICLE_SHAPE;
