import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import renderer from 'react-test-renderer';
import Thumbnails from './Thumbnails';


// snapshot tests.

describe('Thumbnail', () => {
  it('should render correctly', () => {
    const output = shallow(
      <Thumbnails key={1} handleDelete={jest.fn()} index={1} 
      fileSize={123}
      fileName="mockTitle" 
      percentageComplete={0} 
      uploadInitiated={false}
      uploadSuccess={false}
      render={ () => (
        <figure>
          <img alt="mockTitle" src="mockUrl" className="responsive-image"/>
        </figure>
      )} />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should display the progress bar based on props set', () => {
    const component = renderer.create(
      <Thumbnails key={1} handleDelete={jest.fn()} index={1} 
      fileSize={123}
      fileName="mockTitle" 
      percentageComplete={10} 
      uploadInitiated={true}
      uploadSuccess={false}
      render={ () => (
        <figure>
          <img alt="mockTitle" src="mockUrl" className="responsive-image"/>
        </figure>
      )} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    tree.props.percentageComplete = 20;
    tree.props.uploadInitiated = true;
    //re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot()

  })
});