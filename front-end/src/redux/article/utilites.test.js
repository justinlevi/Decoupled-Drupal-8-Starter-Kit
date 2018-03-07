import * as utilities from './utilities';
import * as data from '../../api/__mocks__/data';

const result = data.ARTICLES_BY_USER_DATA;
const { articles } = result.data.user.nodes;

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

  // TO DO: WRITE THIS TEST
  it('updates an article', () => {
    expect(1).toEqual(1);
  });

  // TO DO: WRITE THIS TEST
  it('gets the article from the nid', () => {
    expect(1).toEqual(1);
  });
});
