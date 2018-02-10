import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import renderer from 'react-test-renderer';

import SignIn from './SignIn';

const props = {
  handleInputChange: jest.fn(),
  handleLogin: jest.fn(),
  isLoginFailed: false
};

const generateShallow = (props) => {
  return shallow(
    <SignIn {...props} />
  );
}


describe('SignIn', () => {

  it('should render correctly', () => {
    const output = generateShallow(props);
    expect(shallowToJson(output)).toMatchSnapshot();
  });

});