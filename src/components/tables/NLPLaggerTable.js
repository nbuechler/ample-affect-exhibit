import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DivListGroup from '../groups/DivListGroup'

import { Table, Alert } from 'react-bootstrap';

import AffectSummaryLaggerRowTableGroup from '../groups/AffectSummaryLaggerRowTableGroup'

class NLPLaggerTable extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { data, isFetching, lastUpdated } = this.props;

    var primaryArea = '',
        secondaryArea = '',
        primaryAlert = '';

    if (this.props.data.length > 0) {
      primaryArea = [];
      secondaryArea = [];
      primaryAlert = 'Lagger Summary of the Emotion Set\'s Bottom 10';
      let arrayName = this.props.data[0].name
      let array = this.props.data[0].emotion_set.sort(function(a,b) {
                      return a.normalized_r_score - b.normalized_r_score || alphaSortEmotion(a,b);
                  });

      function alphaSortEmotion(a, b) {
        if(a.emotion < b.emotion) return -1;
        if(a.emotion > b.emotion) return 1;
        return 0;
      }

      switch (arrayName) {
        case 'big_6':
          primaryAlert = 'Lagger Summary of Paul Ekman\'s "Big Six"';
          for (var i = 0; i < 6; i++) {
            primaryArea.push(
              <AffectSummaryLaggerRowTableGroup key={i + '-affect-lagger-row'} data={array} iterator={i}></AffectSummaryLaggerRowTableGroup>
            )
          }
          break;
        case 'dimensions':
          primaryAlert = 'Lagger Summary of Dimensions';
          for (var i = 0; i < 6; i++) {
            primaryArea.push(
              <AffectSummaryLaggerRowTableGroup key={i + '-affect-lagger-row'} data={array} iterator={i}></AffectSummaryLaggerRowTableGroup>
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
              <AffectSummaryLaggerRowTableGroup key={i + '-affect-lagger-row'} data={array} iterator={i}></AffectSummaryLaggerRowTableGroup>
            )
          }
          break;
      }
      // End switch
    }
    return (
      <div>
        {isFetching && data.length === 0 &&
          <div style={{textAlign: 'center'}}>The weakest emotional signals are shown here.</div>
        }
        {!isFetching && data.length === 0 &&
          <div style={{textAlign: 'center'}}>No results.</div>
        }
        {data.length > 0 && data[0].name != 'big_6' &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <div style={{ textAlign: 'center' }}>
              <Alert bsStyle="success">{primaryAlert}</Alert>
              <Table style={{fontSize: '12px', margin: 'auto', textAlign: 'center'}} condensed>
                <tbody>
                {primaryArea}
                </tbody>
              </Table>
            </div>
          </div>
        }
        {data.length > 0 && data[0].name == 'big_6' &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <div style={{ textAlign: 'center' }}>
              <Alert bsStyle="success">{primaryAlert}</Alert>
              <Table style={{fontSize: '12px', margin: 'auto', textAlign: 'center'}} condensed>
                <tbody>
                {primaryArea}
                </tbody>
              </Table>
            </div>
          </div>
        }
      </div>
    );
  }
}

NLPLaggerTable.propTypes = {
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

export default connect(mapStateToProps)(NLPLaggerTable);
