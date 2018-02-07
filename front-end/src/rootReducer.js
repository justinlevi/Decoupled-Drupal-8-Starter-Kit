import { combineReducers } from 'redux';
import { reducer as csrfReducer } from './actions-reducers-sagas/auth/csrf/reducers';
import { reducer as apolloReducer } from './actions-reducers-sagas/auth/apollo/reducers';
import { reducer as oauthReducer } from './actions-reducers-sagas/auth/oauth/reducers';

export const rootReducer = combineReducers({
  csrf: csrfReducer,
  apollo: apolloReducer,
  oauth: oauthReducer
});

export default rootReducer;
