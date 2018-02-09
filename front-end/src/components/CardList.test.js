import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import renderer from 'react-test-renderer';
import CardList from './CardList';

const props = {
  isModalVisible: false,
  nodes: [
    {
      author: "test",
      body:{
        value: "body test value"
      },
      images: [
        { 
          entity: {
            image: {
              derivative: {
                url: "http://d8d.loc/test.jpg",
                mid: 1
              }
            }
          }
        }
      ],
      nid: 34,
      title: "TEST TITLE",
      uuid: "09ba8da5-e08d-4972-a22b-ad7bb0a44d7f"
    },
    {
      author: "test2",
      body:{
        value: "body test value"
      },
      images: [
        { 
          entity: {
            image: {
              derivative: {
                url: "http://d8d.loc/test.jpg",
                mid: 1
              }
            }
          }
        }
      ],
      nid: 34,
      title: "TEST TITLE",
      uuid: "09ba8da5-e08d-4972-a22b-ad7bb0a44d7f"
    }
  ]
};

const generateShallowCardList = (props) => {
  return shallow(
    <CardList {...props}
      ctaHandler={jest.fn()} 
      deleteItemHandler={jest.fn()} 
      addPageMutation={jest.fn()} 
      onModalToggle={jest.fn()} 
      onModalOk={jest.fn()} 
    />
  );
}


describe('CardList', () => {
  it('should render correctly', () => {
    const output = generateShallowCardList(props);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});