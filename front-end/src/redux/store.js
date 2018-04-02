import storage from 'redux-persist/es/storage';

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import { createFilter } from 'redux-persist-transform-filter';
import { persistReducer, persistStore } from 'redux-persist';
import { routerMiddleware } from 'react-router-redux';

import apiMiddleware from './middleware';
import rootReducer from './rootReducer';

export default (history) => {
  const persistedFilter = createFilter('auth', ['access', 'refresh']);

  const reducer = persistReducer(
    {
      key: 'polls',
      storage,
      whitelist: ['auth'],
      transforms: [persistedFilter],
    },
    rootReducer,
  );

  const sagaMiddleware = createSagaMiddleWare();

  const store = createStore(
    reducer, {},
    compose(
      applyMiddleware(apiMiddleware, sagaMiddleware, routerMiddleware(history)),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );

  persistStore(store);

  return store;
};

