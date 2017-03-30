import React from 'react';
import { Route } from 'react-router';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import MainContainer from '../components/main-layout.jsx';
import LoginFormContainer from '../components/login/element.jsx';
import UserPanelContainer from '../components/user/element.jsx';
import PlayerContainer from '../components/player/element.jsx';
import MatchContainer from '../components/match/element.jsx';

// Redirects to /login by default
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.get('userData').toJSON(), // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated', // a nice name for this auth check
});

const routes = (<Route component={MainContainer} >
  <Route path="/login" component={LoginFormContainer} />
  {
        ['/', '/user'].map((path, index) => (
          <Route key={index} path={path} component={UserIsAuthenticated(UserPanelContainer)} />))
    }
  < Route path="/player" component={UserIsAuthenticated(PlayerContainer)} />
  < Route path="/match" component={UserIsAuthenticated(MatchContainer)} />
</Route>);

export default routes;
