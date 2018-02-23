import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

it('renders without crashing', () => {
  const component = shallow(<App
    isLoading={false}
    isLoggingIn={false}
    isAuthenticated={false}
  />);
  expect(component.exists()).toEqual(true);
});
