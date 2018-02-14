import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Card from './Card';

const nodeModel = {
  images: [],
  title: 'test',
  body: {
    value: 'test',
  },
};

const generateShallowCard = node => shallow(<Card
  node={node}
  deleteHandler={jest.fn()}
  ctaHandler={jest.fn()}
/>);


describe('Card', () => {
  it('should render correctly', () => {
    const output = generateShallowCard(nodeModel);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
