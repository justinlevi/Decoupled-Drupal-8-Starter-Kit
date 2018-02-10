import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import renderer from 'react-test-renderer';

import Gallery from './Gallery';

const props = {
  uploading: false,
  files: [],
  uploadInitiated: false,
  onDrop: jest.fn(),
  computedTotalBytes: jest.fn(),
  onUploadClick: jest.fn(),
  handleCancel: jest.fn(),
  handleDelete: jest.fn(),
};

const generateShallow = (props) => {
  return shallow(
    <Gallery {...props} />
  );
}


describe('Gallery', () => {

  it('should render correctly', () => {
    const output = generateShallow(props);
    expect(shallowToJson(output)).toMatchSnapshot();
  });

});