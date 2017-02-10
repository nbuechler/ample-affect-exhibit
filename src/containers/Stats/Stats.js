import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Table } from 'react-bootstrap';

import NLPStatsDisplay from '../NLP/NLPStatsDisplay';

class Stats extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (

      <NLPStatsDisplay/>

    );
  }
}

export default Stats
