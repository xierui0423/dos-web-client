/**
 * Created by ray.xie on 9/12/2016.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import $ from 'jquery';

import reducer from './reducers/main-reducer.js';
import { initialize } from './action-creators';
import routes from './routes/routes.jsx';
import middlewares from './middlewares';

import { handleLoginSaga } from './components/login/sagas';
import { clearLoadingMessageSaga } from './sagas/sagas';

window.$ = $;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(...middlewares, sagaMiddleware));

sagaMiddleware.run(handleLoginSaga);
sagaMiddleware.run(clearLoadingMessageSaga);

store.dispatch(initialize());

ReactDOM.render(
    <Provider store={store} >
        <Router history={hashHistory} >{routes}</Router>
    </Provider>,
    document.getElementById('app')
);

// Enable Webpack hot module replacement for reducers
if (module.hot) {
    module.hot.accept('./reducers/main-reducer.js', () => {
        // eslint-disable-next-line
        const nextRootReducer = require('./reducers/main-reducer.js').default;
        store.replaceReducer(nextRootReducer);
    });
}
