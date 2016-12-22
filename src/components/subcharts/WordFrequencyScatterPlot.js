import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DivListGroup from '../groups/DivListGroup'

import { Table, Alert } from 'react-bootstrap';

import { selectActivityDataset, fetchDataIfNeeded } from '../../actions/actions';

import ScatterPlot from '../d3chartsv2/ScatterPlot'
import BarChart from '../d3charts/BarChart'

class WordFrequencyScatterPlot extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch(fetchDataIfNeeded('nlp-stats', '5000'));
  }


  render () {
    // const { data, isFetching, lastUpdated } = this.props;

    const data =
    [329,175,144,125,112,103,94,87,81,76,72,67,63,59,56,52,50,47,45,43,41,39,
      38,36,34,33,32,30,29,28,27,25,24,24,23,22,21,20,19,19,18,17,17,16,15,15
      ,14,14,14,13,13,12,12,11,11,11,10,10,10,9,9,9,8,8,8,8,7,7,7,7,6,6,6,5,5
      ,5,5,5,5,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1
      ,1,1,1,1,1,1,1,1,1,1,1,1,1]

    return (
      <div>
        <div style={{width: "500px", border: "1px solid #DDD", margin: 'auto'}}>
          <ScatterPlot
              title={'Word Affect Frequency Distribution'}
              distinctColors={false}
              modulus={1}
              fillColors={['none']}
              data={data}
              heightPixel={'100'}
              widthPercent={'100'}
              paddingPixel={'10'} />
          <ScatterPlot
              title={'Word Affect Frequency Distribution'}
              distinctColors={false}
              modulus={1}
              fillColors={['none']}
              data={data}
              heightPixel={'100'}
              widthPercent={'100'}
              paddingPixel={'10'} />
          <ScatterPlot
              title={'Word Affect Frequency Distribution'}
              distinctColors={false}
              modulus={1}
              fillColors={['none']}
              data={data}
              heightPixel={'100'}
              widthPercent={'100'}
              paddingPixel={'10'} />
        </div>
        <div style={{width: "500px", border: "1px solid #DDD", margin: 'auto'}}>
          <BarChart
              title={'Word Affect Frequency Distribution'}
              distinctColors={false}
              modulus={1}
              fillColors={['none']}
              data={data}
              height={'100'}
              width={'450'} />
        </div>

      </div>
    );
  }
}

// StatsChart.propTypes = {
//   data: PropTypes.array.isRequired,
//   isFetching: PropTypes.bool.isRequired,
//   lastUpdated: PropTypes.number,
//   dispatch: PropTypes.func.isRequired
// };
//
// function mapStateToProps(state) {
//   const { dataByDataset } = state;
//   const {
//     isFetching,
//     lastUpdated,
//     items: data
//   } = dataByDataset['nlp-stats'] || {
//     isFetching: true,
//     items: []
//   };
//
//   return {
//     data,
//     isFetching,
//     lastUpdated
//   };
// }

// export default connect(mapStateToProps)(WordFrequencyScatterPlot);
export default WordFrequencyScatterPlot;
