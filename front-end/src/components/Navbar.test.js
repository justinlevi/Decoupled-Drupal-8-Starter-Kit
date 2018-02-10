import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import renderer from 'react-test-renderer';
import Navbar from './Navbar';

const props = {
  handleLogout: jest.fn()
};

const generateShallow = (props) => {
  return shallow(
    <Navbar handleLogout={props.handleLogout} />
  );
}


describe('Navbar', () => {

  it('should render correctly', () => {
    const output = generateShallow(props);
    expect(shallowToJson(output)).toMatchSnapshot();
  });

});