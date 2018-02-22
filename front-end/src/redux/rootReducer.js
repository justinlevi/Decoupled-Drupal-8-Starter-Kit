import { combineReducers } from 'redux';
import { reducer as csrfReducer } from 'redux/auth/csrf/reducers';
import { reducer as authReducer } from 'redux/auth/oauth/reducers';
import { reducer as pageReducer } from 'redux/page/reducers';
import { routerReducer } from 'react-router-redux';

export const rootReducer = combineReducers({
  csrfReducer,
  authReducer,
  pageReducer,
  routerReducer,
});

export default rootReducer;
