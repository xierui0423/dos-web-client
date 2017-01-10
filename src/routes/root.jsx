import React from 'react';
import { Route } from 'react-router';
import MainContainer from '../components/main-layout.jsx';
import LoginFormContainer from '../components/login/element.jsx';
import UserPanelContainer from '../components/user/element.jsx';

const routes = (<Route component={MainContainer} >
    <Route path="/login" component={LoginFormContainer} />
    {
        ['/', '/user'].map(path => (<Route key={path} path={path} component={UserPanelContainer} />))
    }
</Route>);

export default routes;
