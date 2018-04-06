const fetch = require('node-fetch');
const fs = require('fs');

fetch('http://decoupleddrupal8starterkit.docksal/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
    {
        __schema {
          queryType { name }
          mutationType { name }
          subscriptionType { name }
          types {
            ...FullType
          }
          directives {
            name
            description
            args {
              ...InputValue
            }
            onOperation
            onFragment
            onField
          }
        }
      }

      fragment FullType on __Type {
        kind
        name
        description
        fields(includeDeprecated: true) {
          name
          description
          args {
            ...InputValue
          }
          type {
            ...TypeRef
          }
          isDeprecated
          deprecationReason
        }
        inputFields {
          ...InputValue
        }
        interfaces {
          ...TypeRef
        }
        enumValues(includeDeprecated: true) {
          name
          description
          isDeprecated
          deprecationReason
        }
        possibleTypes {
          ...TypeRef
        }
      }

      fragment InputValue on __InputValue {
        name
        description
        type { ...TypeRef }
        defaultValue
      }

      fragment TypeRef on __Type {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
            }
          }
        }
      }
    `,
  }),
})
  .then(result => result.json())
  .then((result) => {
    // here we're filtering out any type information unrelated to unions or interfaces
    // const filteredData = result.data.__schema.types.filter(type => type.possibleTypes !== null);
    // result.data.__schema.types = filteredData;
    fs.writeFile('./src/api/schema.json', JSON.stringify(result.data), (err) => {
      if (err) console.error('Error writing schema file', err);
      console.log('Schema types successfully extracted!');
    });
  })
  .catch((error) => {
    console.log(`${error}`);
    return error;
  });
