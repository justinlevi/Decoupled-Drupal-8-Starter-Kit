import * as utilities from './utilities';
import * as data from '../../api/__mocks__/data';

const result = data.ARTICLES_BY_USER_DATA;
const { articles } = result.data.user.nodes;
const pageModel = {
    author: {
      name: 'admin',
    },
    title: 'New Title',
    body: {
      value: '<p>asdfasdf</p>\r\n',
    },
    nid: 14,
    uuid: 'be510cd5-645e-4f72-8baa-06cf89f53f84',
    images: [],
  };

const updatedArticle = [
  {
    author: {
      name: 'admin',
    },
    title: 'hello article update',
    body: null,
    nid: 13,
    uuid: '79502776-61f8-4c48-b464-d94eebe0e01b',
    images: [],
  },
  {
    author: {
      name: 'admin',
    },
    title: 'New Title',
    body: {
      value: '<p>asdfasdf</p>\r\n',
    },
    nid: 14,
    uuid: 'be510cd5-645e-4f72-8baa-06cf89f53f84',
    images: [],
  },
];

describe('articles utilities tests', () => {
  it('format fetch article result', () => {
    const expected = articles;
    const actual = utilities.formatFetchArticlesResult(result);
    expect(actual).toEqual(expected);
  });

  it('remove article from result', () => {
    const expected = [articles[1]];
    const actual = utilities.removeArticleFromArticles(articles, 13);
    expect(actual).toEqual(expected);
  });

  it('updates an article', () => {
    //The expected article array with the updated article
    const expected = updatedArticle;

    //Passing in the original article mock data, and the updated page.
    const actual = utilities.updateArticlesWithArticle(articles,pageModel);

    //Expecting the output to be the updatedArticle
    expect(expected).toEqual(actual);
  });

  it('gets the article from the nid', () => {
    //The expect article object
    const expected = articles[1];

    //Passing in the article we want to extract
    const actual = utilities.getArticleFromNid(articles,14);

    //Expecting the output to be the article object matching the nid of 14
    expect(actual).toEqual(expected);
  });
});
