import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
// import Querystring from 'query-string';
// import axios from 'axios';

import {
  ACTIONS,
  // addPage,
  // deletePage,
  // editPage,
} from './actions';

// function* fetchPageSaga(action) {
//   // get apolloClient from redux store

// }

function* addPageSaga(action) {
  yield call(console.log(action.type));
}

function* deletePageSaga(action) {
  yield call(console.log(action.type));
}

function* editPageSaga(action) {
  yield call(console.log(action.type));
}

export function* watchPageActions() {
  // yield takeEvery(ACTIONS.FETCH_PAGES, fetchPageSaga);


  yield takeLatest(ACTIONS.ADD_PAGE, addPageSaga);
  yield takeEvery(ACTIONS.DELETE_PAGE, deletePageSaga);
  yield takeLatest(ACTIONS.EDIT_PAGE, editPageSaga);
}

export default watchPageActions;
