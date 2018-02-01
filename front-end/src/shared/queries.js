import gql from 'graphql-tag';

export const currentUserUid = gql `
  query{
    currentUserContext{
      uid,
      uuid
    }
  }
`;


export const nodeTitlesByUserReverseQuery = gql `

  query nodeTitlesByUserReverseQuery{
    user:currentUserContext{
      ...on User{
        uid
        nodes:reverseUidNode{
          entities{
            ...on NodePage{
              title,
              nid,
              uuid
              images:fieldMediaImage{
                mid:targetId
              }
            }
          }
        }
      }
    }
  }

`;

export const nodeTitlesByUserQuery = gql `
  query nodeQuery($uid: Int) {
    nodeQuery(offset:0, limit: 10, filter:{uid:$uid}){
      entities{
        ...on NodePage {
          title,
          nid,
          uuid
          images:fieldMediaImage{
            mid:targetId
          }
        }
      }
    }
  }
`;

export const addPageMutation = gql `
  mutation addPage($title: String!){
    addPage(input: {title: $title}){
      entity{
        ...on NodePage {
          nid,
          uuid,
          images:fieldMediaImage{
            mid:targetId
          }
        }
      }
    }
  }
`;

export const getSignedUrls = gql `
  query signedUploadURL ($input: SignedUploadInput!) {
    signedUploadURL(input:$input)
  }
`;

export const addS3Files = gql `
  mutation addS3Files($input: S3FilesInput!) {
    addS3Files(input:$input){
      mid
    }
  }
`;

export const updatePageMutation = gql `
  mutation updatePage($id:Int!, $field_media_image:[Int]){
    updatePage(id:$id,input:{
      field_media_image:$field_media_image
    }){
      page:entity{
        ...on NodePage {
          nid,
          uuid
        }
      }
    }
  }
`;
