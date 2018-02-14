import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Gallery from './Gallery';

const initalPropState = {
  uploading: false,
  files: [],
  uploadInitiated: false,
  onDrop: jest.fn(),
  totalBytes: jest.fn(),
  onUploadClick: jest.fn(),
  handleCancel: jest.fn(),
  handleDelete: jest.fn(),
};

const generateShallow = props => shallow(<Gallery {...props} />);


describe('Gallery', () => {
  it('should render correctly', () => {
    const output = generateShallow(initalPropState);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
