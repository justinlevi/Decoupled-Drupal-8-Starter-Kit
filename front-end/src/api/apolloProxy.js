import gql from 'graphql-tag';
// import { graphql } from 'react-apollo';

import client from './apolloClient';

export const GET_BANNER = gql`
  query{
    block: blockContentById(id: "1"){
      ...on BlockContent{
        id: entityId
        title: entityLabel
        url: entityUrl {
          path
          routed
        }
        image: fieldBannerImage {
          url
        }
        blocktitle: fieldTitle
        blocksummary: fieldSummary
        blocklink: fieldContentLink {
          url {
            path
          }
          title
        }
      }
    }
  }
`;

export const SESSION_QUERY = gql`
  query {
    session @client {
      isConnected,
      isAuthenticated,
    }
  }
`;

export const getSessionQuery = (apolloClient = client) =>
  apolloClient.query({
    query: SESSION_QUERY,
    props: ({ data }) => ({
      isAuthenticated: data.session.isAuthenticated,
      isConnected: data.session.isConnected,
    }),
  });

// const getSession = (SESSION_QUERY, {
//   props: ({ data }) => ({ isAuthenticated: data.session.isAuthenticated }),
// });


export const UPDATE_AUTHENTICATED = gql`
  mutation updateAuthenticatedMutation($isAuthenticated: Boolean) {
    updateAuthenticated(isAuthenticated: $isAuthenticated) @client
  }
`;

export const updateAuthenticatedMutation = ({ isAuthenticated }, apolloClient = client) =>
  apolloClient.mutate({
    mutation: UPDATE_AUTHENTICATED,
    variables: { isAuthenticated },
  });

