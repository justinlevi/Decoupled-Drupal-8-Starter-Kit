import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import List from './List';

const pageModel = {
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

const articles = [];
for (let i = 0; i < 10; i += 1) {
  articles.push({
    ...pageModel,
    author: { name: `test${i}` },
    nid: pageModel.nid + i,
    title: `${pageModel.title} ${i}`,
    uuid: pageModel.uuid + i,
  });
}

const initialPropsState = {
  isAuthenticated: true,
  isLoggingIn: false,
  isModalVisible: false,
  addArticleHandler: jest.fn(),
  selectArticleHandler: jest.fn(),
  onDeleteModalToggle: jest.fn(),
  onDeleteModalOk: jest.fn(),
  articles,
};

describe('List', () => {
  describe('Snapshots', () => {
    const output = shallow(<List {...initialPropsState} />);

    it('should render correctly', () => {
      expect(shallowToJson(output)).toMatchSnapshot();
    });

    it('should render a list of articles as a Card', () => {
      expect(output.find('Card').length).toEqual(articles.length);
    });
  });
});
