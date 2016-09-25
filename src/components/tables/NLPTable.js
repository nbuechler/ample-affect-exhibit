import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DivListGroup from '../groups/DivListGroup'

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
      primaryAlert = 'The top ten emotions from emotion list is below, sorted, based on the Normalized Score';
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
                    <div>
                      <span className='pull-left'><strong>Primary</strong></span>
                    </div>
                    <br></br>
                    <div>
                      <span className='pull-left'>Primary Corpus Length</span>
                      <span className='pull-right'>{array[i].order_1_length}</span>
                      <br></br>
                      <span className='pull-left'>Primary Normalized Score</span>
                      <span className='pull-right'>{array[i].normalized_order_1.toFixed(4)}</span>
                    </div>
                    <br></br>
                    <hr></hr>
                    <div>
                      <span className='pull-left'><strong>Secondary</strong></span>
                    </div>
                    <br></br>
                    <div>
                      <span className='pull-left'>Secondary Corpus Length</span>
                      <span className='pull-right'>{array[i].order_2_length}</span>
                      <br></br>
                      <span className='pull-left'>Secondary Normalized Score</span>
                      <span className='pull-right'>{array[i].normalized_order_2.toFixed(4)}</span>
                    </div>
                    <br></br>
                    <hr></hr>
                    <div>
                      <span className='pull-left'><strong>Tertiary</strong></span>
                    </div>
                    <br></br>
                    <div>
                      <span className='pull-left'>Tertiary Corpus Length</span>
                      <span className='pull-right'>{array[i].order_3_length}</span>
                      <br></br>
                      <span className='pull-left'>Tertiary Normalized Score</span>
                      <span className='pull-right'>{array[i].normalized_order_3.toFixed(4)}</span>
                    </div>
                    <br></br>
                </td>

                <td style={{padding: '10px'}} key={i + '-1st-words'}>
                  <DivListGroup data={array[i]} order={'1'}/>
                </td>
                <td style={{padding: '10px'}} key={i + '-2nd-words'}>
                  <DivListGroup data={array[i]} order={'2'}/>
                </td>
                <td style={{padding: '10px'}} key={i + '-3rd-words'}>
                  <DivListGroup data={array[i]} order={'3'}/>
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
                    <div>
                      <span className='pull-left'><strong>Primary</strong></span>
                    </div>
                    <br></br>
                    <div>
                      <span className='pull-left'>Primary Corpus Length</span>
                      <span className='pull-right'>{array[i].order_1_length}</span>
                      <br></br>
                      <span className='pull-left'>Primary Normalized Score</span>
                      <span className='pull-right'>{array[i].normalized_order_1.toFixed(4)}</span>
                    </div>
                    <br></br>
                    <hr></hr>
                    <div>
                      <span className='pull-left'><strong>Secondary</strong></span>
                    </div>
                    <br></br>
                    <div>
                      <span className='pull-left'>Secondary Corpus Length</span>
                      <span className='pull-right'>{array[i].order_2_length}</span>
                      <br></br>
                      <span className='pull-left'>Secondary Normalized Score</span>
                      <span className='pull-right'>{array[i].normalized_order_2.toFixed(4)}</span>
                    </div>
                    <br></br>
                    <hr></hr>
                    <div>
                      <span className='pull-left'><strong>Tertiary</strong></span>
                    </div>
                    <br></br>
                    <div>
                      <span className='pull-left'>Tertiary Corpus Length</span>
                      <span className='pull-right'>{array[i].order_3_length}</span>
                      <br></br>
                      <span className='pull-left'>Tertiary Normalized Score</span>
                      <span className='pull-right'>{array[i].normalized_order_3.toFixed(4)}</span>
                    </div>
                    <br></br>
                </td>
                <td style={{padding: '10px'}} key={i + '-1st-words'}>
                  <DivListGroup data={array[i]} order={'1'}/>
                </td>
                <td style={{padding: '10px'}} key={i + '-2nd-words'}>
                  <DivListGroup data={array[i]} order={'2'}/>
                </td>
                <td style={{padding: '10px'}} key={i + '-3rd-words'}>
                  <DivListGroup data={array[i]} order={'3'}/>
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
                    <div>
                      <span className='pull-left'><strong>Primary</strong></span>
                    </div>
                    <br></br>
                    <div>
                      <span className='pull-left'>Primary Corpus Length</span>
                      <span className='pull-right'>{array[i].order_1_length}</span>
                      <br></br>
                      <span className='pull-left'>Primary Normalized Score</span>
                      <span className='pull-right'>{array[i].normalized_order_1.toFixed(4)}</span>
                    </div>
                    <br></br>
                    <hr></hr>
                    <div>
                      <span className='pull-left'><strong>Secondary</strong></span>
                    </div>
                    <br></br>
                    <div>
                      <span className='pull-left'>Secondary Corpus Length</span>
                      <span className='pull-right'>{array[i].order_2_length}</span>
                      <br></br>
                      <span className='pull-left'>Secondary Normalized Score</span>
                      <span className='pull-right'>{array[i].normalized_order_2.toFixed(4)}</span>
                    </div>
                    <br></br>
                    <hr></hr>
                    <div>
                      <span className='pull-left'><strong>Tertiary</strong></span>
                    </div>
                    <br></br>
                    <div>
                      <span className='pull-left'>Tertiary Corpus Length</span>
                      <span className='pull-right'>{array[i].order_3_length}</span>
                      <br></br>
                      <span className='pull-left'>Tertiary Normalized Score</span>
                      <span className='pull-right'>{array[i].normalized_order_3.toFixed(4)}</span>
                    </div>
                    <br></br>
                </td>
                <td style={{padding: '10px'}} key={i + '-1st-words'}>
                  <DivListGroup data={array[i]} order={'1'}/>
                </td>
                <td style={{padding: '10px'}} key={i + '-2nd-words'}>
                  <DivListGroup data={array[i]} order={'2'}/>
                </td>
                <td style={{padding: '10px'}} key={i + '-3rd-words'}>
                  <DivListGroup data={array[i]} order={'3'}/>
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
          <Alert>Fill out the form above to see the results.</Alert>
        }
        {!isFetching && data.length === 0 &&
          <Alert>No results.</Alert>
        }
        {data.length > 0 && data[0].name != 'big_6' &&
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
        {data.length > 0 && data[0].name == 'big_6' &&
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
