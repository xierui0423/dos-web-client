import Rx from 'rxjs';

import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import jss from 'jss';
import jssGlobal from 'jss-global';
import $ from 'jquery';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createEpicMiddleware } from 'redux-observable';
import { AppContainer } from 'react-hot-loader';

import rootEpic from '../../epics';
import reducers from '../../reducers';
import middlewares from '../../middlewares';
import rootRoute from '../../routes';
import initialState from '../../initial-state';

window.$ = $;
window.Rx = Rx;

jss.setup({
  plugins: [jssGlobal()], // WITH PARENS!
});

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

const epicMiddleware = createEpicMiddleware(rootEpic);

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(
    applyMiddleware(...middlewares, epicMiddleware, routerMiddleware(history))),
);

$(document).ajaxError((event, xhr) => {
  // Redirect to login view on authentication failure
  if (xhr.status === 401) {
    store.dispatch(push('/login'));
  }
});

const render = (route) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store} >
        <ConnectedRouter history={history} >{route}</ConnectedRouter >
      </Provider>
    </AppContainer>,
  document.getElementById('root'),
);
};

render(rootRoute);

if (module.hot) {
  module.hot.accept('../../reducers/index.js', () => {
    // eslint-disable-next-line
    const nextRootReducer = require('../../reducers/index.js').default;
    store.replaceReducer(nextRootReducer);
  });

  module.hot.accept('../../routes/index.js', () => {
    // eslint-disable-next-line
    const nextRootRoute = require('../../routes/index.js').default;
    render(nextRootRoute);
  });

  module.hot.accept('../../epics/index.js', () => {
    // eslint-disable-next-line
    const nextRootEpic = require('../../epics/index.js').default;
    epicMiddleware.replaceEpic(nextRootEpic);
  });
}
