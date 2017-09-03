import React from 'react';
import { Route } from 'react-router-dom';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import MainContainer from '../components/layout/element';
import LoginFormContainer from '../components/login/element';
import UserPanelContainer from '../components/user/element';

// Redirects to /login by default
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.get('userData').toJSON(), // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated', // a nice name for this auth check
});

const MainContainerWrapper = () => (<MainContainer>
  <Route path="/login" component={LoginFormContainer} />
  {
    ['/', '/user'].map(path => (
      <Route key={path} exact path={path} component={UserIsAuthenticated(UserPanelContainer)} />))
  }</MainContainer>);


const routes = (<Route component={MainContainerWrapper} />);


export default routes;
