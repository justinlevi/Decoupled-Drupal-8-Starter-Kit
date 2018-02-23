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
            entities{
              ... NodePageFields
            }
          }
        }
      }
    }
    ${fragments.nodePage}
  `,
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

export const addPageMutation = ({ title }) => apolloClient.mutate({
  mutation: gql`
    mutation addPage($title: String!){
      addPage(input: {title: $title}){
        errors
        violations {
          message
          code
          path
        },
        entity{
          ... NodePageFields
        }
      }
    }
    ${fragments.nodePage}
  `,
  variables: {
    title,
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


export const getSignedUrls = ({ files }) => apolloClient.query({
  query: gql`
    query signedUploadURL ($input: SignedUploadInput!) {
      signedUploadURL(input:$input)
    }
  `,
  variables: {
    input: { fileNames: files },
  },
});

export const addS3Files = ({ files }) => apolloClient.query({
  query: gql`
    mutation addS3Files($input: S3FilesInput!) {
      addS3Files(input:$input){
        mid
      }
    }
  `,
  variables: {
    input: { files },
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
