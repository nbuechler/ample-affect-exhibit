import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { Table, Button, Row, Col, Panel } from 'react-bootstrap';

import WordFrequencyScatterPlot from '../../components/subcharts/WordFrequencyScatterPlot'

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
    let lastEmotionText = localStorage.getItem('lastEmotionText');

    return (
      <div>
        <a href="#/nlp"><Button bsStyle="success" className="pull-right">Return to emotion set</Button></a>
        <div style={{paddingBottom: '100px'}}>
          <Row>
            <Col lg={6}>
              <div style={{fontSize: '10px'}}>Last updated on {lastEmotionCreationDate}.</div>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <div className="infographic--display_rank">
                <div className="infographic--display_rank-sub_heading">{emotionName}</div>
                {/*
                <br></br>
                <div className="infographic--display_rank-main_heading">3/400</div>
                <br></br>
                <div className="infographic--display_rank-sub_heading">in the 'All Affects' emotion set</div>
                */}
              </div>
              <div className="infographic--display_scores infographic--display_main-area-wrapper">
                <div className="infographic--display_scores-main_heading">{emotion.normalized_r_score.toFixed(4)}</div>
                <div className="infographic--display_scores-sub_heading">Normalized Score</div>
              </div>
            </Col>
            <Col lg={6} style={{paddingTop: '20px'}}>
              <WordFrequencyScatterPlot></WordFrequencyScatterPlot>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row>
            <Col lg={12}>
              <div className="infographic--emotion_set-title infographic--emotion_set-title_table">
                  <Table condensed style={{
                      fontSize: '12px',
                      marginLeft: '5%',
                      textAlign: 'left',
                      width: '95%',
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
                  </Table>
              </div>
              <div className="infographic--display_main-area-wrapper">
                <div className="infographic--display_main-area">
                  <Table condensed style={{
                      fontSize: '12px',
                      marginLeft: '5%',
                      textAlign: 'left',
                      width: '95%',
                      tableLayout: 'fixed',
                      marginBottom: '0px',
                    }}>
                    <tbody>
                      <AffectUnprocessedRowTableGroup data={emotion} limitList={0}></AffectUnprocessedRowTableGroup>
                      <AffectStemmedRowTableGroup data={emotion} limitList={0}></AffectStemmedRowTableGroup>
                      <AffectLemmatizedRowTableGroup data={emotion} limitList={0}></AffectLemmatizedRowTableGroup>
                    </tbody>
                  </Table>
                </div>
              </div>
              <div className="infographic--emotion_set-footer infographic--emotion_set-footer_table">
                  <Table condensed style={{
                      fontSize: '12px',
                      marginLeft: '5%',
                      textAlign: 'left',
                      width: '95%',
                      tableLayout: 'fixed',
                    }}>
                    <tbody>
                      <AffectCorpusLengthRowTableGroup data={emotion}></AffectCorpusLengthRowTableGroup>
                      <AffectNormalizedScoreRowTableGroup data={emotion}></AffectNormalizedScoreRowTableGroup>
                    </tbody>
                  </Table>
              </div>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row>
            {lastEmotionText.length > 0 &&
              <Col lg={6}>
                <div className="infographic--emotion_set-title">
                  Text used to generate this graphic
                </div>
                <div className="infographic--display_description-area-wrapper">
                  <div className="infographic--display_description-area">
                    <div className="infographic--display_description">
                    {lastEmotionText}
                    </div>
                  </div>
                </div>
              </Col>
            }
            <Col lg={6}>
              <div className="infographic--emotion_set-title">
                Methodology
              </div>
              <div className="infographic--display_description-area-wrapper">
                <div className="infographic--display_description-area">
                  <div className="infographic--display_description">
                    A representation emotion is an abstract concept, but you
                    might know them simply as emotions. {emotionName} is calculated
                    and scored based on a process that separates words from a
                    selection of text into and compares them to groups.
                  </div>
                  <div className="infographic--display_description">
                    The algorithm believes <i>'I Words'</i> are synonyms of {emotionName}
                    , the <i>'II Words'</i> are synonyms of those synonyms, and
                    the <i>'III Words'</i> are synonyms of those. The normalized score
                    is calculated by considering the total length of the group
                    the word is in. Smaller groups with any words receive more
                    points. A point is given for every word and weighted based
                    on which group(s) the word is in. Each group receives its
                    normalized score and they are combined to create the overall
                    normalized score for the representational emotion,{emotionName}.
                  </div>
                  <div className="infographic--display_description">
                    <i>'I-II Words'</i> are words that exist in both the <i>'I Words'</i>
                    and <i>'II Words'</i> groups. Similarly, <i>'II-III Words'</i>,
                    <i>'II-III Words'</i>, and <i>'I-II--III Words'</i> are groups
                    where a word exists in n-number of groups.
                  </div>
                  <div className="infographic--display_description">
                    A representational emotion is this algorithms cultural lens
                    of an emotion, and with sets of representational emotions,
                    the algorithm provides you something of an inference about
                    a particular selection of text.
                  </div>
                </div>
              </div>
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
