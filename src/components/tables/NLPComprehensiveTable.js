import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DivListGroup from '../groups/DivListGroup'
import DivList from '../lists/DivList'
import StatisticGroup from '../groups/StatisticGroup'

import { Table, Alert } from 'react-bootstrap';

class NLPComprehensiveTable extends Component {
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
      primaryAlert = 'The top ten emotions from emotion set is below, sorted, based on the Normalized Score';
      secondaryAlert = 'The remaining emotion list is below, sorted, based on the Normalized Score';
      let arrayName = this.props.data[0].name
      let array = this.props.data[0].emotion_set.sort(function(a,b) {
                      return b.normalized_r_score - a.normalized_r_score;
                  });
      switch (arrayName) {
        case 'big_6':
          primaryAlert = 'Paul Ekman\'s "Big Six" emotions are normalized and ranked';
          for (var i = 0; i < 6; i++) {
            primaryArea.push(
              <tr key={i + '-affect-row'}>
                <td style={{background: '#131313'}} key={i + '-r-affect'}>
                    {array[i].emotion}
                </td>
                <td style={{}} key={i + '-normal-scores'}>
                    {array[i].normalized_r_score.toFixed(4)}
                </td>
                <td style={{padding: '10px'}} key={i + '-other-stats'}>
                    <div>
                      <span className='pull-left'>Basic Score</span>
                      <span className='pull-right'>{array[i].r_affect_score.toFixed(4)}</span>
                    </div>
                    <hr></hr>
                    <StatisticGroup data={array[i]['order-1']} title={'Primary'}/>
                    <hr></hr>
                    <StatisticGroup data={array[i]['order-2']} title={'Secondary'}/>
                    <hr></hr>
                    <StatisticGroup data={array[i]['order-3']} title={'Tertiary'}/>
                    <hr></hr>
                    <StatisticGroup data={array[i]['order_1_and_2']} title={'1-2'}/>
                    <hr></hr>
                    <StatisticGroup data={array[i]['order_1_and_3']} title={'1-3'}/>
                    <hr></hr>
                    <StatisticGroup data={array[i]['order_2_and_3']} title={'2-3'}/>
                    <hr></hr>
                    <StatisticGroup data={array[i]['all_orders']} title={'All'}/>
                </td>
                <td style={{padding: '10px'}} key={i + '-1st-words'}>
                  <DivListGroup data={array[i]['order-1']}/>
                </td>
                <td style={{padding: '10px'}} key={i + '-2nd-words'}>
                  <DivListGroup data={array[i]['order-2']}/>
                </td>
                <td style={{padding: '10px'}} key={i + '-3rd-words'}>
                  <DivListGroup data={array[i]['order-3']}/>
                </td>
                <td style={{padding: '10px'}} key={i + '-1/2-words'}>
                  <DivListGroup data={array[i]['order_1_and_2']}/>
                </td>
                <td style={{padding: '10px'}} key={i + '-1/3-words'}>
                  <DivListGroup data={array[i]['order_1_and_3']}/>
                </td>
                <td style={{padding: '10px'}} key={i + '-2/3-words'}>
                  <DivListGroup data={array[i]['order_2_and_3']}/>
                </td>
                <td style={{padding: '10px'}} key={i + '-all-words'}>
                  <DivListGroup data={array[i]['all_orders']}/>
                </td>
              </tr>
            )
          }
          break;
          case 'dimensions':
            primaryAlert = 'Dimensional emotions are normalized and ranked';
            for (var i = 0; i < 7; i++) {
              primaryArea.push(
                <div key={array[i].emotion + '-group'}>
                  <div>
                    <p key={i + '-r-affect'}>
                      {array[i].emotion}
                    </p>
                    <p key={i + '-normal-scores'}>
                      {array[i].normalized_r_score.toFixed(4)}
                    </p>
                    <div>
                      <span className='pull-left'>Basic Score</span>
                      <span className='pull-right'>{array[i].r_affect_score.toFixed(4)}</span>
                    </div>
                  </div>
                  <Table key={i + '-table'} style={{fontSize: '12px', margin: 'auto', textAlign: 'center'}}>
                    <thead>
                      <tr style={{background: '#101010'}}>
                        <th></th>
                        <th>I Words</th>
                        <th>II Words</th>
                        <th>III Words</th>
                        <th>I-II Words</th>
                        <th>I-III Words</th>
                        <th>II-III Words</th>
                        <th>I-II-III Words</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          Unprocessed
                        </td>
                        <td>
                          <DivList fdist={array[i]['order-1'].natural_order_fdist}/>
                        </td>
                        <td>
                          <DivList fdist={array[i]['order-2'].natural_order_fdist}/>
                        </td>
                        <td>
                          <DivList fdist={array[i]['order-3'].natural_order_fdist}/>
                        </td>
                        <td>
                          <DivList fdist={array[i]['order_1_and_2'].natural_order_fdist}/>
                        </td>
                        <td>
                          <DivList fdist={array[i]['order_1_and_3'].natural_order_fdist}/>
                        </td>
                        <td>
                          <DivList fdist={array[i]['order_2_and_3'].natural_order_fdist}/>
                        </td>
                        <td>
                          <DivList fdist={array[i]['all_orders'].natural_order_fdist}/>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Stemmed
                        </td>
                        <td>
                          <DivList fdist={array[i]['order-1'].stemmer_order_fdist}/>
                        </td>
                        <td>
                          <DivList fdist={array[i]['order-2'].stemmer_order_fdist}/>
                        </td>
                        <td>
                          <DivList fdist={array[i]['order-3'].stemmer_order_fdist}/>
                        </td>
                        <td>
                          <DivList fdist={array[i]['order_1_and_2'].stemmer_order_fdist}/>
                        </td>
                        <td>
                          <DivList fdist={array[i]['order_1_and_3'].stemmer_order_fdist}/>
                        </td>
                        <td>
                          <DivList fdist={array[i]['order_2_and_3'].stemmer_order_fdist}/>
                        </td>
                        <td>
                          <DivList fdist={array[i]['all_orders'].stemmer_order_fdist}/>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Lemmatized
                        </td>
                        <td>
                          <DivList fdist={array[i]['order-1'].lemma_order_fdist}/>
                        </td>
                        <td>
                          <DivList fdist={array[i]['order-2'].lemma_order_fdist}/>
                        </td>
                        <td>
                          <DivList fdist={array[i]['order-3'].lemma_order_fdist}/>
                        </td>
                        <td>
                          <DivList fdist={array[i]['order_1_and_2'].lemma_order_fdist}/>
                        </td>
                        <td>
                          <DivList fdist={array[i]['order_1_and_3'].lemma_order_fdist}/>
                        </td>
                        <td>
                          <DivList fdist={array[i]['order_2_and_3'].lemma_order_fdist}/>
                        </td>
                        <td>
                          <DivList fdist={array[i]['all_orders'].lemma_order_fdist}/>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Stats
                        </td>
                        <td>
                          <StatisticGroup data={array[i]['order-1']} title={'Primary'}/>
                        </td>
                        <td>
                          <StatisticGroup data={array[i]['order-2']} title={'Secondary'}/>
                        </td>
                        <td>
                          <StatisticGroup data={array[i]['order-3']} title={'Tertiary'}/>
                        </td>
                        <td>
                          <StatisticGroup data={array[i]['order_1_and_2']} title={'1-2'}/>
                        </td>
                        <td>
                          <StatisticGroup data={array[i]['order_1_and_3']} title={'1-3'}/>
                        </td>
                        <td>
                          <StatisticGroup data={array[i]['order_2_and_3']} title={'2-3'}/>
                        </td>
                        <td>
                          <StatisticGroup data={array[i]['all_orders']} title={'All'}/>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
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
                  <td style={{background: '#131313'}} key={i + '-r-affect'}>
                      {array[i].emotion}
                  </td>
                  <td style={{}} key={i + '-normal-scores'}>
                      {array[i].normalized_r_score.toFixed(4)}
                  </td>
                  <td style={{padding: '10px'}} key={i + '-other-stats'}>
                      <div>
                        <span className='pull-left'>Basic Score</span>
                        <span className='pull-right'>{array[i].r_affect_score.toFixed(4)}</span>
                      </div>
                      <hr></hr>
                      <StatisticGroup data={array[i]['order-1']} title={'Primary'}/>
                      <hr></hr>
                      <StatisticGroup data={array[i]['order-2']} title={'Secondary'}/>
                      <hr></hr>
                      <StatisticGroup data={array[i]['order-3']} title={'Tertiary'}/>
                      <hr></hr>
                      <StatisticGroup data={array[i]['order_1_and_2']} title={'1-2'}/>
                      <hr></hr>
                      <StatisticGroup data={array[i]['order_1_and_3']} title={'1-3'}/>
                      <hr></hr>
                      <StatisticGroup data={array[i]['order_2_and_3']} title={'2-3'}/>
                      <hr></hr>
                      <StatisticGroup data={array[i]['all_orders']} title={'All'}/>
                  </td>
                  <td style={{padding: '10px'}} key={i + '-1st-words'}>
                    <DivListGroup data={array[i]['order-1']}/>
                  </td>
                  <td style={{padding: '10px'}} key={i + '-2nd-words'}>
                    <DivListGroup data={array[i]['order-2']}/>
                  </td>
                  <td style={{padding: '10px'}} key={i + '-3rd-words'}>
                    <DivListGroup data={array[i]['order-3']}/>
                  </td>
                  <td style={{padding: '10px'}} key={i + '-1/2-words'}>
                    <DivListGroup data={array[i]['order_1_and_2']}/>
                  </td>
                  <td style={{padding: '10px'}} key={i + '-1/3-words'}>
                    <DivListGroup data={array[i]['order_1_and_3']}/>
                  </td>
                  <td style={{padding: '10px'}} key={i + '-2/3-words'}>
                    <DivListGroup data={array[i]['order_2_and_3']}/>
                  </td>
                  <td style={{padding: '10px'}} key={i + '-all-words'}>
                    <DivListGroup data={array[i]['all_orders']}/>
                  </td>
                </tr>
              )
            }
            for (var i = 10; i < array.length; i++) {
              secondaryArea.push(
                <tr key={i + '-affect-row'}>
                  <td style={{background: '#131313'}} key={i + '-r-affect'}>
                      {array[i].emotion}
                  </td>
                  <td style={{}} key={i + '-normal-scores'}>
                      {array[i].normalized_r_score.toFixed(4)}
                  </td>
                  <td style={{padding: '10px'}} key={i + '-other-stats'}>
                      <div>
                        <span className='pull-left'>Basic Score</span>
                        <span className='pull-right'>{array[i].r_affect_score.toFixed(4)}</span>
                      </div>
                      <hr></hr>
                      <StatisticGroup data={array[i]['order-1']} title={'Primary'}/>
                      <hr></hr>
                      <StatisticGroup data={array[i]['order-2']} title={'Secondary'}/>
                      <hr></hr>
                      <StatisticGroup data={array[i]['order-3']} title={'Tertiary'}/>
                      <hr></hr>
                      <StatisticGroup data={array[i]['order_1_and_2']} title={'1-2'}/>
                      <hr></hr>
                      <StatisticGroup data={array[i]['order_1_and_3']} title={'1-3'}/>
                      <hr></hr>
                      <StatisticGroup data={array[i]['order_2_and_3']} title={'2-3'}/>
                      <hr></hr>
                      <StatisticGroup data={array[i]['all_orders']} title={'All'}/>
                  </td>
                  <td style={{padding: '10px'}} key={i + '-1st-words'}>
                    <DivListGroup data={array[i]['order-1']}/>
                  </td>
                  <td style={{padding: '10px'}} key={i + '-2nd-words'}>
                    <DivListGroup data={array[i]['order-2']}/>
                  </td>
                  <td style={{padding: '10px'}} key={i + '-3rd-words'}>
                    <DivListGroup data={array[i]['order-3']}/>
                  </td>
                  <td style={{padding: '10px'}} key={i + '-1/2-words'}>
                    <DivListGroup data={array[i]['order_1_and_2']}/>
                  </td>
                  <td style={{padding: '10px'}} key={i + '-1/3-words'}>
                    <DivListGroup data={array[i]['order_1_and_3']}/>
                  </td>
                  <td style={{padding: '10px'}} key={i + '-2/3-words'}>
                    <DivListGroup data={array[i]['order_2_and_3']}/>
                  </td>
                  <td style={{padding: '10px'}} key={i + '-all-words'}>
                    <DivListGroup data={array[i]['all_orders']}/>
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
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
        </p>
        {isFetching && data.length === 0 &&
          <Alert>After filling out the form above, all the results will be displayed here.</Alert>
        }
        {!isFetching && data.length === 0 &&
          <Alert>No results.</Alert>
        }
        {data.length > 0 && data[0].name != 'big_6' && data[0].name != 'dimensions' &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <div style={{ textAlign: 'center' }}>
              <Alert>{primaryAlert}</Alert>
              <Table style={{fontSize: '12px', margin: 'auto', textAlign: 'center'}}>
                <thead>
                  <tr style={{background: '#101010'}}>
                    <th>Emotion</th>
                    <th>Normalized Score</th>
                    <th>Other Statistics</th>
                    <th>Primary Words</th>
                    <th>Secondary Words</th>
                    <th>Tertiary Words</th>
                    <th>1-2 Words</th>
                    <th>1-3 Words</th>
                    <th>2-3 Words</th>
                    <th>All Words</th>
                  </tr>
                </thead>
                <tbody>
                {primaryArea}
                </tbody>
              </Table>
              <hr></hr>
              <Alert>{secondaryAlert}</Alert>
              <hr></hr>
              <Table style={{fontSize: '12px', margin: 'auto', textAlign: 'center'}}>
                <thead>
                  <tr style={{background: '#101010'}}>
                    <th>Emotion</th>
                    <th>Normalized Score</th>
                    <th>Other Statistics</th>
                    <th>Primary Words</th>
                    <th>Secondary Words</th>
                    <th>Tertiary Words</th>
                    <th>1-2 Words</th>
                    <th>1-3 Words</th>
                    <th>2-3 Words</th>
                    <th>All Words</th>
                  </tr>
                </thead>
                <tbody>
                {secondaryArea}
                </tbody>
              </Table>
            </div>
          </div>
        }
        {data.length > 0 && ( data[0].name == 'big_6' || data[0].name == 'dimensions') &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <div style={{ textAlign: 'center' }}>
              <Alert>{primaryAlert}</Alert>
              {primaryArea}
            </div>
          </div>
        }
      </div>
    );
  }
}

NLPComprehensiveTable.propTypes = {
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

export default connect(mapStateToProps)(NLPComprehensiveTable);
