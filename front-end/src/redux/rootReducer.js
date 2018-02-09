import { combineReducers } from 'redux';
import { reducer as csrfReducer } from 'redux/auth/csrf/reducers';
import { reducer as oauthReducer } from 'redux/auth/oauth/reducers';

export const rootReducer = combineReducers({
  csrf: csrfReducer,
  oauth: oauthReducer
});

export default rootReducer;
