import React from 'react';
import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import createSagaMiddleware from 'redux-saga';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import List from './ListPage';
import * as data from '../api/__mocks__/data';


describe('ListPage', () => {
  const sagaMiddleware = createSagaMiddleware();
  const mockStore = configureMockStore([sagaMiddleware]);
  const store = mockStore({});

  const initialPropsState = {
    articles: data.ARTICLES_BY_USER_DATA.data.user.nodes.articles,
  };

  let props;
  let mountedLogin;
  const ListPage = (modifiedProps = initialPropsState) => {
    props = {
      ...initialPropsState,
      ...modifiedProps,
    };

    if (!mountedLogin) {
      mountedLogin = mount(<List {...props} />);
    }
    return mountedLogin;
  };

  beforeEach(() => {
    props = initialPropsState;
    mountedLogin = undefined;
  });

  describe('Snapshots', () => {
    const output = shallow(<Provider store={store}><ListPage {...initialPropsState} /></Provider>);
    it('should render correctly', () => {
      expect(shallowToJson(output)).toMatchSnapshot();
    });
  });


  // describe('ListPageArticle differing props', () => {
  //   it('Should NOT display the login form if authenticated - SHOULD REDIRECT', () => {
  //     const newProps = { ...initialPropsState };
  //     newProps.isAuthenticated = true;
  //     const wrapper = shallow(<Login {...newProps} />);
  //     expect(wrapper.find(Redirect).props().to).toBe('/');
  //   });
  // });
});
