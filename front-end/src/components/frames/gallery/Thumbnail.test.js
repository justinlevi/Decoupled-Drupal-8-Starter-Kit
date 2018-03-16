import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import renderer from 'react-test-renderer';

import Thumbnail from './Thumbnail';

// snapshot tests.

const initialPropsState = {
  handleCancel: jest.fn(),
  handleDelete: jest.fn(),
  index: 1,
  fileSize: 123,
  fileName: 'mockTitle',
  percentageComplete: 0,
  uploadInitiated: false,
  uploadSuccess: false,
};

const generateShallow = ({
  handleCancel,
  handleDelete,
  index,
  fileSize,
  fileName,
  percentageComplete,
  uploadInitiated,
  uploadSuccess,
} = initialPropsState) =>
  shallow(<Thumbnail
    key={1}
    handleCancel={handleCancel}
    handleDelete={handleDelete}
    index={index}
    fileSize={fileSize}
    fileName={fileName}
    percentageComplete={percentageComplete}
    uploadInitiated={uploadInitiated}
    uploadSuccess={uploadSuccess}
    render={() => (
      <figure>
        <img alt="mockTitle" src="mockUrl" className="responsive-image" />
      </figure>
    )}
  />);


const generateTree = ({
  handleCancel,
  handleDelete,
  index,
  fileSize,
  fileName,
  percentageComplete,
  uploadInitiated,
  uploadSuccess,
} = initialPropsState) => renderer.create(<Thumbnail
  key={1}
  handleCancel={handleCancel}
  handleDelete={handleDelete}
  index={index}
  fileSize={fileSize}
  fileName={fileName}
  percentageComplete={percentageComplete}
  uploadInitiated={uploadInitiated}
  uploadSuccess={uploadSuccess}
  render={() => (
    <figure>
      <img alt="mockTitle" src="mockUrl" className="responsive-image" />
    </figure>
    )}
/>);

describe('Thumbnail', () => {
  it('should render correctly', () => {
    const output = generateShallow();
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should display the progress bar based on props set', () => {
    const component = generateTree();
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();


    tree.props.percentageComplete = 20;
    tree.props.uploadInitiated = true;
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display the filesize that is passed in correctly', () => {
    const props = { ...initialPropsState };
    props.fileSize = 1000000000; // bytes = 1000 MB
    const shallowOutput = generateShallow(props);
    const expected = '1000 MB';
    const actual = shallowOutput.find('.dz-size').text();

    expect(actual).toEqual(expected);
  });

  it('should display the filename passed in', () => {
    const props = { ...initialPropsState };
    props.fileName = 'YELLOW BANANAS';
    const shallowOutput = generateShallow(props);
    const expected = 'YELLOW BANANAS';
    const actual = shallowOutput.find('.dz-filename').text();

    expect(actual).toEqual(expected);
  });

  it('should have a cancel button if uploading', () => {
    const props = { ...initialPropsState };
    props.uploadInitiated = true;
    const shallowOutput = generateShallow(props);
    const expected = 'button';
    const actual = shallowOutput.find('.cancel-upload').type();

    expect(actual).toEqual(expected);
  });

  it('should have a delete button if not uploading', () => {
    const props = { ...initialPropsState };
    props.uploadInitiated = false;
    const shallowOutput = generateShallow(props);
    const expected = 'button';
    const actual = shallowOutput.find('.delete').type();

    expect(actual).toEqual(expected);
  });

  it('should pass the index to the handle delete', () => {
    const props = { ...initialPropsState };
    props.index = 5;

    const shallowOutput = generateShallow(props);
    shallowOutput.find('.delete').simulate('click');
    expect(props.handleDelete.mock.calls.length).toBe(1);

    const expectedIndex = 5;
    const actualIndex = props.handleDelete.mock.calls[0][0];
    expect(expectedIndex).toEqual(actualIndex);
  });

  it('should pass the index to the cancel handler', () => {
    const props = { ...initialPropsState };
    props.uploadInitiated = true;
    props.index = 7;

    const shallowOutput = generateShallow(props);
    shallowOutput.find('.cancel-upload').simulate('click');
    expect(props.handleCancel.mock.calls.length).toBe(1);

    const expectedIndex = 7;
    const actualIndex = props.handleCancel.mock.calls[0][0];
    expect(expectedIndex).toEqual(actualIndex);
  });

  it('should display the upload success mark onUploadSuccess ', () => {
    const props = { ...initialPropsState };
    props.uploadSuccess = true;
    const shallowOutput = generateShallow(props);
    const actual = shallowOutput.find('.dz-success-mark');

    expect(actual.prop('style')).toHaveProperty('opacity', '1');
  });
});
