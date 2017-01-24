import React, { Component, PropTypes } from 'react';
import d3 from 'd3';

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

    function prepareBinPlotComplete(a, b, c) {
      let result = [],
          numOrders = a.length;
      // The assumption is that each graph has the same number of orders.
      for (var i = 0; i < numOrders; i++) {
        result.push(a[i].concat(b[i]).concat(c[i]))
      }
      return result;
    }

    const naturalBinData = prepareBinPlot('natural');
    const stemmerBinData = prepareBinPlot('stemmer');
    const lemmaBinData = prepareBinPlot('lemma');
    const allBinData = prepareBinPlotComplete(naturalBinData, stemmerBinData, lemmaBinData);


    let rawData = allBinData,
        processedData = [],
        datapoint = {},
        counter = 0;
    for (let i of rawData) {
      for (let j of i) {
        datapoint = {
          "word": j[0][0],
          "pos": j[0][1],
          "count": j[1],
          "bin": counter,
        }
        processedData.push(datapoint)
      }
      counter++
    }

    let data = processedData;

    // d3.max(<data>) should have the data with the greatest point
    let maxYValue = d3.max(data, function(d) {
                      return +d.count;
                    })

    return (
      <div>
        <div style={{
            width: "530px",
            // border: "1px solid #DDD",
            margin: 'auto',
            display: 'flex',
            justifyContent: 'space-around',
            padding: '10px'
          }}>
          <div style={{width: "100px"}}>
            <BinScatterPlot
                graphId={0}
                title={'Unprocessed Word Count'}
                distinctColors={false}
                modulus={1}
                fillColors={['none']}
                data={naturalBinData}
                heightPixel={'100'}
                widthPercent={'100'}
                graphSize={'sm'}
                paddingPixel={'10'}
                maxYValue={maxYValue}
                pointRadius={'3'}/>
            <BinScatterPlot
                graphId={1}
                title={'Stemmed Word Count'}
                distinctColors={false}
                modulus={1}
                fillColors={['none']}
                data={stemmerBinData}
                heightPixel={'100'}
                widthPercent={'100'}
                graphSize={'sm'}
                paddingPixel={'10'}
                maxYValue={maxYValue}
                pointRadius={'3'}/>
            <BinScatterPlot
                graphId={2}
                title={'Lemmatized Word Count'}
                distinctColors={false}
                modulus={1}
                fillColors={['none']}
                data={lemmaBinData}
                heightPixel={'100'}
                widthPercent={'100'}
                graphSize={'sm'}
                paddingPixel={'10'}
                maxYValue={maxYValue}
                pointRadius={'3'}/>
          </div>
          <div style={{width: "400px"}}>
            <div style={{marginTop: '6px'}}>
              <BinScatterPlot
                  graphId={3}
                  title={this.props.emotionName + ' Word Count'}
                  titleSize={'20'}
                  distinctColors={false}
                  modulus={1}
                  fillColors={['none']}
                  data={allBinData}
                  heightPixel={'408'}
                  widthPercent={'100'}
                  graphSize={'md'}
                  paddingPixel={'30'}
                  maxYValue={maxYValue}
                  pointRadius={'12'}/>
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
