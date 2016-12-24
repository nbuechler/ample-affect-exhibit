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
            <NavItem href="#/nlp-infographic"><i className="fa fa-file-image-o" aria-hidden="true"></i> NLP Infographic</NavItem>
          </Nav>
        </Navbar>
        <div className="container" style={{marginTop: '5%', maxWidth: '1600px'}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AsyncApp;
