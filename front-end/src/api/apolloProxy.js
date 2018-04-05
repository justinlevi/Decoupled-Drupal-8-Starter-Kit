import gql from 'graphql-tag';
// import { graphql } from 'react-apollo';

import client from './apolloClient';


export const SESSION_QUERY = gql`
  query {
    session @client {
      isConnected,
      isAuthenticated
    }
  }
`;

export const getSession = (apolloClient = client) =>
  apolloClient.query({ query: SESSION_QUERY });


export const UPDATE_AUTHENTICATED = gql`
  mutation updateAuthenticated($isAuthenticated: Boolean) {
    updateAuthenticated(isAuthenticated: $isAuthenticated) @client
  }
`;

export const updateAuthenticated = ({ isAuthenticated }, apolloClient = client) =>
  apolloClient.mutate({
    mutation: UPDATE_AUTHENTICATED,
    variables: { isAuthenticated },
  });


const fragments = {
  nodeArticle: gql`
    fragment ArticleFields on NodeArticle{
      author:entityOwner{
        name
      },
      title,
      body {
        value
      },
      nid,
      uuid
      images:fieldMediaImage{
        mid:targetId,
        ... on FieldNodeFieldMediaImage {
          entity{
            ... on MediaImage {
              image:fieldMediaImage {
                derivative(style:MEDIUM) {
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

export const LIST_ARTICLES = gql`
  query articlesByUserQuery{
    user:currentUserContext @client{
      ...on User {
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

export const fetchJwtToken = (username, password, apolloClient = client) => apolloClient.query({
  query: FETCH_JWT_TOKEN,
  variables: {
    username,
    password,
  },
});


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
        entityLabel
        ... on NodeArticle {
          fieldMediaImage {
            ... on FieldNodeFieldMediaImage {
              entity {
                ... on MediaImage {
                  image: fieldMediaImage {
                    derivative(style: MEDIUM) {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
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

// export const articlesByUserQuery = gql `
//   query nodeQuery($uid: Int) {
//     nodeQuery(offset:0, limit: 10, filter:{uid:$uid}){
//       entities{
//         ... on ArticleFields
//       }
//     }
//   }
// ${fragments.nodeArticle}
// `;

export const CREATE_ARTICLE_MUTATION = gql`
  mutation createArticle($title: String!){
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
export const createArticle = ({ title }, apolloClient = client) => apolloClient.mutate({
  mutation: CREATE_ARTICLE_MUTATION,
  variables: {
    title,
  },
});

export const DELETE_ARTICLE_MUTATION = gql`
  mutation deleteArticle($id:String!){
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
export const deleteArticle = ({ id }, apolloClient = client) => apolloClient.mutate({
  mutation: DELETE_ARTICLE_MUTATION,
  variables: {
    id,
  },
});

export const UPDATE_ARTICLE_MUTATION = gql`
  mutation updateArticle($id:String!, $title:String, $body:String, $field_media_image:[Int]){
    updateArticle(id:$id,input:{
      title:$title,
      body:$body,
      field_media_image:$field_media_image
    }){
      page:entity{
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
export const updateArticle = ({
  id, title, body, field_media_image,
}, apolloClient = client) => apolloClient.mutate({
  mutation: UPDATE_ARTICLE_MUTATION,
  variables: {
    id,
    title,
    body,
    field_media_image,
  },
});

export const GET_SIGNED_URLS = gql`
  query signedUploadURL ($input: SignedUploadInput!) {
    signedUploadURL(input:$input)
  }
`;

export const ADD_S3_FILES = gql`
  mutation addS3Files($input: S3FilesInput!) {
    addS3Files(input:$input){
      mid
    }
  }
`;
