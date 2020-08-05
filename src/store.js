import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();

/* eslint-enable */

const store = configureStore({
  reducer: rootReducer,
  devtoolMiddleware
});

export default store;
