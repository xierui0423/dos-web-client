/**
 * Created by ray.xie on 9/12/2016.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import $ from 'jquery';
import App from './components/App.jsx';
import LoginFormContainer from './components/Login/element.jsx';
import reducer from './reducers/reducer.js';
import { initialize } from './action-creators';

import { handleLoginSaga, handleLoadingSaga } from './components/Login/sagas';


window.$ = $;

const routes = (<Route component={App} >
    <Route path="/" component={LoginFormContainer} />
</Route>);

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
