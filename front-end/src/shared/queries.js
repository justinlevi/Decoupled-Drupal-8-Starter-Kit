import gql from 'graphql-tag';


export const currentUserUid = gql `
  query{
    currentUserContext{
      uid,
      uuid
    }
  }
`;


export const pagesByUserQuery = gql `
  query pagesByUserQuery{
    user:currentUserContext{
      ...on User{
        uid
        nodes:reverseUidNode(offset:0, limit:1000){
          entities{
            ...on NodePage{
              title,
              body {
                value
              },
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

// export const pagesByUserQuery = gql `
//   query nodeQuery($uid: Int) {
//     nodeQuery(offset:0, limit: 10, filter:{uid:$uid}){
//       entities{
//         ...on NodePage{
//         title,
//         nid,
//         uuid
//         images:fieldMediaImage{
//           mid:targetId
//         }
//       }
//       }
//     }
//   }
// `;

export const addPageMutation = gql `
  mutation addPage($title: String!){
    addPage(input: {title: $title}){
      entity{
        ...on NodePage{
        title,
        body {
          value
        },
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
  mutation updatePage($id:Int!, $title:String, $body:String, $field_media_image:[Int]){
    updatePage(id:$id,input:{
      title:$title,
      body:$body
      field_media_image:$field_media_image
    }){
      page:entity{
        ...on NodePage{
        title,
        body {
          value
        },
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


export const deletePageMutation = gql `
  mutation deletePage($id:Int!){
    deletePage(id:$id){
      page:entity{
        ...on NodePage{
        title,
        body {
          value
        },
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
