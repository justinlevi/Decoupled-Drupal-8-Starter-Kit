import React from 'react';
import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
// import renderer from 'react-test-renderer';

import Login from './Login';


describe('Login', () => {
  const initialPropsState = {
    handleInputChange: jest.fn(),
    handleLogin: jest.fn(),
  };

  let props;
  let mountedLogin;
  const signIn = (modifiedProps = initialPropsState) => {
    props = {
      ...initialPropsState,
      ...modifiedProps,
    };

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

    it('should respond to change event on username field', () => {
      output.find('.username').simulate('change', { target: { name: 'username', value: 'test' } });
      expect(props.handleInputChange.mock.calls.length).toBe(1);
    });

    it('should respond to change event on password field', () => {
      output.find('.password').simulate('change', { target: { name: 'password', value: 'test' } });
      expect(props.handleInputChange.mock.calls.length).toBe(2);
    });

    it('should render a submit button', () => {
      const actual = output.find('[type="submit"]').type();
      const expected = 'button';
      expect(actual).toEqual(expected);
    });

    it('should respond to submit button press', () => {
      const component = signIn();
      component.find('[type="submit"]').simulate('submit');
      expect(props.handleLogin.mock.calls.length).toBe(1);
    });

    it('The submit button should include the class btn-primary', () => {
      const actual = output.find('[type="submit"]').hasClass('btn-primary');
      const expected = true;
      expect(actual).toEqual(expected);
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
    it('Displays an error message when `error` is passed in', () => {
      const component = signIn({ error: 'error' });
      const found = component.find('.error');
      expect(found.length).toBe(1);
    });

    it('Do NOT displays an error message when `error` is NOT passed in', () => {
      const component = signIn();
      const found = component.find('.error');
      expect(found.length).toBe(0);
    });
  });
});
