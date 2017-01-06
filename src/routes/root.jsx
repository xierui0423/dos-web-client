/**
 * Created by ray.xie on 12/29/2016.
 */
import React from 'react';
import { Route } from 'react-router';
import AppContainer from '../components/App.jsx';
import LoginFormContainer from '../components/login/element.jsx';


const routes = (<Route component={AppContainer} >
    <Route path="/" component={LoginFormContainer} />
</Route>);

export default routes;
