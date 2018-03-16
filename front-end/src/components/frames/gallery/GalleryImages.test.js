import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { GalleryImages } from './GalleryImages';

const initalPropState = {
  images: [],
  handleDelete: jest.fn(),
};

const generateShallow = props => shallow(<GalleryImages {...props} />);


describe('GalleryImages', () => {
  it('should render correctly', () => {
    const output = generateShallow(initalPropState);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
