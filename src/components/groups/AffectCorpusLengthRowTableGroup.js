import React from 'react';

import DivList from '../lists/DivList'

export default class AffectCorpusLengthRowTableGroup extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {

    let data = this.props.data;

    return (
      <tr>
        <td>
          <div className="affect--display_row-title">
            Corpus Length
          </div>
        </td>
        <td>
          {data['order-1'].order_length}
        </td>
        <td>
          {data['order-2'].order_length}
        </td>
        <td>
          {data['order-3'].order_length}
        </td>
        <td>
          {data['order_1_and_2'].order_length}
        </td>
        <td>
          {data['order_1_and_3'].order_length}
        </td>
        <td>
          {data['order_2_and_3'].order_length}
        </td>
        <td>
          {data['all_orders'].order_length}
        </td>
      </tr>
    );

  }
}
