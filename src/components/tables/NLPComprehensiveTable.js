import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Table, Alert } from 'react-bootstrap';

import NLPComprehensiveTableModule from '../tables/NLPComprehensiveTableModule'
import NLPCondensedTableModule from '../tables/NLPCondensedTableModule'

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
              <NLPCondensedTableModule key={i + '-affect-table'} array={array} iterator={i}></NLPCondensedTableModule>
            )
          }
          break;
      }
      // End switch
    }
    return (
      <div>
        <p>
          Each word is an affect of the natural language passage you decided to analyze.
          The five words with the greatest emotional signal are displayed for each facet,
          but each facet could be influenced by more than five words. Each emotion is a
          representation of the overall emotion state of the passage.
        </p>
        <p>
          Good inferences about the passage, with a more comprehensive understanding of
          the passage, are possible by thinking about the emotional state as a grouping
          of these emotion representations.
        </p>
        <p>
          Hover your mouse over the form icon in the bottom right corner to begin.
        </p>
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
