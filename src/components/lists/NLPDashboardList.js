import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DivListGroup from '../groups/DivListGroup'
import NLPListItem from '../listitems/NLPListItem'

import { Table, Alert, Panel, ListGroup } from 'react-bootstrap';

import { selectActivityDataset, fetchDataIfNeeded } from '../../actions/actions';

class NLPDashboardList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataIfNeeded('nlp-analyses', '5000'));
  }


  render () {
    const { data, isFetching, lastUpdated } = this.props;

    let nlplistitems = [];
    if (this.props.data.length > 0) {
      let data = this.props.data;
      for (var i = 0; i < data.length; i++) {
        nlplistitems.push(
          <NLPListItem key={'card-' + i} data={data[i]} />
        )
      }

    }

    return (
      <div>
        <Panel header={'Most recent processes'}>
          {isFetching && data.length === 0 &&
            <Alert bsStyle="success">Loading...</Alert>
          }
          {!isFetching && data.length === 0 &&
            <Alert bsStyle="success">Your most recent processes are shown here. Right now you don't have any! Why not run one?</Alert>
          }
          {data.length > 0 &&
            <ListGroup>
              {nlplistitems}
            </ListGroup>
          }
        </Panel>
      </div>
    );
  }
}

NLPDashboardList.propTypes = {
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

export default connect(mapStateToProps)(NLPDashboardList);
