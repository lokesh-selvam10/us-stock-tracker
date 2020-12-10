import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducer from './reducers/index.js'
import { SnackbarProvider } from 'notistack';

const store = createStore(allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider>
    <App store={store}/>
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
);


serviceWorker.unregister();
