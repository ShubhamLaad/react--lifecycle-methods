import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home';
import Content from './Content';
import NotFound from './NotFound';

// 1) uncomment following to demonstrate React Router-4
// 2) make changes in Home.js for Link as per version of router

import {BrowserRouter, Route,Switch } from 'react-router-dom'

var routes = (
    <BrowserRouter>
        <Home path="/">
          <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/content" component={Content}/>
            <Route component={NotFound}/>
          </Switch>
        </Home>
    </BrowserRouter>
)

ReactDOM.render(
  routes,
  document.getElementById('root')
);
