import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { Table, Button, Row, Col, Panel } from 'react-bootstrap';

import StatsChart from '../../components/subcharts/StatsChart'

import AffectUnprocessedRowTableGroup from '../../components/groups/AffectUnprocessedRowTableGroup'
import AffectStemmedRowTableGroup from '../../components/groups/AffectStemmedRowTableGroup'
import AffectLemmatizedRowTableGroup from '../../components/groups/AffectLemmatizedRowTableGroup'
import AffectCorpusLengthRowTableGroup from '../../components/groups/AffectCorpusLengthRowTableGroup'
import AffectNormalizedScoreRowTableGroup from '../../components/groups/AffectNormalizedScoreRowTableGroup'

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
        <a href="#/nlp"><Button bsStyle="success" className="pull-right">Back to Affect Set</Button></a>
        <div style={{paddingBottom: '100px'}}>
          <h1><i className="fa fa-file-image-o" aria-hidden="true"></i> Infographic of {emotionName}</h1>
          <Row>
            <Col lg={6} lgOffset={3}>
              <h5>The following infographic depicts all of the data about the representational
              emotion, {emotionName}. It was last updated on {lastEmotionCreationDate}.</h5>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <div className="infographic--display_rank">
                <div className="infographic--display_rank-main_heading">3/400</div>
                <br></br>
                <div className="infographic--display_rank-sub_heading">in the 'All Affects' emotion set</div>
              </div>
              <div className="infographic--display_scores infographic--display_main-area-wrapper">
                <div className="infographic--display_scores-main_heading">10.0073</div>
                <div className="infographic--display_scores-sub_heading">Normalized Score</div>
              </div>
            </Col>
            <Col lg={6}>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row>
            <Col lg={12}>
              <Table condensed style={{
                  fontSize: '12px',
                  marginLeft: '0%',
                  textAlign: 'left',
                  width: '100%',
                  tableLayout: 'fixed',
                }}>
                <thead>
                  <tr>
                    <th></th>
                    <th>I Words</th>
                    <th>II Words</th>
                    <th>III Words</th>
                    <th>I-II Words</th>
                    <th>I-III Words</th>
                    <th>II-III Words</th>
                    <th>I-II-III Words</th>
                  </tr>
                </thead>
                <tbody>
                  <AffectUnprocessedRowTableGroup data={emotion} limitList={0}></AffectUnprocessedRowTableGroup>
                  <AffectStemmedRowTableGroup data={emotion} limitList={0}></AffectStemmedRowTableGroup>
                  <AffectLemmatizedRowTableGroup data={emotion} limitList={0}></AffectLemmatizedRowTableGroup>
                  <AffectCorpusLengthRowTableGroup data={emotion}></AffectCorpusLengthRowTableGroup>
                  <AffectNormalizedScoreRowTableGroup data={emotion}></AffectNormalizedScoreRowTableGroup>
                </tbody>
              </Table>
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
