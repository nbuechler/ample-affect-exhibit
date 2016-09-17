import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Table, Alert } from 'react-bootstrap';

class NLPTable extends Component {
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
      primaryAlert = 'The top ten emotions from emotion list is below, sorted, based on the Normalized Score';
      secondaryAlert = 'The remaining emotion list is below, sorted, based on the Normalized Score';
      let arrayName = this.props.data[0].name
      let array = this.props.data[0].emotion_set.sort(function(a,b) {
                      return b.normalized_r_score - a.normalized_r_score;
                  });
      switch (arrayName) {
        case 'big_6':
          primaryAlert = 'The big six emotions are normalized and ranked';
          secondaryAlert = '';
          for (var i = 0; i < 6; i++) {
            primaryArea.push(
              <tr key={i + '-affect-row'}>
                <td key={i + '-r-affect'}>{array[i].emotion}</td><td key={i + '-normal-score'}>{array[i].normalized_r_score.toFixed(4)} </td><td key={i + '-basic-score'}>{array[i].r_affect_score.toFixed(4)} </td>
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
                <td key={i + '-r-affect'}>{array[i].emotion}</td><td key={i + '-normal-score'}>{array[i].normalized_r_score.toFixed(4)} </td><td key={i + '-basic-score'}>{array[i].r_affect_score.toFixed(4)} </td>
              </tr>
            )
          }
          for (var i = 10; i < array.length; i++) {
            secondaryArea.push(
              <tr key={i + '-affect-row'}>
                <td key={i + '-r-affect'}>{array[i].emotion}</td><td key={i + '-normal-score'}>{array[i].normalized_r_score.toFixed(4)} </td><td key={i + '-basic-score'}>{array[i].r_affect_score.toFixed(4)} </td>
              </tr>
            )
          }
          break;
      }
      // End switch
    }
    return (
      <div>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
        </p>
        {isFetching && data.length === 0 &&
          <Alert>Fill out the form above to see the results.</Alert>
        }
        {!isFetching && data.length === 0 &&
          <Alert>No results.</Alert>
        }
        {data.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <div style={{ textAlign: 'center' }}>
              <Alert>{primaryAlert}</Alert>
              <Table style={{margin: 'auto', textAlign: 'center'}} striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>Emotion</th>
                    <th>Normalized Score</th>
                    <th>Basic Score</th>
                  </tr>
                </thead>
                <tbody>
                {primaryArea}
                </tbody>
              </Table>
              <hr></hr>
              <Alert>{secondaryAlert}</Alert>
              <hr></hr>
              <Table style={{margin: 'auto', textAlign: 'center'}} striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>Emotion</th>
                    <th>Normalized Score</th>
                    <th>Basic Score</th>
                  </tr>
                </thead>
                <tbody>
                {secondaryArea}
                </tbody>
              </Table>
            </div>
          </div>
        }
      </div>
    );
  }
}

NLPTable.propTypes = {
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

export default connect(mapStateToProps)(NLPTable);
