import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { routerActions } from 'react-router-redux';
import MainContainer from '../pages/root/element';
import LoginPageContainer from '../pages/login/element';
import UserPageContainer from '../pages/user/element';
import MarketPageContainer from '../pages/market/element';
import LeaguePageContainer from '../pages/market/sub-components/league/element';
import TeamPageContainer from '../pages/market/sub-components/team/element';
import PlayerPageContainer from '../pages/market/sub-components/player/element';
import ClubPageContainer from '../pages/club/element';
import TacticPageContainer from '../pages/tactic/element';

// Redirects to /login by default
const UserIsAuthenticated = connectedReduxRedirect({
  redirectAction: routerActions.replace,
  redirectPath: '/login',
  authenticatedSelector: state => state.get('userData').get('id') >= 0,
  wrapperDisplayName: 'UserIsAuthenticated',
});

const MainContainerWrapper = () => (<MainContainer>
  <Switch>
    <Route path="/login" exact component={LoginPageContainer} />
    <Route path="/user" exact component={UserIsAuthenticated(UserPageContainer)} />
    <Route path="/market" exact component={UserIsAuthenticated(MarketPageContainer)} />
    <Route path="/market/:league" exact component={UserIsAuthenticated(LeaguePageContainer)} />
    <Route path="/market/:league/:team" exact component={UserIsAuthenticated(TeamPageContainer)} />
    <Route path="/market/:league/:team/:player" exact component={UserIsAuthenticated(PlayerPageContainer)} />
    <Route path="/club" exact component={UserIsAuthenticated(ClubPageContainer)} />
    <Route path="/tactic" exact component={UserIsAuthenticated(TacticPageContainer)} />
    <Redirect to="/user" />
  </Switch>
</MainContainer>);


const routes = (<Route component={MainContainerWrapper} />);


export default routes;
