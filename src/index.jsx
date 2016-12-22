/**
 * Created by ray.xie on 9/12/2016.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import io from 'socket.io-client';
import App from './components/App.jsx';
import { LoginContainer } from './components/Login.jsx';
// import { MainContainer } from './components/Main.jsx';
import reducer from './reducers/reducer.js';
import { initialize } from './action-creators/action-creator';
import remoteActionMiddleware from './redux-middlewares/remote-action.js';

const routes = (<Route component={App} >
    <Route path="/" component={LoginContainer} />
</Route>);

// const socket = io(`${location.protocol}//${location.hostname}:8090`);
// const createStoreWithMiddleware = applyMiddleware(remoteActionMiddleware(socket))(createStore);
const store = createStore(reducer);

// socket.on('state', state =>
//     store.dispatch(setState(state))
// );

store.dispatch(initialize())

ReactDOM.render(
    <Provider store={store} >
        <Router history={hashHistory} >{routes}</Router>
    </Provider>,
    document.getElementById('app')
);
