import React from 'react';
import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Navbar } from './Navbar';

const initialPropsState = {
  dispatch: jest.fn(),
  isAuthenticated: false,
};

let props;
let mounted;
const component = () => {
  if (!mounted) {
    mounted = mount(<Navbar {...props} />);
  }
  return mounted;
};

describe('Navbar', () => {
  beforeEach(() => {
    props = initialPropsState;
    mounted = undefined;
  });

  describe('Snapshots', () => {
    const output = shallow(<Navbar {...initialPropsState} />);
    it('should render correctly', () => {
      expect(shallowToJson(output)).toMatchSnapshot();
    });

    // it('should respond to click event', () => {
    //   output.find('.logout').simulate('click', { target: { name: 'logout' } });
    //   expect(props.handleLogout.mock.calls.length).toBe(1);
    // });
  });

  it('always renders a header', () => {
    const header = component().find('header');
    expect(header.length).toBeGreaterThan(0);
  });
});
