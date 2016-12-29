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

import reducer from './reducers/reducer.js';
import { initialize } from './action-creators';
import routes from './routes/routes.jsx';

import { handleLoginSaga, handleLoadingSaga } from './components/Login/sagas';


window.$ = $;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(handleLoginSaga);
sagaMiddleware.run(handleLoadingSaga);

store.dispatch(initialize());

ReactDOM.render(
    <Provider store={store} >
        <Router history={hashHistory} >{routes}</Router>
    </Provider>,
    document.getElementById('app')
);

// Enable Webpack hot module replacement for reducers
if (module.hot) {
    module.hot.accept('./reducers/reducer.js', () => {
        // eslint-disable-next-line
        const nextRootReducer = require('./reducers/reducer.js').default;
        store.replaceReducer(nextRootReducer);
    });
}
