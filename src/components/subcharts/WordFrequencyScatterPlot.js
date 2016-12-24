import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DivListGroup from '../groups/DivListGroup'

import { Table, Alert } from 'react-bootstrap';

import { selectActivityDataset, fetchDataIfNeeded } from '../../actions/actions';

import SimpleScatterPlot from '../d3chartsv2/SimpleScatterPlot'
import BinScatterPlot from '../d3chartsv2/BinScatterPlot'
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

    function prepareBinPlot(graph) {
      let result = [],
          key_prefix = '';
      if (graph == '-') {
        key_prefix = '';
      } else {
        key_prefix = graph + '_';
      }
      result.push(JSON.parse(localStorage.getItem('lastEmotion'))['order-1'][key_prefix + 'order_fdist'])
      result.push(JSON.parse(localStorage.getItem('lastEmotion'))['order-2'][key_prefix + 'order_fdist'])
      result.push(JSON.parse(localStorage.getItem('lastEmotion'))['order-3'][key_prefix + 'order_fdist'])
      result.push(JSON.parse(localStorage.getItem('lastEmotion'))['order_1_and_2'][key_prefix + 'order_fdist'])
      result.push(JSON.parse(localStorage.getItem('lastEmotion'))['order_1_and_3'][key_prefix + 'order_fdist'])
      result.push(JSON.parse(localStorage.getItem('lastEmotion'))['order_2_and_3'][key_prefix + 'order_fdist'])
      result.push(JSON.parse(localStorage.getItem('lastEmotion'))['all_orders'][key_prefix + 'order_fdist'])
      return result;
    }

    const naturalBinData = prepareBinPlot('natural')
    const stemmerBinData = prepareBinPlot('stemmer')
    const lemmaBinData = prepareBinPlot('lemma')

    return (
      <div>
        <div style={{
            width: "525px",
            border: "1px solid #DDD",
            margin: 'auto',
            display: 'flex',
            justifyContent: 'space-around',
            padding: '7px'
          }}>
          <div style={{width: "100px"}}>
            <BinScatterPlot
                title={'Unprocessed Scatter'}
                distinctColors={false}
                modulus={1}
                fillColors={['none']}
                data={naturalBinData}
                heightPixel={'100'}
                widthPercent={'100'}
                paddingPixel={'10'} />
            <BinScatterPlot
                title={'Stemmed Scatter'}
                distinctColors={false}
                modulus={1}
                fillColors={['none']}
                data={stemmerBinData}
                heightPixel={'100'}
                widthPercent={'100'}
                paddingPixel={'10'} />
            <BinScatterPlot
                title={'Lemmatized Scatter'}
                distinctColors={false}
                modulus={1}
                fillColors={['none']}
                data={lemmaBinData}
                heightPixel={'100'}
                widthPercent={'100'}
                paddingPixel={'10'} />
          </div>
          <div style={{width: "400px"}}>
            <div style={{marginTop: '17px'}}>
              <BinScatterPlot
                  title={'Simple Scatter'}
                  distinctColors={false}
                  modulus={1}
                  fillColors={['none']}
                  data={naturalBinData}
                  heightPixel={'400'}
                  widthPercent={'100'}
                  paddingPixel={'10'} />
            </div>
          </div>
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
