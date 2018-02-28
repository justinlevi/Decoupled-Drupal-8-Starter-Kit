import gql from 'graphql-tag';
import { apolloClient } from './apolloClient';

export { apolloClient } from './apolloClient';


const fragments = {
  nodeArticle: gql`
    fragment ArticleArticleFields on ArticleArticle{
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
              image {
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

export const currentUserUid = () => apolloClient.query({
  query: gql`
    query{
      currentUserContext{
        uid,
        uuid
      }
    }
  `,
});


export const articlesByUserQuery = () => apolloClient.query({
  query: gql`
    query articlesByUserQuery{
      user:currentUserContext{
        ...on User{
          uid
          nodes:reverseUidNode(offset:0, limit:1000){
            articles: entities{
              ... ArticleArticleFields
            }
          }
        }
      }
    }
    ${fragments.nodeArticle}
  `,
  fetchPolicy: 'network-only',
});

// export const articlesByUserQuery = gql `
//   query nodeQuery($uid: Int) {
//     nodeQuery(offset:0, limit: 10, filter:{uid:$uid}){
//       entities{
//         ... on ArticleArticleFields
//       }
//     }
//   }
// ${fragments.nodeArticle}
// `;

export const addArticleMutation = ({ title }) => apolloClient.mutate({
  mutation: gql`
    mutation addArticle($title: String!){
      addArticle(input: {title: $title}){
        errors
        violations {
          message
          code
          path
        },
        page:entity{
          ... ArticleArticleFields
        }
      }
    }
    ${fragments.nodeArticle}
  `,
  variables: {
    title,
  },
});

export const deleteArticleMutation = ({ id }) => apolloClient.mutate({
  mutation: gql`
    mutation deleteArticle($id:Int!){
      deleteArticle(id:$id){
        page:entity{
          ...ArticleArticleFields
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
  `,
  variables: {
    id,
  },
});

export const updateArticleMutation = ({
  id, title, body, field_media_image,
}) => apolloClient.mutate({
  mutation: gql`
  mutation updateArticle($id:Int!, $title:String, $body:String, $field_media_image:[Int]){
    updateArticle(id:$id,input:{
      title:$title,
      body:$body,
      field_media_image:$field_media_image
    }){
      page:entity{
        ... ArticleArticleFields
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
`,
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
