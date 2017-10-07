import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Jumbotron } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
      <Jumbotron style={{margin: '0%', padding: '10%', background: '#111 none repeat scroll 0% 0%'}}>
        <h2 style={{textAlign: 'right'}}>Ample Affect Exhibit</h2>
        <h5>This interface aims to provide you access to an affect evaluation tool.</h5>
        <Link to="/dashboard">
          <Button bsStyle="success" className="pull-right">
            Great!
          </Button>
        </Link>
      </Jumbotron>
    );
  }
}

export default Home
