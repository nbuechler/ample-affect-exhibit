import React, { Component, PropTypes } from 'react';
import d3 from 'd3';

import { connect } from 'react-redux';

import DivListGroup from '../groups/DivListGroup'

import { Table, Alert } from 'react-bootstrap';

import { selectActivityDataset, fetchDataIfNeeded } from '../../actions/actions';

import PieChart from '../d3charts/PieChart'

class WordFrequencyPieChart extends Component {
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

    // Handle the Part-of-speech
    function handlePOS(pos) {
      switch (pos) {
        case 'IN': //Preposition
          return 0
          break;
        case 'RP': //Particle
          return 0
          break;
        case 'PRP': //Nouns
          return 1
          break;
        case 'PRP$': //Nouns
          return 1
          break;
        case 'NN': //Nouns
          return 1
          break;
        case 'NNP': //Nouns
          return 1
          break;
        case 'NNS': //Nouns
          return 1
          break;
        case 'JJ': //Adjectives
          return 1
          break;
        case 'JJR': //Adjectives
          return 2
          break;
        case 'JJS': //Adjectives
          return 2
          break;
        case 'RB': //Adjectives
          return 2
          break;
        case 'RBR': //Adjectives
          return 2
          break;
        case 'RBS': //Adjectives
          return 2
          break;
        case 'MD': //Verbs
          return 3
          break;
        case 'VB': //Verbs
          return 3
          break;
        case 'VBD': //Verbs
          return 3
          break;
        case 'VBG': //Verbs
          return 3
          break;
        case 'VBN': //Verbs
          return 3
          break;
        case 'VBP': //Verbs
          return 3
          break;
        case 'VBZ': //Verbs
          return 3
          break;
        case 'CD': //Number
          return 4
          break;
        case 'FW': //Foreign word
          return 4
          break;
        default:
          break;
      }
    }

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

    let small_graph_height = 8*5
    return (
      <div>
        <div className="infographic--graph-wrapper">
          <div style={{width: "300px"}}>
            <div style={{margin: '0'}}>
              <PieChart
                  graphId={3}
                  title={this.props.emotionName + ' - Frequency Distribution'}
                  titleSize={'20'}
                  distinctColors={false}
                  modulus={1}
                  fillColors={['none']}
                  data={allBinData}
                  heightPixel={'228'}
                  widthPixel={'300'}
                  graphSize={'md'}
                  paddingPixel={'50'}
                  maxYValue={maxYValue}
                  pointRadius={'12'}/>
            </div>
          </div>
        </div>
        <div className="infographic--graph-wrapper">
          <div className="infographic--key-cell">
            <div className="infographic--key-cell_color-swatch here infographic--key-cell_color-swatch_prep"></div>
            Preposition
          </div>
          <div className="infographic--key-cell">
            <div className="infographic--key-cell_color-swatch infographic--key-cell_color-swatch_noun"></div>
            Noun
          </div>
          <div className="infographic--key-cell">
            <div className="infographic--key-cell_color-swatch infographic--key-cell_color-swatch_adj"></div>
            Adjective
          </div>
          <div className="infographic--key-cell">
            <div className="infographic--key-cell_color-swatch infographic--key-cell_color-swatch_verb"></div>
            Verb
          </div>
          <div className="infographic--key-cell">
            <div className="infographic--key-cell_color-swatch infographic--key-cell_color-swatch_other"></div>
            Other
          </div>
        </div>
        <div className="infographic--key-text infographic--graph-wrapper">
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

// export default connect(mapStateToProps)(WordFrequencyPieChart);
export default WordFrequencyPieChart;
