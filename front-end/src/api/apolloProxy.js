import gql from 'graphql-tag';
import { apolloClient } from './apolloClient';

export { apolloClient } from './apolloClient';


const fragments = {
  nodePage: gql`
    fragment NodePageFields on NodePage{
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


export const pagesByUserQuery = () => apolloClient.query({
  query: gql`
    query pagesByUserQuery{
      user:currentUserContext{
        ...on User{
          uid
          nodes:reverseUidNode(offset:0, limit:1000){
            pages: entities{
              ... NodePageFields
            }
          }
        }
      }
    }
    ${fragments.nodePage}
  `,
  fetchPolicy: 'network-only',
});

// export const pagesByUserQuery = gql `
//   query nodeQuery($uid: Int) {
//     nodeQuery(offset:0, limit: 10, filter:{uid:$uid}){
//       entities{
//         ... on NodePageFields
//       }
//     }
//   }
// ${fragments.nodePage}
// `;

export const addPageMutation = ({ title, body }) => apolloClient.mutate({
  mutation: gql`
    mutation addPage($title: String!, $body: String!){
      addPage(input: {title: $title, body: $body}){
        errors
        violations {
          message
          code
          path
        },
        page:entity{
          ... NodePageFields
        }
      }
    }
    ${fragments.nodePage}
  `,
  variables: {
    title,
    body
  },
});

export const deletePageMutation = ({ id }) => apolloClient.mutate({
  mutation: gql`
    mutation deletePage($id:Int!){
      deletePage(id:$id){
        page:entity{
          ...NodePageFields
        },
        errors,
        violations {
          message,
          code,
          path
        }
      }
    }
    ${fragments.nodePage}
  `,
  variables: {
    id,
  },
});

export const updatePageMutation = ({
  id, title, body, field_media_image,
}) => apolloClient.mutate({
  mutation: gql`
  mutation updatePage($id:Int!, $title:String, $body:String, $field_media_image:[Int]){
    updatePage(id:$id,input:{
      title:$title,
      body:$body,
      field_media_image:$field_media_image
    }){
      page:entity{
        ... NodePageFields
      },
      errors,
      violations {
        message,
        code,
        path
      }
    }
  }
  ${fragments.nodePage}
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
