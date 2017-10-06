import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
