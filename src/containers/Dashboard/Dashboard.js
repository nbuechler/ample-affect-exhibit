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
        <h1><i className="fa fa-tachometer" aria-hidden="true"></i> Dashboard</h1>
        <p>Choose an option:</p>
        <hr></hr>
        <div><i className="fa fa-language" aria-hidden="true"></i> <a href="#/nlp">Natural Language Processing</a></div>
        <hr></hr>
        <div><i className="fa fa-camera" aria-hidden="true"></i> <span style={notImplemented}>Computer Vision</span> (Not Implemented)</div>
        <div><i className="fa fa-flash" aria-hidden="true"></i> <span style={notImplemented}>Skin Conductance</span> (Not Implemented)</div>
        <div><i className="fa fa-thermometer-full" aria-hidden="true"></i> <span style={notImplemented}>Body Temperature</span> (Not Implemented)</div>
      </div>
    );
  }
}

export default Dashboard