const fragments = {
  nodeArticle: gql`
    fragment ArticleFields on NodeArticle{
      author: entityOwner{
        name
      },
      entityUrl {
        path
      }
      title,
      body {
        value
      },
      nid,
      uuid
      images: fieldMediaImage {
        mid: targetId,
        ... on FieldNodeFieldMediaImage {
          entity {
            ... on MediaImage {
              mid,
              image: fieldMediaImage {
                file: entity {
                  ...on File {
                    filesize,
                    filename
                  }
                },
                derivative(style: MEDIUM) {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
};

export const FETCH_ARTICLE_BY_ROUTE = gql`
  query entityRoute($path: String!){
      route(path: $path) {
      path
      routed
      ... on EntityCanonicalUrl {
        entity {
          ...ArticleFields
        }
      }
    }
  }
  ${fragments.nodeArticle}
`;

export const FETCH_JWT_TOKEN = gql`
  query login ($username: String!, $password: String!){
    login(
      input:{
        username: $username,
        password: $password
    }){
      key
      error
    }
  }
`;

export const fetchJwtTokenQuery = (username, password, apolloClient = client) => apolloClient.query({
  query: FETCH_JWT_TOKEN,
  variables: {
    username,
    password,
  },
});

export const FETCH_ALL_ARTICLES = gql`
  query {
    nodeQuery (filter: {conditions: [
      {
        operator: EQUAL,
        field: "type",
        value: ["article"]
      }
    ]}){
      entities {
        entityLabel
        ...ArticleFields
      }
    }
  }
  ${fragments.nodeArticle}
`;

export const FETCH_ALL_ARTICLES_WITH_PERMISSIONS = gql`
  query {
    nodeQuery (filter: {conditions: [
      {
        operator: EQUAL,
        field: "type",
        value: ["article"]
      }
    ]}){
      entities {
        access: entityAccess(operation:"update")
        ...ArticleFields
      }
    }
  }
  ${fragments.nodeArticle}
`;

export const FETCH_FRONT_PAGE_ARTICLES = gql`
  query {
    nodeQuery(filter: {conditions: [
      {
        operator: EQUAL,
        field: "type",
        value: ["article"]
      }
    ]},limit: 3,sort: [
      {
        field: "changed",
      }
    ]) {
      entities {
        ...ArticleFields
      }
    }
  }
  ${fragments.nodeArticle}
`;

export const fetchFrontPageArticlesQuery = (apolloClient = client) => apolloClient.query({
  query: FETCH_FRONT_PAGE_ARTICLES,
});

export const CURRENT_USER_QUERY = gql`
  query{
    user: currentUserContext{
      uid,
      uuid
    }
  }
`;
export const currentUser = (apolloClient = client) => apolloClient.query({
  query: CURRENT_USER_QUERY,
});

export const ARTICLES_BY_USER_QUERY = gql`
  query articlesByUserQuery{
    user:currentUserContext{
      ...on User{
        uid
        nodes:reverseUidNode(offset:0, limit:1000){
          articles: entities{
            ... ArticleFields
          }
        }
      }
    }
  }
  ${fragments.nodeArticle}
`;
export const articlesByUser = (apolloClient = client) => apolloClient.query({
  query: ARTICLES_BY_USER_QUERY,
  fetchPolicy: 'network-only',
});

export const ARTICLE_BY_NID = gql`
  query nodeQuery($nid: String!){
    article: nodeById(id: $nid){
        ... ArticleFields
    }
  }
${fragments.nodeArticle}
`;

export const articleByNid = (nid, apolloClient = client) => apolloClient.query({
  query: ARTICLE_BY_NID,
  variables: {
    nid,
  },
});

export const CREATE_ARTICLE_MUTATION = gql`
  mutation createArticleMutation($title: String!){
    createArticle(input: {title: $title}){
      errors
      violations {
        message
        code
        path
      },
      page:entity{
        ... ArticleFields
      }
    }
  }
  ${fragments.nodeArticle}
`;

export const createArticleMutation = ({ title }, apolloClient = client) => apolloClient.mutate({
  mutation: CREATE_ARTICLE_MUTATION,
  // TO DO : UPDATE AFTER MUTATION
  // update is the recommended way of updating the cache after a query.
  // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-mutation-options-update
  // https://www.apollographql.com/docs/react/advanced/caching.html#after-mutations
  refetchQueries: [{
    query: FETCH_ALL_ARTICLES_WITH_PERMISSIONS,
  }],
  variables: {
    title,
  },
});

export const DELETE_ARTICLE_MUTATION = gql`
  mutation deleteArticleMutation($id: String!){
    deleteArticle(id: $id){
      page:entity{
        ...ArticleFields
      },
      errors,
      violations {
        message,
        code,
        path
      }
    }
  }
  ${fragments.nodeArticle}
`;

export const deleteArticleMutation = ({ id }, apolloClient = client) => apolloClient.mutate({
  mutation: DELETE_ARTICLE_MUTATION,
  update: (store, { data: { deleteArticle } }) => {
    // Read the data from our cache for this query.
    const data = store.readQuery({ query: FETCH_ALL_ARTICLES_WITH_PERMISSIONS });
    const index = data.nodeQuery.entities.findIndex(item => item.nid === deleteArticle.page.nid);
    if (index === -1) { return; }
    data.nodeQuery.entities.splice(index, 1);
    store.writeQuery({ query: FETCH_ALL_ARTICLES_WITH_PERMISSIONS, data });
  },
  variables: {
    id,
  },
});

export const UPDATE_ARTICLE_MUTATION = gql`
  mutation updateArticleMutation($id: String!, $title: String, $body: String, $field_media_image:[Int]){
    updateArticle(id: $id, input: {
      title: $title,
      body: $body,
      field_media_image: $field_media_image
    }){
      page: entity{
        ... ArticleFields
      },
      errors,
      violations {
        message,
        code,
        path
      }
    }
  }
  ${fragments.nodeArticle}
`;

export const updateArticleMutation = ({
  id, title, body, field_media_image,
}, apolloClient = client) => apolloClient.mutate({
  mutation: UPDATE_ARTICLE_MUTATION,
  // TO DO : UPDATE AFTER MUTATION
  // update is the recommended way of updating the cache after a query.
  // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-mutation-options-update
  // https://www.apollographql.com/docs/react/advanced/caching.html#after-mutations
  refetchQueries: [
    { query: ARTICLES_BY_USER_QUERY },
    { query: FETCH_ALL_ARTICLES_WITH_PERMISSIONS },
    {
      query: ARTICLE_BY_NID,
      variables: { nid: id },
    },
  ],
  variables: {
    id,
    title,
    body,
    field_media_image,
  },
});

export const GET_SIGNED_URLS = gql`
  query signedUploadURLsQuery ($input: SignedUploadInput!) {
    signedUploadURL(input:$input)
  }
`;

export const getSignedUrlsQuery = (fileNames, apolloClient = client) => apolloClient.query({
  query: GET_SIGNED_URLS,
  variables: {
    input: { fileNames },
  },
});

export const ADD_S3_FILES = gql`
  mutation addS3FilesMutation($input: S3FilesInput!) {
    addS3Files(input:$input){
      mid
    }
  }
`;

export const addS3FilesMutation = (file, apolloClient = client) => apolloClient.mutate({
  mutation: ADD_S3_FILES,
  variables: {
    input: { file },
  },
});

export const IMAGES_UPLOAD_MEDIA_CREATION = gql`
  mutation($files: Upload!) {
    imagesUploadMediaCreation(files: $files) {
      entity {
        mid: entityId
        ... on MediaImage {
          image: fieldMediaImage {
            file: entity {
              ...on File {
                filesize,
                filename
              }
            }
          }
        }
      }
    }
  }
`;

export const fileUploadMutation = (files, apolloClient = client) => apolloClient.mutate({
  mutation: IMAGES_UPLOAD_MEDIA_CREATION,
  variables: { files },
});
