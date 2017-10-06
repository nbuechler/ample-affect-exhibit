import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DivListGroup from '../groups/DivListGroup'

import { Table, Alert } from 'react-bootstrap';

import { selectActivityDataset, fetchDataIfNeeded } from '../../actions/actions';

import BarChart from '../d3charts/BarChart'

class StatsChart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataIfNeeded('nlp-stats', '5000'));
  }


  render () {
    const { data, isFetching, lastUpdated } = this.props;

    return (
      <div style={{width: "550px", border: "1px solid #DDD", margin: 'auto'}}>
        <BarChart
            title={'Word Affect Frequency Distribution'}
            distinctColors={false}
            modulus={1}
            fillColors={['none']}
            data={data}
            width={'500'} />
      </div>
    );
  }
}

StatsChart.propTypes = {
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
  } = dataByDataset['nlp-stats'] || {
    isFetching: true,
    items: []
  };

  return {
    data,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(StatsChart);
