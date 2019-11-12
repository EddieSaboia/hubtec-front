import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login/index'
import Register from './pages/Register/index'
import Dashboard from './pages/Dashboard/index'


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/Register" exact component={Register}/>
                <Route path="/Dashboard" exact component={Dashboard}/>
            </Switch>
        </BrowserRouter>
    );
}