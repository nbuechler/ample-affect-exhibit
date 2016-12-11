import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DivListGroup from '../groups/DivListGroup'
import StatisticGroup from '../groups/StatisticGroup'

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
              </tr>
            )
          }
          break;
          case 'dimensions':
            primaryAlert = 'Dimensional emotions are normalized and ranked';
            for (var i = 0; i < 7; i++) {
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
              <Table style={{fontSize: '12px', margin: 'auto', textAlign: 'center'}} hover striped bordered condensed>
                <thead>
                  <tr style={{background: '#101010'}}>
                    <th>Emotion</th>
                    <th>Normalized Score</th>
                    <th>Other Statistics</th>
                    <th>Primary Words</th>
                    <th>Secondary Words</th>
                    <th>Tertiary Words</th>
                  </tr>
                </thead>
                <tbody>
                {primaryArea}
                </tbody>
              </Table>
              <hr></hr>
              <Alert>{secondaryAlert}</Alert>
              <hr></hr>
              <Table style={{fontSize: '12px', margin: 'auto', textAlign: 'center'}} hover striped bordered condensed>
                <thead>
                  <tr style={{background: '#101010'}}>
                    <th>Emotion</th>
                    <th>Normalized Score</th>
                    <th>Other Statistics</th>
                    <th>Primary Words</th>
                    <th>Secondary Words</th>
                    <th>Tertiary Words</th>
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
              <Table style={{fontSize: '12px', margin: 'auto', textAlign: 'center'}} hover striped bordered condensed>
                <thead>
                  <tr style={{background: '#101010'}}>
                    <th>Emotion</th>
                    <th>Normalized Score</th>
                    <th>Other Statistics</th>
                    <th>Primary Words</th>
                    <th>Secondary Words</th>
                    <th>Tertiary Words</th>
                  </tr>
                </thead>
                <tbody>
                {primaryArea}
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
