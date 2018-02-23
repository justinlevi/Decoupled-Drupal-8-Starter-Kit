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
  editPageHandler: jest.fn(),
};

describe('Card', () => {
  it('should render correctly', () => {
    const output = shallow(<Card {...initialPropsState} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
