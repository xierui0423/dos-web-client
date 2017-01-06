/**
 * Created by ray.xie on 12/29/2016.
 */
import React from 'react';
import { Route } from 'react-router';
import MainContainer from '../components/main-layout.jsx';
import LoginFormContainer from '../components/login/element.jsx';


const routes = (<Route component={MainContainer} >
    <Route path="/" component={LoginFormContainer} />
</Route>);

export default routes;
