import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DivListGroup from '../groups/DivListGroup'

import { Table, Alert } from 'react-bootstrap';

export default class NLPMinRankTable extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    let array = this.props.data;
    return (
      <div>
        <Table style={{fontSize: '12px', margin: 'auto', textAlign: 'center'}} condensed>
          <tbody>
            <tr>
              <td style={{width: '80%'}}>
                <div className="affect--display_name">
                    {array[0].emotion}
                </div>
              </td>
              <td style={{width: '10%'}}>
                <div className="affect--display_rank">
                    1
                </div>
              </td>
              <td style={{width: '10%'}}>
                <div className="affect--display_scores">
                    {array[0].normalized_r_score.toFixed(4)}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="affect--display_name">
                    {array[1].emotion}
                </div>
              </td>
              <td>
                <div className="affect--display_rank">
                    2
                </div>
              </td>
              <td>
                <div className="affect--display_scores">
                    {array[1].normalized_r_score.toFixed(4)}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="affect--display_name">
                    {array[2].emotion}
                </div>
              </td>
              <td>
                <div className="affect--display_rank">
                    3
                </div>
              </td>
              <td>
                <div className="affect--display_scores">
                    {array[2].normalized_r_score.toFixed(4)}
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
