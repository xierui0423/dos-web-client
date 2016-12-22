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
import { VotingContainer } from './components/Voting.jsx';
import { ResultsContainer } from './components/Results.jsx';
import reducer from './reducers/reducer.js';
import { setState } from './action-creators/action-creator';
import remoteActionMiddleware from './redux-middlewares/remote-action.js';

const routes = (<Route component={App}>
  <Route path="/" component={VotingContainer} />
  <Route path="/results" component={ResultsContainer} />
</Route>);

const socket = io(`${location.protocol}//${location.hostname}:8090`);
const createStoreWithMiddleware = applyMiddleware(remoteActionMiddleware(socket))(createStore);
const store = createStoreWithMiddleware(reducer);

socket.on('state', state =>
  store.dispatch(setState(state))
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
