import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import renderer from 'react-test-renderer';
import Card from './Card';

const node = {
  images: [],
  title: 'test',
  body: {
    value: 'test'
  }
};

const generateShallowCard = (node) => {
  return shallow(
    <Card node={node} deleteHandler={jest.fn()} ctaHandler={jest.fn()} />
  );
}


describe('Card', () => {

  it('should render correctly', () => {
    const output = generateShallowCard(node);
    expect(shallowToJson(output)).toMatchSnapshot();
  });

});