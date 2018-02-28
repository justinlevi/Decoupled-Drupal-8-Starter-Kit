import React from 'react';
import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Redirect } from 'react-router-dom';

import Login from './LoginArticle';


describe('LoginArticle', () => {
  const initialPropsState = {
    username: '',
    password: '',
    dispatch: jest.fn(),
    isLoggingIn: false,
    isAuthenticated: false,
    error: '',
  };

  let props;
  let mountedLogin;
  const loginArticle = (modifiedProps = initialPropsState) => {
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

    it('state should be updated when username changes', () => {
      const component = loginArticle();
      component.find('.username').simulate('change', { target: { name: 'username', value: 'test' } });
      expect(component.state('username') === 'test');
    });

    it('state should be updated when password changes', () => {
      const component = loginArticle();
      component.find('.password').simulate('change', { target: { name: 'password', value: 'test' } });
      expect(component.state('password') === 'test');
    });

    it('should respond to submit button press', () => {
      const component = loginArticle();
      component.find('[type="submit"]').simulate('submit');
      expect(props.dispatch.mock.calls.length === 1);
    });

    it('submit should be disabled until username and password are entered', () => {
      const component = loginArticle();
      component.find('.username').simulate('change', { target: { name: 'username', value: 'test' } });
      component.find('[type="submit"]').simulate('submit');
      expect(component.state('error').length > 0).toBe(true);
    });
  });


  describe('LoginArticle differing props', () => {
    it('Should NOT display the login form if authenticated - SHOULD REDIRECT', () => {
      const newProps = { ...initialPropsState };
      newProps.isAuthenticated = true;
      const wrapper = shallow(<Login {...newProps} />);
      expect(wrapper.find(Redirect).props().to).toBe('/');
    });

    it('Do NOT displays an error message when `error` is NOT passed in', () => {
      const component = loginArticle({ isLoggingIn: true });
      expect(component.find('.loggingIn').length).toBe(1);
    });
  });
});
