import gql from 'graphql-tag';


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
  `
}

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
            ... NodePageFields
          }
        }
      }
    }
  }
  ${fragments.nodePage}
`;

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

export const addPageMutation = gql `
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
`;


export const deletePageMutation = gql `
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
`;
