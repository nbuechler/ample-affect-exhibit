import fetch from 'isomorphic-fetch';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import { Alert, Col, Row, Grid } from 'react-bootstrap';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showError: false,
      showSuccess: false,
      message: 'hello',
    }
  }

  handleSubmit = (e) => {
    const self = this;
    const input = this.refs.username;
    const pswd = this.refs.password;

    var ip = window.location.hostname;

    fetch(`http://` + ip + `:3000/postRemoteLogin`, {

      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: 'email=' + input.value + '&password=' + pswd.value
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
        /**
         * TODO: It may be worth considering creating a service for this to handle all error codes... but later.
         */
        if(data.customCode == 2001){
          var now = new Date;
          localStorage.setItem('currentSession', 1);
          localStorage.setItem('credentials', data._id);
          localStorage.setItem('focusedMonth', now.getMonth());
          localStorage.setItem('focusedYear', now.getYear());
          window.location.href = 'http://' + ip + ':4000/#/';
        } else if (data.customCode == 4031) {
          self.setState({showError: true});
          self.setState({message: data.errors[0].msg});
        } else if (data.customCode == 4032) {
          self.setState({showError: true});
          self.setState({message: data.msg});
        } else {
          console.error('Unable to login, try again later');
        }
      }).catch(function(error) {
        console.error('Request failed', error);
      });
  }

  render() {
    return (
      <div>
        { this.state.showError ? <Alert style={{textAlign: 'center'}} className="alert-danger col-lg-4 pull-right">{this.state.message}</Alert> : null }
        <h1>Sign In</h1>
        <div>
          <form className="login-form" onSubmit={::this.handleSubmit}>
            <Grid>
              <label>Username</label>
              <Row>
                <Col xs={6} sm={6} md={6} lg={9}>
                  <input className="form-control" type="text" ref="username" placeholder="Enter a username"/>
                </Col>
              </Row>
              <br></br>
              <label>Password</label>
              <Row>
                <Col xs={6} sm={6} md={6} lg={9}>
                  <input className="form-control" type="password" ref="password" placeholder="Enter a password"/>
                </Col>
              </Row>
            </Grid>
            <a type="submit" className="btn btn-success pull-right" onClick={::this.handleSubmit}><i className="fa fa-sign-in"/>Sign In
            </a>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
