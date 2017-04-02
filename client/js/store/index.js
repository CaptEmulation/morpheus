import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import morphReducer from '../reducers';

let middleware;
if (process.env.NODE_ENV === 'production') {
  middleware = applyMiddleware(thunkMiddleware, promiseMiddleware);
} else {
  const loggingMiddleware = createLogger();
  middleware = applyMiddleware(thunkMiddleware, promiseMiddleware, loggingMiddleware);
}

const store = createStore(
  morphReducer,
  middleware,
);

export default store;
