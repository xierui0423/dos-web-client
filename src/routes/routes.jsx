/**
 * Created by ray.xie on 12/29/2016.
 */
import React from 'react';
import { Route } from 'react-router';
import App from '../components/App.jsx';
import LoginFormContainer from '../components/Login/element.jsx';

const routes = (<Route component={App} >
    <Route path="/" component={LoginFormContainer} />
</Route>);

export default routes;
