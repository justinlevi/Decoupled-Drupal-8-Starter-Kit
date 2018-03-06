export const CURRENT_USER_QUERY_DATA = {
  data: {
    user: {
      uid: 1,
      uuid: '4e9af657-689b-4c06-8721-e267914f2255',
    },
  },
};

export const ARTICLES_BY_USER_DATA = {
  data: {
    user: {
      uid: 1,
      nodes: {
        articles: [
          {
            author: {
              name: 'admin',
            },
            title: 'hello article update',
            body: null,
            nid: 13,
            uuid: '79502776-61f8-4c48-b464-d94eebe0e01b',
            images: [],
          },
          {
            author: {
              name: 'admin',
            },
            title: 'asdfads',
            body: {
              value: '<p>asdfasdf</p>\r\n',
            },
            nid: 14,
            uuid: 'be510cd5-645e-4f72-8baa-06cf89f53f84',
            images: [],
          },
        ],
      },
    },
  },
};


export default {};
