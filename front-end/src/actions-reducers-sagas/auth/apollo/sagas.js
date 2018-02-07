import {put, takeLatest,select} from 'redux-saga/effects';
import {SetApolloClient} from '../../../rootActions';

import { ApolloLink, concat } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../../../shared/fragmentTypes.json';

const POSTFIX = process.env.REACT_APP_XDEBUG_POSTFIX;
const URL = process.env.REACT_APP_HOST_DOMAIN;

const getCsrf = (state) => state.csrf.csrfToken;
const getAccessToken = (state) => state.oauth.accessToken;

function* initApolloClient(state){

  const token = yield select(getAccessToken);
  const csrf = yield select(getCsrf);

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the access_token to the headers

    operation.setContext( context => ({
      headers: {
        authorization: `Bearer ${token}` || null,
        'X-CSRF-Token': csrf || null,
      }
    }));
    return forward(operation);
  })

  const link = new HttpLink(
    {
      uri: URL.concat('/graphql' + POSTFIX),
    }
  );

  const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData});

  const client = new ApolloClient({
    // link: createUploadLink({ uri: process.env.API_URI })
    link: concat(authMiddleware, link),
    cache: new InMemoryCache({fragmentMatcher}),
  });

  yield put(SetApolloClient(client));

};

export function* watchApolloClient(){
  yield takeLatest('CSRF_ACCESS_TOKENS_SET',initApolloClient);
}
