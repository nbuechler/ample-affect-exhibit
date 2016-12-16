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

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let emotion = JSON.parse(localStorage.getItem('lastEmotion'));
    let emotionName = capitalizeFirstLetter(emotion.emotion);
    let lastEmotionCreationDate = localStorage.getItem('lastEmotionCreationDate');

    return (
      <div>
        <a href="#/dashboard"><Button bsStyle="success" className="pull-right">Back to Dashboard</Button></a>
        <div style={{paddingBottom: '100px'}}>
          <h1><i className="fa fa-file-image-o" aria-hidden="true"></i> Infographic of {emotionName}</h1>
          <Row>
            <Col lg={6} lgOffset={3}>
              <h5>The following infographic depicts all of the data about the representational
              emotion, {emotionName}. It was last updated on {lastEmotionCreationDate}.</h5>
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
