import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DivListGroup from '../groups/DivListGroup'

import { Table, Alert } from 'react-bootstrap';

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
                      return a.normalized_r_score - b.normalized_r_score;
                  });
      switch (arrayName) {
        case 'big_6':
          primaryAlert = 'Lagger Summary of Paul Ekman\'s "Big Six"';
          for (var i = 0; i < 6; i++) {
            primaryArea.push(
              <tr key={i + '-affect-row'}>
                <td style={{background: '#232323'}} key={i + '-r-rank'}>
                    {array.length - i}
                </td>
                <td style={{background: '#131313'}} key={i + '-r-affect'}>
                    {array[i].emotion}
                </td>
                <td style={{}} key={i + '-normal-scores'}>
                    {array[i].normalized_r_score.toFixed(4)}
                </td>
              </tr>
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
              <tr key={i + '-affect-row'}>
                <td style={{background: '#232323'}} key={i + '-r-rank'}>
                    {array.length - i}
                </td>
                <td style={{background: '#131313'}} key={i + '-r-affect'}>
                    {array[i].emotion}
                </td>
                <td style={{}} key={i + '-normal-scores'}>
                    {array[i].normalized_r_score.toFixed(4)}
                </td>
              </tr>
            )
          }
          break;
      }
      // End switch
    }
    return (
      <div>
        {isFetching && data.length === 0 &&
          <Alert>The weakest emotional signals are shown here.</Alert>
        }
        {!isFetching && data.length === 0 &&
          <Alert>No results.</Alert>
        }
        {data.length > 0 && data[0].name != 'big_6' &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <div style={{ textAlign: 'center' }}>
              <Alert>{primaryAlert}</Alert>
              <Table style={{fontSize: '12px', margin: 'auto', textAlign: 'center'}} hover striped bordered condensed>
                <thead>
                  <tr style={{background: '#101010'}}>
                    <th>Rank</th>
                    <th>Emotion</th>
                    <th>Normalized Score</th>
                  </tr>
                </thead>
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
              <Alert>{primaryAlert}</Alert>
              <Table style={{fontSize: '12px', margin: 'auto', textAlign: 'center'}} hover striped bordered condensed>
                <thead>
                  <tr style={{background: '#101010'}}>
                    <th>Rank</th>
                    <th>Emotion</th>
                    <th>Normalized Score</th>
                  </tr>
                </thead>
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