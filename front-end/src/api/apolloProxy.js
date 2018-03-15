import gql from 'graphql-tag';
// import { graphql } from 'react-apollo';

import { apolloClient } from './apolloClient';

export { apolloClient } from './apolloClient';


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
              ... on MediaMediaImage {
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


export const CURRENT_USER_QUERY = gql`
  query{
    user: currentUserContext{
      uid,
      uuid
    }
  }
`;
export const currentUser = () => apolloClient.query({
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
export const articlesByUser = () => apolloClient.query({
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

export const createArticleMutation = gql`
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
export const createArticle = ({ title }) => apolloClient.mutate({
  mutation: createArticleMutation,
  variables: {
    title,
  },
});

export const deleteArticleMutation = gql`
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
export const deleteArticle = ({ id }) => apolloClient.mutate({
  mutation: deleteArticleMutation,
  variables: {
    id,
  },
});

export const updateArticleMutation = gql`
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
}) => apolloClient.mutate({
  mutation: updateArticleMutation,
  variables: {
    id,
    title,
    body,
    field_media_image,
  },
});

export const getSignedUrls = gql`
  query signedUploadURL ($input: SignedUploadInput!) {
    signedUploadURL(input:$input)
  }
`;

export const addS3Files = gql`
  mutation addS3Files($input: S3FilesInput!) {
    addS3Files(input:$input){
      mid
    }
  }
`;
