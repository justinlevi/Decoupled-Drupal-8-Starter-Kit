import { combineReducers } from 'redux';
import { reducer as csrfReducer } from './actions-reducers-sagas/auth/csrf/reducers';
import { reducer as apolloReducer } from './actions-reducers-sagas/auth/apollo/reducers';

export const rootReducer = combineReducers({
  csrf: csrfReducer,
  apollo: apolloReducer
});

export default rootReducer;
