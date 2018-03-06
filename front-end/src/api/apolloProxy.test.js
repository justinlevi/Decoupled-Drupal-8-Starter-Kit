import { introspectionQuery, buildClientSchema, graphql } from 'graphql';
import { addMockFunctionsToSchema } from 'graphql-tools';
import { print } from 'graphql/language/printer';

import * as introspectionResult from './schema.json';

import {
  CURRENT_USER_QUERY,
  ARTICLES_BY_USER_QUERY,
  addArticleMutation,
  deleteArticleMutation,
  updateArticleMutation,
  getSignedUrls,
  addS3Files,
} from './apolloProxy';


describe('Testing GraphQL Queries', () => {
  // Make a GraphQL schema with no resolvers
  const schema = buildClientSchema(introspectionResult);

  // // Add mocks, modifies schema in place
  addMockFunctionsToSchema({ schema });

  it('Check Current User Query', async () => graphql(schema, print(CURRENT_USER_QUERY), null).then((result) => {
    expect(result.data.user.uuid).toEqual('Hello World');
  }));

  it('Check Articles by User Query', async () => graphql(schema, print(ARTICLES_BY_USER_QUERY), null).then((result) => {
    expect(result.data.user.nodes.articles.length).toBeGreaterThanOrEqual(0);
  }));

  it('Check getSignedUrls Query', async () => graphql(schema, print(getSignedUrls), null, null, { input: { fileNames: ['test.jpg'] } }).then((result) => {
    expect(result.data.signedUploadURL.length).toBeGreaterThanOrEqual(0);
  }));

  it('Check addArticleMutation', async () => graphql(schema, print(addArticleMutation), null, null, { title: 'Hello Everybody' }).then((result) => {
    expect(result.data.addArticle.page).toBeDefined();
  }));

  it('Check deleteArticleMutation', async () => graphql(schema, print(deleteArticleMutation), null, null, { id: 1 }).then((result) => {
    expect(result.data.deleteArticle.page).toBeDefined();
  }));

  it('Check updateArticleMutation', async () => graphql(schema, print(updateArticleMutation), null, null, {
    id: 1, title: 'asdfasd', body: 'body text', field_media_image: [1, 2, 3],
  }).then((result) => {
    expect(result.data.updateArticle.page).toBeDefined();
  }));

  it('Check addS3Files', async () => graphql(schema, print(addS3Files), null, null, {
    input: { files: { filename: '1.jpg', filesize: 123, url: 'http://test.jpg' } },
  }).then((result) => {
    expect(result.data.addS3Files).toBeDefined();
  }));
});
