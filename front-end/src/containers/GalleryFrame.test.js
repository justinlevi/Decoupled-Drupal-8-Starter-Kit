import React from 'react';
import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import createSagaMiddleware from 'redux-saga';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Gallery from './GalleryFrame';


describe('GalleryFrame', () => {
  const sagaMiddleware = createSagaMiddleware();
  const mockStore = configureMockStore([sagaMiddleware]);
  const store = mockStore({});


  const pageModel = {
    author: {
      name: 'admin',
    },
    title: 'hello article update',
    body: null,
    nid: 13,
    uuid: '79502776-61f8-4c48-b464-d94eebe0e01b',
    images: [],
  };

  const initialPropsState = {
    page: pageModel,
  };

  let props;
  let mountedLogin;
  const GalleryFrame = (modifiedProps = initialPropsState) => {
    props = {
      ...initialPropsState,
      ...modifiedProps,
    };

    if (!mountedLogin) {
      mountedLogin = mount(<Gallery {...props} />);
    }
    return mountedLogin;
  };

  beforeEach(() => {
    props = initialPropsState;
    mountedLogin = undefined;
  });

  describe('Snapshots', () => {
    const output = shallow(<Provider store={store}><GalleryFrame {...initialPropsState} /></Provider>);
    it('should render correctly', () => {
      expect(shallowToJson(output)).toMatchSnapshot();
    });
  });


  // describe('GalleryFrameArticle differing props', () => {
  //   it('Should NOT display the login form if authenticated - SHOULD REDIRECT', () => {
  //     const newProps = { ...initialPropsState };
  //     newProps.isAuthenticated = true;
  //     const wrapper = shallow(<Login {...newProps} />);
  //     expect(wrapper.find(Redirect).props().to).toBe('/');
  //   });
  // });
});
