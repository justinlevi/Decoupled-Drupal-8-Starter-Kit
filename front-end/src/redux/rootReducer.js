import { combineReducers } from 'redux';
import { reducer as csrfReducer } from 'redux/auth/csrf/reducers';
import { reducer as apolloReducer } from 'redux/auth/apollo/reducers';
import { reducer as oauthReducer } from 'redux/auth/oauth/reducers';

export const rootReducer = combineReducers({
  csrf: csrfReducer,
  apollo: apolloReducer,
  oauth: oauthReducer
});

export default rootReducer;
