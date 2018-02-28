import { combineReducers } from 'redux';
import { reducer as csrfReducer } from 'redux/auth/csrf/reducers';
import { reducer as authReducer } from 'redux/auth/oauth/reducers';
import { reducer as articleReducer } from 'redux/article/reducers';
import { routerReducer } from 'react-router-redux';

export const combineAppReducers = combineReducers({
  csrfReducer,
  authReducer,
  articleReducer,
  routerReducer,
});

const rootReducer = (state, action) => {
  console.log(action.type);
  if (action.type === 'LOGOUT') {
    return combineAppReducers(undefined, action);
  }
  // Remove error message on refresh
  if (action.type === '@@INIT' && state) {
    return combineAppReducers({
      ...state,
      authReducer: {
        ...state.authReducer,
        error: undefined,
      },
    }, action);
  }
  return combineAppReducers(state, action);
};

export default rootReducer;
