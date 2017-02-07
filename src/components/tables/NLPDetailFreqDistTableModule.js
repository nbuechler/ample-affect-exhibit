import React from 'react';

import POSCountDivList from '../lists/POSCountDivList'

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
          return [0,0]
          break;
        case 'CC': //Preposition
          return [0,1]
          break;
        case 'RP': //Particle
          return [0,2]
          break;
        case 'PRP': //Nouns
          return [1,3]
          break;
        case 'PRP$': //Nouns
          return [1,4]
          break;
        case 'NN': //Nouns
          return [1,5]
          break;
        case 'NNP': //Nouns
          return [1,6]
          break;
        case 'NNS': //Nouns
          return [1,7]
          break;
        case 'JJ': //Adjectives
          return [2,8]
          break;
        case 'JJR': //Adjectives
          return [2,9]
          break;
        case 'JJS': //Adjectives
          return [2,10]
          break;
        case 'RB': //Adjectives
          return [2,11]
          break;
        case 'RBR': //Adjectives
          return [2,12]
          break;
        case 'RBS': //Adjectives
          return [2,13]
          break;
        case 'MD': //Verbs
          return [3,14]
          break;
        case 'VB': //Verbs
          return [3,15]
          break;
        case 'VBD': //Verbs
          return [3,16]
          break;
        case 'VBG': //Verbs
          return [3,17]
          break;
        case 'VBN': //Verbs
          return [3,18]
          break;
        case 'VBP': //Verbs
          return [3,19]
          break;
        case 'VBZ': //Verbs
          return [3,20]
          break;
        case 'CD': //Number
          return [4,21]
          break;
        case 'FW': //Foreign word
          return [4,22]
          break;
        case 'DT': //Determiner word
          return [4,23]
          break;
        default:
          return 'infinity'
          break;
      }
    }

    let rawData = allBinData,
        processedData = [],
        posData = [0, 0, 0, 0, 0],
        posExtendedData = [],
        datapoint = {},
        counter = 0;
    // Create a vector of 0's for posExtendedData
    for (var i = 0; i < 24; i++) {
      posExtendedData[i] = 0
    }
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
        if (dataArrayPosition[0] >= 0) {
          posData[dataArrayPosition[0]] += 1
          posExtendedData[dataArrayPosition[1]] += 1
        } else {
          console.log('error: ' + dataArrayPosition);
          console.log(datapoint);
          break;
        };
      }
      counter++
    }

    let data = processedData;

    let totalWords = posData.reduce((a, b) => a + b, 0);

    return (
      <div>
        <div className="radiant--graph-title">
          Part-of-speech Word Distribution (count)
        </div>
        <div className="radiant--graph-wrapper">
          <Table condensed key={'table'} style={{
              fontSize: '12px',
              textAlign: 'left',
              width: '100%',
              tableLayout: 'fixed',
              padding: '10px',
            }}>
            <thead>
              <tr>
                <th className="radiant--key-cell_heading-wrapper">
                  <div className="radiant--key-cell_heading">
                    <div className="radiant--key-cell_color-swatch here radiant--key-cell_color-swatch_prep"></div>
                    Preposition ({posData[0]})
                  </div>
                </th>
                <th className="radiant--key-cell_heading-wrapper">
                  <div className="radiant--key-cell_heading">
                    <div className="radiant--key-cell_color-swatch radiant--key-cell_color-swatch_noun"></div>
                    Noun ({posData[1]})
                  </div>
                </th>
                <th className="radiant--key-cell_heading-wrapper">
                  <div className="radiant--key-cell_heading">
                    <div className="radiant--key-cell_color-swatch radiant--key-cell_color-swatch_adj"></div>
                    Adjective ({posData[2]})
                  </div>
                </th>
                <th className="radiant--key-cell_heading-wrapper">
                  <div className="radiant--key-cell_heading">
                    <div className="radiant--key-cell_color-swatch radiant--key-cell_color-swatch_verb"></div>
                    Verb ({posData[3]})
                  </div>
                </th>
                <th className="radiant--key-cell_heading-wrapper">
                  <div className="radiant--key-cell_heading">
                    <div className="radiant--key-cell_color-swatch radiant--key-cell_color-swatch_other"></div>
                    Other ({posData[4]})
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <POSCountDivList posExtendedData={posExtendedData}></POSCountDivList>
            </tbody>
          </Table>
        </div>
        <div className=""
             style={{
               textAlign: 'right',
               fontSize: '10px',
             }}>
          Each double or triple group of letters represents a part-of-speech as denoted by
          <a style={{marginLeft: '3px'}} href="http://www.nltk.org/">NLTK</a>
        </div>
      </div>
    );

  }
}
