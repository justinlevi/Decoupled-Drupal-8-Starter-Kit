import { combineReducers } from 'redux';
import { reducer as csrfReducer } from './actions-reducers-sagas/auth/csrf/reducers';

export const rootReducer = combineReducers({
  csrf: csrfReducer
});

export default rootReducer;
