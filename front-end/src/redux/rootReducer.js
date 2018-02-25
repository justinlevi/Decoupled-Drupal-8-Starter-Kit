import { combineReducers } from 'redux';
import { reducer as csrfReducer } from 'redux/auth/csrf/reducers';
import { reducer as authReducer } from 'redux/auth/oauth/reducers';
import { reducer as pageReducer } from 'redux/page/reducers';
import { routerReducer } from 'react-router-redux';

export const combineAppReducers = combineReducers({
  csrfReducer,
  authReducer,
  pageReducer,
  routerReducer,
});

const rootReducer = (state, action) => {
  console.log(action.type);
  if (action.type === 'LOGOUT') {
    return combineAppReducers(undefined, action);
  }
  // Remove error message on refresh
  if (action.type === '@@INIT') {
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
