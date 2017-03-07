import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DivListGroup from '../groups/DivListGroup'
import NLPListItem from '../listitems/NLPListItem'

import { Table, Alert, Panel, ListGroup } from 'react-bootstrap';

import { fetchDataIfNeeded } from '../../actions/actions';

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
        <div className="dashboard--emotion_set-title">
          Most recent processes
        </div>
        <div className="dashboard--display_main-area-wrapper">
          {isFetching && data.length === 0 &&
            <div style={{padding: "10px"}}>Loading...</div>
          }
          {!isFetching && data.length === 0 &&
            <div style={{padding: "10px"}}>Your most recent processes are shown here. Right now you don't have any! Why not run one?</div>
          }
          {data.length > 0 &&
            <ListGroup>
              {nlplistitems}
            </ListGroup>
          }
        </div>
        <div className="dashboard--emotion_set-footer" style={{fontSize: "12px", textAlign: "right"}}>
          Currently showing five processes
        </div>
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
