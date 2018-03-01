import gql from 'graphql-tag';
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
            ... on MediaImage {
              image:fieldImage {
                derivative(style:medium) {
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


export const currentUserUidQuery = gql`
  query{
    currentUserContext{
      uid,
      uuid
    }
  }
`;
export const currentUserUid = () => apolloClient.query({
  query: currentUserUidQuery,
});


export const articlesByUserQuery = gql`
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
  query: articlesByUserQuery,
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

export const addArticleMutation = gql`
  mutation addArticle($title: String!){
    addArticle(input: {title: $title}){
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
export const addArticle = ({ title }) => apolloClient.mutate({
  mutation: addArticleMutation,
  variables: {
    title,
  },
});

export const deleteArticleMutation = gql`
  mutation deleteArticle($id:Int!){
    deleteArticle(id:$id){
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
  mutation updateArticle($id:Int!, $title:String, $body:String, $field_media_image:[Int]){
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
