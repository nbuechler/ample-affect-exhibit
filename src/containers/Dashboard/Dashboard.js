import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Table, Button, Panel, Row, Col } from 'react-bootstrap';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { handleSubmit } = this.props;
    const notImplemented = {textDecoration: "line-through", color: "gray"}
    return (
      <div>
        <h1><i className="fa fa-globe" aria-hidden="true"></i> Overview</h1>
        <p>View linguitic processes from prior analyses below:</p>
        <br></br>
        <Row>
          <Col lg={9}>
            <div>
              <Panel header={'Most recent processes'}>
                Your most recent processes are shown here. Right now you don't have any! Why not run one?
              </Panel>
            </div>
          </Col>
          <Col lg={3}>
            <div>
              <Panel header={'Begin a new process'}>
                <div style={{marginBottom: '10px'}}>
                  For when you need your results right now.
                </div>
                <div style={{textAlign: 'right'}}>
                  <Button style={{width: '200px'}} bsSize="small" href="#/nlp">
                    <i className="fa fa-fire" aria-hidden="true"></i> Fast Processing
                  </Button>
                </div>
                <hr></hr>
                <div style={{marginBottom: '10px'}}>
                  For detailed results, that are the most precise.
                </div>
                <div style={{textAlign: 'right'}}>
                  <Button style={{width: '200px'}} bsSize="small" href="#/nlp">
                    <i className="fa fa fa-tint" aria-hidden="true"></i> Precise Processing
                  </Button>
                </div>
              </Panel>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard
