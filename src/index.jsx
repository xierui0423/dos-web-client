/**
 * Created by ray.xie on 9/12/2016.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import createSagaMiddleware from 'redux-saga';
import $ from 'jquery';

import reducers from './reducers';
import sagas from './sagas';
import middlewares from './middlewares';
import rootRoute from './routes';


window.$ = $;

$(document).ajaxError((event, xhr) => {
    // Redirect to login view on authentication failure
    if (xhr.status === 401) {
        hashHistory.push('login');
    }
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers(Object.assign({}, reducers
)), applyMiddleware(...middlewares, sagaMiddleware));

sagas.forEach(sagaMiddleware.run);

store.dispatch({
    type: 'INITIALIZE_STATE',
});

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store, {
    selectLocationState(state) {
        return state.get('routing').toObject();
    },
});

ReactDOM.render(
    <Provider store={store} >
        <Router history={history} >{rootRoute}</Router>
    </Provider>,
    document.getElementById('app')
);

// // Enable Webpack hot module replacement for reducers
// if (module.hot) {
//     module.hot.accept('./reducers/main-reducer.js', () => {
//         // eslint-disable-next-line
//         const nextRootReducer = require('./reducers/root.js').default;
//         store.replaceReducer(nextRootReducer);
//     });
// }
