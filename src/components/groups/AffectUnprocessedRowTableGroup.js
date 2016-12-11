import React from 'react';

import DivList from '../lists/DivList'

export default class AffectUnprocessedRowTableGroup extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {

    let data = this.props.data;

    return (
      <tr>
        <td className="row-title">
          Unprocessed
        </td>
        <td>
          <DivList fdist={data['order-1'].natural_order_fdist}/>
        </td>
        <td>
          <DivList fdist={data['order-2'].natural_order_fdist}/>
        </td>
        <td>
          <DivList fdist={data['order-3'].natural_order_fdist}/>
        </td>
        <td>
          <DivList fdist={data['order_1_and_2'].natural_order_fdist}/>
        </td>
        <td>
          <DivList fdist={data['order_1_and_3'].natural_order_fdist}/>
        </td>
        <td>
          <DivList fdist={data['order_2_and_3'].natural_order_fdist}/>
        </td>
        <td>
          <DivList fdist={data['all_orders'].natural_order_fdist}/>
        </td>
      </tr>
    );

  }
}
