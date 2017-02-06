import React from 'react';

import DivListGroup from '../groups/DivListGroup'
import DivList from '../lists/DivList'
import StatisticGroup from '../groups/StatisticGroup'
import AffectCorpusLengthRowTableGroup from '../groups/AffectCorpusLengthRowTableGroup'
import AffectNormalizedScoreRowTableGroup from '../groups/AffectNormalizedScoreRowTableGroup'

import { Table, Alert, Button } from 'react-bootstrap';

export default class NLPDetailFreqDistTableModule extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {

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
    function handlePOS(datapoint) {
      switch (datapoint['pos']) {
        case 'IN': //Preposition
          return 0
          break;
        case 'CC': //Preposition
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
          return 2
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
        case 'DT': //Determiner word
          return 4
          break;
        default:
          return 'infinity'
          break;
      }
    }

    let rawData = allBinData,
        processedData = [],
        posData = [0, 0, 0, 0, 0],
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
        let dataArrayPosition = handlePOS(datapoint);
        switch (dataArrayPosition) {
          case 0:
              posData[dataArrayPosition] += 1
            break;
          case 1:
              posData[dataArrayPosition] += 1
            break;
          case 2:
              posData[dataArrayPosition] += 1
            break;
          case 3:
              posData[dataArrayPosition] += 1
            break;
          case 4:
              posData[dataArrayPosition] += 1
            break;
          default:
            console.log('error: ' + dataArrayPosition);
            console.log(datapoint);
            break;

        }
      }
      counter++
    }

    let data = processedData;

    let totalWords = posData.reduce((a, b) => a + b, 0);

    return (
      <div>
        <Table condensed key={'table'} style={{
            fontSize: '12px',
            textAlign: 'left',
            width: '100%',
            tableLayout: 'fixed',
            padding: '10px',
          }}>
          <thead>
            <tr>
              <th>
                <div className="radiant--key-cell_heading">
                  <div className="radiant--key-cell_color-swatch here radiant--key-cell_color-swatch_prep"></div>
                  Preposition ({posData[0]})
                </div>
              </th>
              <th>
                <div className="radiant--key-cell_heading">
                  <div className="radiant--key-cell_color-swatch radiant--key-cell_color-swatch_noun"></div>
                  Noun ({posData[1]})
                </div>
              </th>
              <th>
                <div className="radiant--key-cell_heading">
                  <div className="radiant--key-cell_color-swatch radiant--key-cell_color-swatch_adj"></div>
                  Adjective ({posData[2]})
                </div>
              </th>
              <th>
                <div className="radiant--key-cell_heading">
                  <div className="radiant--key-cell_color-swatch radiant--key-cell_color-swatch_verb"></div>
                  Verb ({posData[3]})
                </div>
              </th>
              <th>
                <div className="radiant--key-cell_heading">
                  <div className="radiant--key-cell_color-swatch radiant--key-cell_color-swatch_other"></div>
                  Other ({posData[4]})
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
    );

  }
}
