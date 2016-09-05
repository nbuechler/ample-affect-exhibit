import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import AsyncApp from './AsyncApp';

import {IndexRoute, Route, Router, browserHistory, hashHistory} from 'react-router';

import  Home  from './Home/Home';
import  Signup  from './Signup/Signup';
import  Login  from './Login/Login';
import  Logout  from './Logout/Logout';
import  Dashboard  from './Dashboard/Dashboard';
import  NLPDisplay  from './NLP/NLPDisplay';

const store = configureStore();

export default class Root extends Component {
  render() {
    /*
     * These are the routes that get defined, and the component is a param.
     */
    return (
      <Provider store={store}>
        {
          <Router history={hashHistory}>
            <Route path="/" component={AsyncApp}>
              <IndexRoute component={Home}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/login" component={Login}/>
              <Route path="/logout" component={Logout}/>
              <Route path="/dashboard" component={Dashboard}/>
              <Route path="/nlp" component={NLPDisplay}/>
            </Route>
          </Router>
        }
      </Provider>
    );
  }
}
