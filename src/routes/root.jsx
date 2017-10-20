import React from 'react';
import { Route } from 'react-router-dom';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import MainContainer from '../components/layout/element';
import LoginPageContainer from '../components/login/element';
import UserPageContainer from '../components/user/element';
import MarketPageContainer from '../components/market/element';
import LeaguePageContainer from '../components/market/league/element';
import TeamPageContainer from '../components/market/team/element';
import PlayerPageContainer from '../components/market/player/element';

// Redirects to /login by default
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.get('userData').toJSON(), // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated', // a nice name for this auth check
  failureRedirectPath: '/login',
});

const MainContainerWrapper = () => (<MainContainer>
  {
    ['/', '/user'].map(path => (
      <Route key={path} exact path={path} component={UserIsAuthenticated(UserPageContainer)} />))
  }
  <Route path="/login" exact component={LoginPageContainer} />
  <Route path="/market" exact component={UserIsAuthenticated(MarketPageContainer)} />
  <Route path="/market/:league" exact component={UserIsAuthenticated(LeaguePageContainer)} />
  <Route path="/market/:league/:team" exact component={UserIsAuthenticated(TeamPageContainer)} />
  <Route path="/market/:league/:team/:player" exact component={UserIsAuthenticated(PlayerPageContainer)} />
</MainContainer>);


const routes = (<Route component={MainContainerWrapper} />);


export default routes;
