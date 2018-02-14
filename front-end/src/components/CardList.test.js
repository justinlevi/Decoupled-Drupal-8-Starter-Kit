import React from 'react';
import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import CardList from './CardList';

const nodeModel = {
  author: {
    name: 'test',
  },
  body: {
    value: 'body test value',
  },
  images: [
    {
      entity: {
        image: {
          derivative: {
            url: 'http://d8d.loc/test.jpg',
            mid: 1,
          },
        },
      },
    },
  ],
  nid: 34,
  title: 'TEST TITLE',
  uuid: '09ba8da5-e08d-4972-a22b-ad7bb0a44d7f',
};

const nodes = [];
for (let i = 0; i < 10; i += 1) {
  nodes.push({
    ...nodeModel,
    author: { name: `test${i}` },
    nid: nodeModel.nid + i,
    title: `${nodeModel.title} ${i}`,
    uuid: nodeModel.uuid + i,
  });
}

const initialPropsState = {
  ctaHandler: jest.fn(),
  deleteItemHandler: jest.fn(),
  addPageMutation: jest.fn(),
  onModalToggle: jest.fn(),
  onModalOk: jest.fn(),
  isModalVisible: false,
  nodes,
};

let props;
let mounted;
const component = () => {
  if (!mounted) {
    mounted = mount(<CardList {...props} />);
  }
  return mounted;
};


const generateShallow = p => shallow(<CardList {...p} />);


describe('CardList', () => {
  beforeEach(() => {
    props = initialPropsState;
    mounted = undefined;
  });

  describe('Snapshots', () => {
    const output = generateShallow(initialPropsState);

    it('should render correctly', () => {
      expect(shallowToJson(output)).toMatchSnapshot();
    });

    it('should render a list of nodes as a Card', () => {
      expect(output.find('Card').length).toEqual(nodes.length);
    });
  });
});
