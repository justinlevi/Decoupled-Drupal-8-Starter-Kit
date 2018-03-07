import React from 'react';
import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import createSagaMiddleware from 'redux-saga';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import App from './AppContainer';


describe('AppContainer', () => {
  const sagaMiddleware = createSagaMiddleware();
  const mockStore = configureMockStore([sagaMiddleware]);
  const store = mockStore({});
  const initialPropsState = {
    activeArticleNid: 0,
    articles: [],
  };

  let props;
  let mountedLogin;
  const AppContainer = (modifiedProps = initialPropsState) => {
    props = {
      ...initialPropsState,
      ...modifiedProps,
    };

    if (!mountedLogin) {
      mountedLogin = mount(<App {...props} />);
    }
    return mountedLogin;
  };

  beforeEach(() => {
    props = initialPropsState;
    mountedLogin = undefined;
  });

  describe('Snapshots', () => {
    const output = shallow(<Provider store={store}><AppContainer {...initialPropsState} /></Provider>);
    it('should render correctly', () => {
      expect(shallowToJson(output)).toMatchSnapshot();
    });
  });


  // describe('AppContainerArticle differing props', () => {
  //   it('Should NOT display the login form if authenticated - SHOULD REDIRECT', () => {
  //     const newProps = { ...initialPropsState };
  //     newProps.isAuthenticated = true;
  //     const wrapper = shallow(<Login {...newProps} />);
  //     expect(wrapper.find(Redirect).props().to).toBe('/');
  //   });
  // });
});
