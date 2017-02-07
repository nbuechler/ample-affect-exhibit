import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DivListGroup from '../groups/DivListGroup'

import { Table, Alert } from 'react-bootstrap';

class NLPNLTKPOSTable extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { data, isFetching, lastUpdated } = this.props;

    return (
      <div>
          Hello
      </div>
    );
  }
}

NLPNLTKPOSTable.propTypes = {
  data: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { dataByDataset } = state;
  const {
    isFetching,
    lastUpdated,
    items: data
  } = dataByDataset['nlp'] || {
    isFetching: true,
    items: []
  };

  return {
    data,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(NLPNLTKPOSTable);
