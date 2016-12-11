import React from 'react';

import DivList from '../lists/DivList'

export default class DivListGroup extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {

    let data = this.props.data;

    function renderLists() {
      return (
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
    }

    return (
      renderLists()
    );

  }
}
