import { combineReducers } from 'redux';
import { reducer as csrfReducer } from 'redux/auth/csrf/reducers';
import { reducer as oauthReducer } from 'redux/auth/oauth/reducers';
import { routerReducer } from 'react-router-redux';

export const rootReducer = combineReducers({
  csrf: csrfReducer,
  oauth: oauthReducer,
  router: routerReducer,
});

export default rootReducer;
