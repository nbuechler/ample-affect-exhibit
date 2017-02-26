import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DivListGroup from '../groups/DivListGroup'

import { Table, Alert, Panel } from 'react-bootstrap';

import { selectActivityDataset, fetchDataIfNeeded } from '../../actions/actions';

class NLPCardList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataIfNeeded('nlp-analyses', '5000'));
  }


  render () {
    const { data, isFetching, lastUpdated } = this.props;

    return (
      <div>
        <Panel header={'Most recent processes'}>
          Your most recent processes are shown here. Right now you don't have any! Why not run one?
        </Panel>
      </div>
    );
  }
}

NLPCardList.propTypes = {
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
  } = dataByDataset['nlp-analyses'] || {
    isFetching: true,
    items: []
  };

  return {
    data,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(NLPCardList);
