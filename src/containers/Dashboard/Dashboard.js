import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Table } from 'react-bootstrap';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  handleChange(nextDataset) {
  }

  handleRefreshClick(e) {
    e.preventDefault();
  }

  render () {

    return (
      <div>
        <h1>Hello world</h1>
        <p>This is a Dashboard?</p>
      </div>
    );
  }
}

export default Dashboard
