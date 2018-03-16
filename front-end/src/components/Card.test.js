import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Card from './Card';

const pageModel = {
  images: [],
  title: 'test',
  body: {
    value: 'test',
  },
};

const initialPropsState = {
  page: pageModel,
  deleteHandler: jest.fn(),
  selectHandler: jest.fn(),
};

describe('Card', () => {
  const output = shallow(<Card {...initialPropsState} />);
  it('should render correctly', () => {
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should handle delete correctly correctly', () => {
    output.find('.card').simulate('click');
    output.find('.card').simulate('keyup');
    expect(initialPropsState.selectHandler.mock.calls.length).toBe(2);
  });

  it('should handle delete correctly correctly', () => {
    output.find('.delete').simulate('click');
    expect(initialPropsState.deleteHandler.mock.calls.length).toBe(1);
  });
});


describe('Card - different props', () => {
  it('Uploaded images', () => {
    const props = {
      ...initialPropsState,
      page: {
        ...pageModel,
        images: ['http://test.jpg'],
      },
    };
    const shallowWrapper = shallow(<Card {...props} />);
    expect(shallowWrapper.find('img').hasClass('w-100')).toBe(true);
  });

  it('No Title', () => {
    const props = {
      ...initialPropsState,
      page: {
        ...pageModel,
        title: 'NULL',
      },
    };
    const shallowWrapper = shallow(<Card {...props} />);
    expect(shallowWrapper.find('.card-title').text()).toBe('NO TITLE');
  });

  it('Body', () => {
    const props = {
      ...initialPropsState,
      page: {
        ...pageModel,
        body: null,
      },
    };
    const shallowWrapper = shallow(<Card {...props} />);
    expect(shallowWrapper.contains('.body')).toBe(false);
  });
});
