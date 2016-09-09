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
        secondaryArea = '';

    if (this.props.data.length > 0) {
      primaryArea = [];
      secondaryArea = [];
      let array = this.props.data[0].emotion_set
      let sortedArray = this.props.data[0].emotion_set.sort(function(a,b) {
                            return a.r_affect_score - b.r_affect_score;
                        });
      let top5 = sortedArray.splice(0,5)
      for (var i = 0; i < top5.length; i++) {
        primaryArea.push(
          <tr>
            <td key={i + '-r-affect'}>{array[i].emotion}</td><td key={i + '-score'}>{array[i].r_affect_score} </td>
          </tr>
        )
      }
      for (var i = 0; i < array.length; i++) {
        secondaryArea.push(
          <tr>
            <td key={i + '-r-affect'}>{array[i].emotion}</td><td key={i + '-score'}>{array[i].r_affect_score} </td>
          </tr>
        )
      }
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
              <Alert>The top five emotions from emotion list is below, sorted, based on score</Alert>
              <Table style={{margin: 'auto', textAlign: 'center'}} striped bordered condensed hover>
                <tbody>
                {primaryArea}
                </tbody>
              </Table>
              <hr></hr>
              <Alert>The full emotion list is below, sorted, from A-Z</Alert>
              <Table style={{margin: 'auto', textAlign: 'center'}} striped bordered condensed hover>
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
