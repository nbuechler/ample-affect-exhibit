import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import AsyncApp from './AsyncApp';

import { Route, Router } from 'react-router';
import createHistory from 'history/createBrowserHistory'

import Home from './Home/Home';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Logout from './Logout/Logout';
import Dashboard from './Dashboard/Dashboard';
import Stats from './Stats/Stats';
import NLPComprehensiveDisplay from './NLP/NLPComprehensiveDisplay';
import NLPStatsDisplay from './NLP/NLPStatsDisplay';
import NLPRadiantDisplay from './NLP/NLPRadiantDisplay';

const store = configureStore();

export default class Root extends Component {
  render() {
    //https://www.npmjs.com/package/history
    const history = createHistory()
    /*
     * These are the routes that get defined, and the component is a param.
     */
    return (
      <Provider store={store}>
        {
          <Router history={history}>
            <div>
              <Route path="/" component={AsyncApp}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/login" component={Login}/>
              <Route path="/logout" component={Logout}/>
              <Route path="/dashboard" component={Dashboard}/>
              <Route path="/stats" component={Stats}/>
              <Route path="/nlp" component={NLPComprehensiveDisplay}/>
              <Route path="/nlp-stats" component={NLPStatsDisplay}/>
              <Route path="/nlp-radiant" component={NLPRadiantDisplay}/>
            </div>
          </Router>
        }
      </Provider>
      // <div>hi</div>
    );
  }
}
