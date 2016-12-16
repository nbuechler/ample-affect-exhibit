import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { Table, Button, Row, Col, Panel } from 'react-bootstrap';

import StatsChart from '../../components/subcharts/StatsChart'

class NLPStatsDisplay extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  handleRefreshClick(e) {
    e.preventDefault();
  }
  
  // /helpers/stats/0
  render () {
    const { } = this.props;

    return (
      <div>
        <a href="#/stats"><Button bsStyle="success" className="pull-right">Back</Button></a>
        <div style={{paddingBottom: '100px'}}>
          <h1><i className="fa fa-language" aria-hidden="true"></i> Statistics of NLP Corpora</h1>
          <Row>
            <Col lg={6} lgOffset={3}>
              <StatsChart></StatsChart>
            </Col>
            <Col lg={6} lgOffset={3}>
              <h5>The X-axis represents 124 of the 19840 words used as a signal
              of affect. Imagine slicing the data 160 times at equal spacing
              starting at the first word. If we then graph the first word found
              in each of those slices, we would get a graph something like above.</h5>
              <h5>The y-axis is based on the number of times that word signals a
              representational emotion (R-Emotion).</h5>
              <h5>For example, the word 'state' signals 329 emotions in the corpora!</h5>
              <h5>This bar chart shows the frequency distribution of every word
              used to describe the representational emotion (R-Emotion).</h5>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

NLPStatsDisplay.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { } = state;

  return {
  };
}

export default connect(mapStateToProps)(NLPStatsDisplay);
