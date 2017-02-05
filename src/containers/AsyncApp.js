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

    let loginButton, navOptions;
    if (localStorage.getItem('currentSession') == '1') {
      navOptions = (
        <Nav>
          <NavItem href="#/dashboard"><i className="fa fa-globe" aria-hidden="true"></i> Overview</NavItem>
          <NavItem href="#/nlp"><i className="fa fa-fire" aria-hidden="true"></i> Fast Processing</NavItem>
          <NavItem href="#/nlp"><i className="fa fa-tint" aria-hidden="true"></i> Precise Processing</NavItem>
          <NavItem href="#/nlp-radiant"><i className="fa fa-bolt" aria-hidden="true"></i> Radiant</NavItem>
        </Nav>
      )
      loginButton = <Nav pullRight>
                     <NavItem href="#/stats"><i className="fa fa-signal" aria-hidden="true"></i> Stats</NavItem>
                     <NavItem onClick={::this.handleLogout} href="#/">Sign out</NavItem>
                    </Nav>
    } else {
      navOptions = <Nav>
                   </Nav>
      loginButton = <Nav pullRight>
                     <NavItem href="#/signup">Sign Up</NavItem>
                     <NavItem href="#/login">Sign In</NavItem>
                    </Nav>
    }

   return (
     <div>
       <Navbar className="navbar-inverse">
         <Navbar.Header>
           <Navbar.Brand>
             <a href="#/">ample-affect-exhibit</a>
           </Navbar.Brand>
         </Navbar.Header>
         {navOptions}
         {loginButton}
       </Navbar>
       <div className="container" style={{marginTop: '5%', maxWidth: '1600px'}}>
         {this.props.children}
       </div>
     </div>
   );
  }
}

export default AsyncApp;
