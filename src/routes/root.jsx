import React from 'react';
import { Route } from 'react-router-dom';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { routerActions } from 'react-router-redux';
import MainContainer from '../components/root/element';
import LoginPageContainer from '../components/login/element';
import UserPageContainer from '../components/user/element';
import MarketPageContainer from '../components/market/element';
import LeaguePageContainer from '../components/market/sub-components/league/element';
import TeamPageContainer from '../components/market/sub-components/team/element';
import PlayerPageContainer from '../components/market/sub-components/player/element';
import ClubPageContainer from '../components/club/element';
import TacticPageContainer from '../components/tactic/element';

// Redirects to /login by default
const UserIsAuthenticated = connectedReduxRedirect({
  redirectAction: routerActions.replace,
  redirectPath: '/login',
  authenticatedSelector: state => state.get('userData').get('id') >= 0,
  // authenticatingSelector: state => state.user.isLoading,
  // AuthenticatingComponent: Loading,
  wrapperDisplayName: 'UserIsAuthenticated',
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
  <Route path="/club" exact component={UserIsAuthenticated(ClubPageContainer)} />
  <Route path="/tactic" exact component={UserIsAuthenticated(TacticPageContainer)} />
</MainContainer>);


const routes = (<Route component={MainContainerWrapper} />);


export default routes;
