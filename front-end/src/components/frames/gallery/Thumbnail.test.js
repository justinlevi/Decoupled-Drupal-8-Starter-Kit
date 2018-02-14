import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import renderer from 'react-test-renderer';

import Thumbnails from './Thumbnails';


// snapshot tests.

const generateShallowThumbnail = (
  percentageComplete = 0,
  uploadInitiated = false,
  uploadSuccess = false,
) =>
  shallow(<Thumbnails
    key={1}
    handleCancel={jest.fn()}
    handleDelete={jest.fn()}
    index={1}
    fileSize={123}
    fileName="mockTitle"
    percentageComplete={percentageComplete}
    uploadInitiated={uploadInitiated}
    uploadSuccess={uploadSuccess}
    render={() => (
      <figure>
        <img alt="mockTitle" src="mockUrl" className="responsive-image" />
      </figure>
    )}
  />);


const generateTreeThumbnail = (
  percentageComplete = 0,
  uploadInitiated = false,
  uploadSuccess = false,
) => renderer.create(<Thumbnails
  key={1}
  handleCancel={jest.fn()}
  handleDelete={jest.fn()}
  index={1}
  fileSize={123}
  fileName="mockTitle"
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
    const output = generateShallowThumbnail();
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should display the progress bar based on props set', () => {
    const component = generateTreeThumbnail(10, true, false);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();


    tree.props.percentageComplete = 20;
    tree.props.uploadInitiated = true;
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
