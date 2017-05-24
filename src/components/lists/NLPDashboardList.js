import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DivListGroup from '../groups/DivListGroup'
import NLPListItem from '../listitems/NLPListItem'

import { Row, Col, Table, Alert, Panel, ListGroup, Pagination } from 'react-bootstrap';

import { fetchDataIfNeeded } from '../../actions/actions';

class NLPDashboardList extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      "activePage": 1
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    let metadata = {
      'page': 1,
      'countPerPage': 5,
    }
    dispatch(fetchDataIfNeeded('nlp-analyses', '5000', metadata));
  }

  handleSelect(eventKey) {
    // TODO: Make api calls to update most recent processes.
    const { dispatch } = this.props;
    this.setState({
      activePage: eventKey
    });
    let metadata = {
      'page': eventKey,
      'countPerPage': 5,
    }
    dispatch(fetchDataIfNeeded('nlp-analyses', '5000', metadata));
  }

  render () {
    const { data, metadata, isFetching, lastUpdated } = this.props;

    let nlplistitems = [];
    console.log(this.props.data);
    console.log(this.props);
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
        {/*
            TODO: Create a stats Component here that makes use of this endpoint:

            dispatch(fetchDataIfNeeded('nlp-analyses-stats', '5000'));

        */}
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
            <div>
              <Row>
                <Col lg={12}>
                  <div className="pull-right">
                    <Pagination
                      prev
                      next
                      first
                      last
                      ellipsis
                      boundaryLinks
                      items={parseInt(this.props.metadata.totalPages)}
                      maxButtons={5}
                      activePage={this.state.activePage}
                      onSelect={this.handleSelect} />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  <ListGroup>
                    {nlplistitems}
                  </ListGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  <div className="pull-right">
                    <Pagination
                      prev
                      next
                      first
                      last
                      ellipsis
                      boundaryLinks
                      items={parseInt(this.props.metadata.totalPages)}
                      maxButtons={5}
                      activePage={this.state.activePage}
                      onSelect={this.handleSelect} />
                  </div>
                </Col>
              </Row>
            </div>
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
  metadata: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  console.log(state);
  const { dataByDataset } = state;
  const {
    isFetching,
    lastUpdated,
    items: data,
    metadata: metadata
  } = dataByDataset['nlp-analyses'] || {
    isFetching: true,
    items: [],
    metadata: {}
  };

  return {
    data,
    metadata,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(NLPDashboardList);
