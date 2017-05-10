import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Table, Button, Panel, Row, Col, Pagination } from 'react-bootstrap';


import NLPDashboardList from '../../components/lists/NLPDashboardList';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      "activePage": 1
    }
  }

  handleSelect(eventKey) {
    // TODO: Make api calls to update most recent processes.
    this.setState({
      activePage: eventKey
    });
  }

  render () {
    const { handleSubmit } = this.props;
    const notImplemented = {textDecoration: "line-through", color: "gray"}
    return (
      <div>

        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={20}
          maxButtons={3}
          activePage={this.state.activePage}
          onSelect={this.handleSelect} />

        <h1><i className="fa fa-globe" aria-hidden="true"></i> Overview</h1>
        <p>View linguistic processes from prior analyses below:</p>
        <br></br>
        <Row>
          <Col lg={12}>
            <NLPDashboardList/>
          </Col>
          {/*
            TODO: Make this a transparent module
          <Col lg={3}>
            <div>
              <Panel header={'Begin a new process'}>
                <div style={{marginBottom: '10px'}}>
                  For when you need your results right now.
                </div>
                <div style={{textAlign: 'right'}}>
                  <Button style={{width: '200px'}} bsSize="xsmall" href="#/nlp">
                    <i className="fa fa-fire" aria-hidden="true"></i> Fast Processing
                  </Button>
                </div>
                <hr></hr>
                <div style={{marginBottom: '10px'}}>
                  For detailed results, that are the most precise.
                </div>
                <div style={{textAlign: 'right'}}>
                  <Button style={{width: '200px'}} bsSize="xsmall" href="#/nlp">
                    <i className="fa fa-tint" aria-hidden="true"></i> Precise Processing
                  </Button>
                </div>
              </Panel>
            </div>
          </Col>
          */}
        </Row>
      </div>
    );
  }
}

export default Dashboard
