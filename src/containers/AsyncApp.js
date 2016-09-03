import fetch from 'isomorphic-fetch';

import '../css/bootstrap.css';
import { Button,
         Nav,
         Navbar,
         NavBrand,
         NavItem,
         MenuItem,
         NavDropdown } from 'react-bootstrap';

import React, { Component, PropTypes } from 'react';
import { selectDataset, fetchDataIfNeeded, invalidateDataset } from '../actions/actions';

import { IndexLink, Link } from 'react-router';

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
      body: 'token=' + null
      })
      .then(status)
      .then(function json(response) {
        return response.json()
      })
      .then(function(data) {
        console.log('Request succeeded with JSON response', data);
        //4031, errors
        //4032, error msg
        //2001, success msg
        if(data.customCode == 2001){
          localStorage.setItem('lastSetMsg', data.msg);
          localStorage.setItem('currentSession', 0);
          window.location.href = 'http://' + ip + ':4000/#/logout';
        } else {
          console.error('Unable to logout, try again later');
        }
      }).catch(function(error) {
        console.error('Request failed', error);
      });
  }

  render () {
    /**
      * The are the route that get defined are in <Root>.
      * This is a component that is used as the routh path.
      */
     var ip = window.location.hostname;
     var loggrowerip = 'http://' + ip +':2000/';

     var loginButton, navOptions;
     if (localStorage.getItem('currentSession') == '0') {
       navOptions = <Nav>
                    </Nav>
       loginButton = <Nav right>
                      <li><a href={loggrowerip}>log-grower</a></li>
                      <li><Link to="/signup">Sign Up</Link></li>
                      <li><Link to="/login">Sign In</Link></li>
                     </Nav>

     } else {
       navOptions = (<Nav>
                      <NavDropdown title="Perspectives" id="basic-nav-dropdown">
                       <li header className='dropdown-header' style={{textAlign: 'center'}}>Choose a finder</li>
                       <MenuItem divider />
                       <li><Link to="/friendFinder">Friend Finder</Link></li>
                     </NavDropdown>
                   </Nav>)
       loginButton = <Nav right>
                      <li><a href={loggrowerip}>log-grower</a></li>
                      <li onClick={::this.handleLogout}><Link to="/logout">Sign out</Link></li>
                     </Nav>
     }

    return (
      <div>
        <Navbar className="navbar-inverse">
          <NavBrand><Link to="/">ample-affect-exhibit</Link></NavBrand>
          {navOptions}
          {loginButton}
        </Navbar>
        <div className="container" style={{marginTop: '5%'}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AsyncApp;
