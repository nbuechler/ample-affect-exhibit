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
        <td className="row-title">
          Normalized Score
        </td>
        <td>
          {data['order-1'].normalized_order.toFixed(4)}
        </td>
        <td>
          {data['order-2'].normalized_order.toFixed(4)}
        </td>
        <td>
          {data['order-3'].normalized_order.toFixed(4)}
        </td>
        <td>
          {data['order_1_and_2'].normalized_order.toFixed(4)}
        </td>
        <td>
          {data['order_1_and_3'].normalized_order.toFixed(4)}
        </td>
        <td>
          {data['order_2_and_3'].normalized_order.toFixed(4)}
        </td>
        <td>
          {data['all_orders'].normalized_order.toFixed(4)}
        </td>
      </tr>
    );

  }
}
