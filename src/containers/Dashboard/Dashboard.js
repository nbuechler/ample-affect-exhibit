import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Table } from 'react-bootstrap';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { handleSubmit } = this.props;
    const notImplemented = {textDecoration: "line-through", color: "gray"}
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Choose an option:</p>
        <hr></hr>
        <li><a href="#/nlp">Natural Language Processing</a></li>
        <hr></hr>
        <li> <span style={notImplemented}>Computer Vision</span> (Not Implemented)</li>
        <li> <span style={notImplemented}>Skin Conduance</span> (Not Implemented)</li>
        <li> <span style={notImplemented}>Body Temperature</span> (Not Implemented)</li>
      </div>
    );
  }
}

export default Dashboard
