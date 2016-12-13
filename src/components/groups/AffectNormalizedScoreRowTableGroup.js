import React from 'react';

import DivList from '../lists/DivList'

export default class AffectNormalizedScoreRowTableGroup extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {

    let data = this.props.data;

    return (
      <tr>
        <td>
          <div className="affect--display_row-title">
            <i className="fa fa-pull-left fa-certificate affect--emotion_fa-icon-adjustment" aria-hidden="true"></i> Normalized Score
          </div>
        </td>
        <td>
          <div className="affect--display_corpus-score">
            {data['order-1'].normalized_order.toFixed(4)}
          </div>
        </td>
        <td>
          <div className="affect--display_corpus-score">
            {data['order-2'].normalized_order.toFixed(4)}
          </div>
        </td>
        <td>
          <div className="affect--display_corpus-score">
            {data['order-3'].normalized_order.toFixed(4)}
          </div>
        </td>
        <td>
          <div className="affect--display_corpus-score">
            {data['order_1_and_2'].normalized_order.toFixed(4)}
          </div>
        </td>
        <td>
          <div className="affect--display_corpus-score">
            {data['order_1_and_3'].normalized_order.toFixed(4)}
          </div>
        </td>
        <td>
          <div className="affect--display_corpus-score">
            {data['order_2_and_3'].normalized_order.toFixed(4)}
          </div>
        </td>
        <td>
          <div className="affect--display_corpus-score">
            {data['all_orders'].normalized_order.toFixed(4)}
          </div>
        </td>
      </tr>
    );

  }
}
