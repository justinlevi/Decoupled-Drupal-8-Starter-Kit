import React from 'react';
import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
// import renderer from 'react-test-renderer';

import Login from './Login';


describe('Login', () => {
  const initialPropsState = {
    handleInputChange: jest.fn(),
    handleLogin: jest.fn(),
    isLoginFailed: false,
  };

  let props;
  let mountedLogin;
  const signIn = () => {
    if (!mountedLogin) {
      mountedLogin = mount(<Login {...props} />);
    }
    return mountedLogin;
  };

  beforeEach(() => {
    props = initialPropsState;
    mountedLogin = undefined;
  });

  describe('Snapshots', () => {
    const output = shallow(<Login {...initialPropsState} />);
    it('should render correctly', () => {
      expect(shallowToJson(output)).toMatchSnapshot();
    });

    it('renders a email input', () => {
      expect(output.find('.username').length).toEqual(1);
    });

    it('renders a password input', () => {
      expect(output.find('.password').length).toEqual(1);
    });

    it('should respond to change event', () => {
      output.find('.username').simulate('change', { target: { name: 'username', value: 'test' } });
      expect(props.handleInputChange.mock.calls.length).toBe(1);
    });
  });

  it('always renders a div', () => {
    const divs = signIn().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('always renders a `username`, `password`, and `submit` button', () => {
    const username = signIn().find('.username');
    expect(username.length).toBe(1);

    const password = signIn().find('.password');
    expect(password.length).toBe(1);

    const submit = signIn().find('.submit');
    expect(submit.length).toBe(1);
  });

  describe('Login differing props', () => {
    beforeEach(() => {
      props.isLoginFailed = true;
    });

    it('Displays an error message when `isLoginFailed` is passed in as true', () => {
      const isLoginFailed = signIn().find('.error');
      expect(isLoginFailed.length).toBe(1);
    });
  });
});
