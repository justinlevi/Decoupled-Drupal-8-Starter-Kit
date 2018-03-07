import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import renderer from 'react-test-renderer';

import BrowseButton, { calculateMessage, messages } from './BrowseButton';

// snapshot tests.
const uploadInitiated = false;
const initialPropsState = {
  totalFiles: 0,
  totalBytes: 0,
  render: () => (
    <button
      type="button"
      onClick={jest.fn()}
      disabled={uploadInitiated}
    >
  Choose Files
    </button>),
};

const generateShallow = (props = initialPropsState) =>
  shallow(<BrowseButton {...props} />);


describe('BrowseButton', () => {
  it('should render correctly', () => {
    const actual = shallowToJson(generateShallow());
    expect(actual).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const props = {
      ...initialPropsState,
      render: jest.fn(),
    };
    const actual = shallowToJson(generateShallow(props));
    expect(actual).toMatchSnapshot();
  });

  it('should generate No files message', () => {
    const actual = calculateMessage(0, 0);
    const expected = `${messages.none} (0KB)`;
    expect(actual).toEqual(expected);
  });

  it('should generate 1 file message', () => {
    const actual = calculateMessage(1, 0);
    const expected = `${messages.one} (0KB)`;
    expect(actual).toEqual(expected);
  });

  it('should generate 5 file messages w/ 10kb', () => {
    const actual = calculateMessage(5, 10000);
    const expected = `5 ${messages.many} (10KB)`;
    expect(actual).toEqual(expected);
  });

  it('should generate 5 file messages w/ 10MB', () => {
    const actual = calculateMessage(5, 10000000);
    const expected = `5 ${messages.many} (10MB)`;
    expect(actual).toEqual(expected);
  });
});

