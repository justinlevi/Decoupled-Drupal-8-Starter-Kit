# PAGE MUTATION



ADD PAGE MUTATION W/ ENTITY REFERENCE FIELD
```$xslt
mutation{
  addArticle(input: {title: "Hey 2", body:"asdfa", image_ids:[1,2,3]}){
    entity{
      ...on NodeArticle {
        fieldMediaImage {
          ...on FieldNodeFieldMediaImage {
            entity{
              ...on MediaImage {
                image {
                  derivative(style:large){
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

```

RESULT

```$xslt
{
  "data": {
    "addArticle": {
      "entity": {
        "fieldMediaImage": [
          {
            "entity": {
              "image": {
                "derivative": {
                  "url": "http://d8d.loc/s3/files/styles/large/public/test/placeholder-project-id/bob_ross.jpg?itok=RpX6Al2o"
                }
              }
            }
          },
          {
            "entity": {
              "image": {
                "derivative": {
                  "url": "http://d8d.loc/s3/files/styles/large/public/test/placeholder-project-id/3-600x450.jpg?itok=x5IbhYGi"
                }
              }
            }
          },
          {
            "entity": {
              "image": {
                "derivative": {
                  "url": "http://d8d.loc/s3/files/styles/large/public/test2/placeholder-project-id/bob_ross.jpg?itok=e_svmUCY"
                }
              }
            }
          }
        ]
      }
    }
  }
}
```


---


UPDATE MUTATION

```$xslt
mutation {
  updateArticle(id:110, input:{title:"Justin"}){
    entity{
      ...on NodeArticle {
        nid
        title
        body{
          value
        }
      }
    }
  }
}
```


RESULT
```$xslt
{
  "data": {
    "updateArticle": {
      "entity": {
        "nid": 111,
        "title": "Justin",
        "body": null
      }
    }
  }
}
```


---


DELETE MUTATION
```$xslt
mutation {
  deleteArticle(id:111){
    entity{
      ...on NodeArticle {
        nid
        title
        body{
          value
        }
      }
    }
  }
}

```


RESULT

```$xslt
{
  "data": {
    "deleteArticle": {
      "entity": {
        "nid": 111,
        "title": "Justin",
        "body": null
      }
    }
  }
}
```