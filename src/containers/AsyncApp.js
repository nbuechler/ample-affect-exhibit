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
    return (
      <div>
        <Navbar className="navbar-inverse">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#/">ample-affect-exhibit</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem href="#/dashboard"><i className="fa fa-tachometer" aria-hidden="true"></i> Dashboard</NavItem>
            <NavItem href="#/stats"><i className="fa fa-signal" aria-hidden="true"></i> Stats</NavItem>
          </Nav>
        </Navbar>
        <div className="container" style={{marginTop: '5%'}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AsyncApp;
