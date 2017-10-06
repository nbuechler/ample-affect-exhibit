import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

    let small_graph_height = 8*12
    let large_graph_height = 8*50 - 4
    return (
      <div>
        <div className="radiant--graph-wrapper">
          <div style={{width: "100px"}}>
            <BinScatterPlot
                graphId={0}
                title={'Unprocessed Freq. Dist.'}
                distinctColors={false}
                modulus={1}
                fillColors={['none']}
                data={naturalBinData}
                heightPixel={small_graph_height}
                widthPercent={'100'}
                graphSize={'sm'}
                paddingPixel={'10'}
                maxYValue={maxYValue}
                pointRadius={'3'}/>
            <BinScatterPlot
                graphId={1}
                title={'Stemmed Freq. Dist.'}
                distinctColors={false}
                modulus={1}
                fillColors={['none']}
                data={stemmerBinData}
                heightPixel={small_graph_height}
                widthPercent={'100'}
                graphSize={'sm'}
                paddingPixel={'10'}
                maxYValue={maxYValue}
                pointRadius={'3'}/>
            <BinScatterPlot
                graphId={2}
                title={'Lemmatized Freq. Dist.'}
                distinctColors={false}
                modulus={1}
                fillColors={['none']}
                data={lemmaBinData}
                heightPixel={small_graph_height}
                widthPercent={'100'}
                graphSize={'sm'}
                paddingPixel={'10'}
                maxYValue={maxYValue}
                pointRadius={'3'}/>
          </div>
          <div style={{width: "550px"}}>
            <div style={{margin: '6 10 0 10'}}>
              <BinScatterPlot
                  graphId={3}
                  title={'Synonyms Frequency Distribution'}
                  titleSize={'20'}
                  distinctColors={false}
                  modulus={1}
                  fillColors={['none']}
                  data={allBinData}
                  heightPixel={large_graph_height}
                  widthPercent={'100'}
                  graphSize={'md'}
                  paddingPixel={'50'}
                  maxYValue={maxYValue}
                  pointRadius={'12'}/>
            </div>
          </div>
        </div>
        {/*
        <div className="radiant--graph-wrapper">
          <div className="radiant--key-cell">
            <div className="radiant--key-cell_color-swatch here radiant--key-cell_color-swatch_prep"></div>
            Preposition
          </div>
          <div className="radiant--key-cell">
            <div className="radiant--key-cell_color-swatch radiant--key-cell_color-swatch_noun"></div>
            Noun
          </div>
          <div className="radiant--key-cell">
            <div className="radiant--key-cell_color-swatch radiant--key-cell_color-swatch_adj"></div>
            Adjective
          </div>
          <div className="radiant--key-cell">
            <div className="radiant--key-cell_color-swatch radiant--key-cell_color-swatch_verb"></div>
            Verb
          </div>
          <div className="radiant--key-cell">
            <div className="radiant--key-cell_color-swatch radiant--key-cell_color-swatch_other"></div>
            Other
          </div>
        </div>
        */}
        <div className="radiant--key-text radiant--graph-wrapper">
          Each of the columns represents a particular set of synonyms. The first column
          represents the synonyms of the {this.props.emotionName}. The second column
          represents the synonyms of the first columns synonyms. The pattern continues.
          'I-II Words' are words that exist in both the 'I Words' and 'II Words' groups.
          Similarly, 'II-III Words','II-III Words', and 'I-II--III Words' are groups
          where a word exists in n-number of groups.
          <br></br>
          <br></br>
          The graph depicts a frequency distribution of the words associated with {this.props.emotionName}.
          Multiple words with the same frequency are represented as a more opaque cell.
          By contrast, a single word with a frequency is represented by a transparent cell.
          Color represents the part of speech.
          Cells representing words with more than one part of speech are the average color value.
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
