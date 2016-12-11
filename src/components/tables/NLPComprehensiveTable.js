import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DivListGroup from '../groups/DivListGroup'
import DivList from '../lists/DivList'
import StatisticGroup from '../groups/StatisticGroup'
import AffectUnprocessedRowTableGroup from '../groups/AffectUnprocessedRowTableGroup'
import AffectStemmedRowTableGroup from '../groups/AffectStemmedRowTableGroup'
import AffectLemmatizedRowTableGroup from '../groups/AffectLemmatizedRowTableGroup'
import AffectCorpusLengthRowTableGroup from '../groups/AffectCorpusLengthRowTableGroup'
import AffectNormalizedScoreRowTableGroup from '../groups/AffectNormalizedScoreRowTableGroup'

import { Table, Alert } from 'react-bootstrap';

import NLPComprehensiveTableModule from '../tables/NLPComprehensiveTableModule'

class NLPComprehensiveTable extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { data, isFetching, lastUpdated } = this.props;

    var primaryArea = '',
        secondaryArea = '',
        primaryAlert = '',
        secondaryAlert = '';

    if (this.props.data.length > 0) {
      primaryArea = [];
      secondaryArea = [];
      primaryAlert = 'The top ten emotions from emotion set is below, sorted, based on the Normalized Score';
      secondaryAlert = 'The remaining emotion list is below, sorted, based on the Normalized Score';
      let arrayName = this.props.data[0].name
      let array = this.props.data[0].emotion_set.sort(function(a,b) {
                      return b.normalized_r_score - a.normalized_r_score;
                  });
      switch (arrayName) {
        case 'big_6':
          primaryAlert = 'Paul Ekman\'s "Big Six" emotions are normalized and ranked';
          for (var i = 0; i < 6; i++) {
            primaryArea.push(
              <NLPComprehensiveTableModule key={i + '-affect-table'} array={array} iterator={i}></NLPComprehensiveTableModule>
            )
          }
          break;
        case 'dimensions':
          primaryAlert = 'Dimensional emotions are normalized and ranked';
          for (var i = 0; i < 7; i++) {
            primaryArea.push(
              <NLPComprehensiveTableModule key={i + '-affect-table'} array={array} iterator={i}></NLPComprehensiveTableModule>
            )
          }
          break;
        default:
          /*
          handles 'all_emotions':
          handles 'emotion_ml':
          */
          for (var i = 0; i < 10; i++) {
            primaryArea.push(
              <NLPComprehensiveTableModule key={i + '-affect-table'} array={array} iterator={i}></NLPComprehensiveTableModule>
            )
          }
          for (var i = 10; i < array.length; i++) {
            secondaryArea.push(
              <NLPComprehensiveTableModule key={i + '-affect-table'} array={array} iterator={i}></NLPComprehensiveTableModule>
            )
          }
          break;
      }
      // End switch
    }
    return (
      <div>
        {isFetching && data.length === 0 &&
          <Alert bsStyle="success">After filling out the form above, all the results will be displayed here.</Alert>
        }
        {!isFetching && data.length === 0 &&
          <Alert bsStyle="success">No results.</Alert>
        }
        {data.length > 0 && data[0].name != 'big_6' && data[0].name != 'dimensions' &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <div>
              <div className="affect--emotion_set-title">{primaryAlert}</div>
              <div className="affect--display_main-area-wrapper">
                <div className="affect--display_main-area">
                  {primaryArea}
                </div>
              </div>
              <br></br>
              <div className="affect--emotion_set-title">{secondaryAlert}</div>
              <div className="affect--display_main-area-wrapper">
                <div className="affect--display_main-area">
                  {secondaryArea}
                </div>
              </div>
            </div>
          </div>
        }
        {data.length > 0 && ( data[0].name == 'big_6' || data[0].name == 'dimensions') &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <div>
              <div className="affect--emotion_set-title">{primaryAlert}</div>
              <div className="affect--display_main-area-wrapper">
                <div className="affect--display_main-area">
                  {primaryArea}
                </div>
              </div>
            </div>
          </div>
        }
        <div style={{fontSize: '10px'}}>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
        </div>
      </div>
    );
  }
}

NLPComprehensiveTable.propTypes = {
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
  } = dataByDataset['nlp'] || {
    isFetching: true,
    items: []
  };

  return {
    data,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(NLPComprehensiveTable);
