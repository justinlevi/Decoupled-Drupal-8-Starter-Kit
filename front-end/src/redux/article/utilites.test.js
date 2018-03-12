import * as utilities from './utilities';
import * as data from '../../api/__mocks__/data';

const result = data.ARTICLES_BY_USER_DATA;
const nodes = result.data.user.nodes;
const { articles } = result.data.user.nodes;

const resultsImagesModel = () => {

  let imageResult = articles.map(node =>
    node.images = {
      ...node.images,
      entity:{
        image:{
          derivative:{
            url: ''
          }
        }
      },
      mid: ''
    }
  );

  return imageResult;
}

const resultsFlattenImagesModel = () => {
  let result = articles.map(node =>
    node.images = {
      url: '',
      mid: ''
    }
  );
  return result;
}

const pageModel = () => {
  let result = articles[1];
  result['title'] = 'New Title';
  return result;
}

const invalidPageModel = {
  ...articles[1],
  nid: 2
};

const updatedArticle = () => {
  let result = articles;
  result[1]['title'] = 'New Title';
  return result;
};

describe('articles utilities tests', () => {
  it('format fetch article result', () => {
    const expected = articles;
    const actual = utilities.formatFetchArticlesResult(result);
    expect(actual).toEqual(expected);
  });

  it('generate the url and mid of images', () => {

    result.data.user.nodes.articles.map((node) => {
      const newNode = { ...node };
      newNode.images = utilities.generateImageUrlMid(resultsImagesModel());
      expect(newNode.images).toEqual(resultsFlattenImagesModel());
      return newNode;
    })
  });

  it('remove article from result', () => {
    const expected = [articles[1]];
    const actual = utilities.removeArticleFromArticles(articles, 13);
    expect(actual).toEqual(expected);
  });

  it('remove an article that does not exist', () => {
    const expected = [articles[1]];
    const actual = utilities.removeArticleFromArticles(articles, 2);
    expect(actual).toEqual(false);
  });

  it('updates an article', () => {
    //The expected article array with the updated article
    const expected = updatedArticle();

    //Passing in the original article mock data, and the updated page.
    const actual = utilities.updateArticlesWithArticle(articles,pageModel());

    //Expecting the output to be the updatedArticle
    expect(expected).toEqual(actual);
  });

  it('try to updates an article with invalid page input', () => {
    //The expected article array with the updated article
    const expected = articles;
    //Passing in the original article mock data, and the updated page.
    const actual = utilities.updateArticlesWithArticle(articles,invalidPageModel);
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
