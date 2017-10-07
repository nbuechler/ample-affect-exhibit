import fetch from 'isomorphic-fetch';

import '../css/bootstrap.css';
import { Button,
         Nav,
         Navbar,
         NavBrand,
         NavItem,
         MenuItem,
         NavDropdown } from 'react-bootstrap';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { selectDataset, fetchDataIfNeeded, invalidateDataset } from '../actions/actions';

import Home from './Home/Home';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Logout from './Logout/Logout';
import Dashboard from './Dashboard/Dashboard';
import NLPComprehensiveDisplay from './NLP/NLPComprehensiveDisplay';
import NLPStatsDisplay from './NLP/NLPStatsDisplay';
import NLPRadiantDisplay from './NLP/NLPRadiantDisplay';

import { Link, NavLink, Route } from 'react-router-dom';

class AsyncApp extends Component {

  handleLogout = (e) => {
    const self = this;
    const input = this.refs.username;
    const pswd = this.refs.password;

    var ip = window.location.hostname;

    fetch(`http://` + ip + `:3000/postRemoteLogout`, {

      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: 'token=' + localStorage.getItem('credentials')
      })
      .then(data => {
        //4031, errors
        //4032, error msg
        //2001, success msg
        if(data.status == 200){
        localStorage.setItem('currentSession', 0);
        localStorage.setItem('credentials', '');
        window.location.reload()
        } else {
        console.error('Unable to logout, try again later');
        }
      }).catch(function(error) {
        console.log(error);
      });
  }

  render () {
    /**
      * The are the route that get defined are in <Root>.
      * This is a component that is used as the routh path.
      */
    let ip = window.location.hostname;

    let loginButtons, navOptions;
    if (localStorage.getItem('currentSession') == '1') {
      navOptions = (
        <div>
          <nav className="nav navbar-nav">
            <li>
              <NavLink to="/dashboard"><i className="fa fa-globe" aria-hidden="true"></i> Overview</NavLink>
            </li>
            <li>
              <NavLink to="/nlp"><i className="fa fa-fire" aria-hidden="true"></i> Fast Processing</NavLink>
            </li>
            <li>
              <NavLink to="/nlp"><i className="fa fa-tint" aria-hidden="true"></i> Precise Processing</NavLink>
            </li>
            <li>
              <NavLink to="/nlp-radiant"><i className="fa fa-bolt" aria-hidden="true"></i> Radiant</NavLink>
            </li>
          </nav>
        </div>
      )
      loginButtons = (
        <div>
          <nav className="nav navbar-nav navbar-right">
            <li>
              <NavLink to="/stats"><i className="fa fa-signal" aria-hidden="true"></i> Stats</NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={::this.handleLogout}>Sign out</NavLink>
            </li>
          </nav>
        </div>
      )
    } else {
      navOptions = <nav></nav>
      loginButtons = (
        <div>
          <nav className="nav navbar-nav navbar-right">
            <li>
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
            <li>
              <NavLink to="/login">Sign In</NavLink>
            </li>
          </nav>
        </div>
      )
    }

   return (
     <div>
       <Navbar className="navbar-inverse">
         <Navbar.Header>
           <Navbar.Brand>
             <NavLink to="/">ample-affect-exhibit</NavLink>
           </Navbar.Brand>
         </Navbar.Header>
         {navOptions}
         {loginButtons}
       </Navbar>
       <div className="container" style={{marginTop: '5%', maxWidth: '1600px'}}>
         <Route path="/" exact component={Home}/>
         <Route path="/signup" component={Signup}/>
         <Route path="/login" component={Login}/>
         <Route path="/logout" component={Logout}/>
         <Route path="/dashboard" component={Dashboard}/>
         <Route path="/nlp" component={NLPComprehensiveDisplay}/>
         <Route path="/stats" component={NLPStatsDisplay}/>
         <Route path="/nlp-radiant" component={NLPRadiantDisplay}/>
       </div>
     </div>
   );
  }
}

export default AsyncApp;
