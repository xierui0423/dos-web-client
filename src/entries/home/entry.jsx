import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import reduceReducers from 'reduce-reducers';

import createSagaMiddleware from 'redux-saga';
import $ from 'jquery';
import injectTapEventPlugin from 'react-tap-event-plugin';

import reducers from '../../reducers';
import globalReducer from '../../reducers/global';
import sagas from '../../sagas';
import middlewares from '../../middlewares';
import rootRoute from '../../routes';
import initialState from '../../initialState';

window.$ = $;

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

const sagaMiddleware = createSagaMiddleware();

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reduceReducers(globalReducer, combineReducers(Object.assign({}, reducers))),
  initialState,
  composeEnhancers(
    applyMiddleware(...middlewares, sagaMiddleware, routerMiddleware(history))),
);

// $(document).ajaxError((event, xhr) => {
//   // Redirect to login view on authentication failure
//   if (xhr.status === 401) {
//     store.dispatch(push('/login'));
//   }
// });

sagas.forEach(sagaMiddleware.run);

ReactDOM.render(
  <Provider store={store} >
    <ConnectedRouter history={history} >{rootRoute}</ConnectedRouter >
  </Provider>,
  document.getElementById('app'),
);

// // Enable Webpack hot module replacement for reducers
// if (module.hot) {
//     module.hot.accept('./reducers/main-reducer.js', () => {
//         // eslint-disable-next-line
//         const nextRootReducer = require('./reducers/root.js').default;
//         store.replaceReducer(nextRootReducer);
//     });
// }
