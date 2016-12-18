import React from 'react';

import DivList from '../lists/DivList'

export default class AffectUnprocessedRowTableGroup extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {

    let data = this.props.data;
    let limitList = this.props.limitList;

    return (
      <tr>
        <td>
          <div className="affect--display_row-title">
            <i className="fa fa-pull-left fa-lemon-o affect--emotion_fa-icon-adjustment" aria-hidden="true"></i> Unprocessed
          </div>
        </td>
        <td>
          <DivList limitList={limitList} fdist={data['order-1'].natural_order_fdist}/>
        </td>
        <td>
          <DivList limitList={limitList} fdist={data['order-2'].natural_order_fdist}/>
        </td>
        <td>
          <DivList limitList={limitList} fdist={data['order-3'].natural_order_fdist}/>
        </td>
        <td>
          <DivList limitList={limitList} fdist={data['order_1_and_2'].natural_order_fdist}/>
        </td>
        <td>
          <DivList limitList={limitList} fdist={data['order_1_and_3'].natural_order_fdist}/>
        </td>
        <td>
          <DivList limitList={limitList} fdist={data['order_2_and_3'].natural_order_fdist}/>
        </td>
        <td>
          <DivList limitList={limitList} fdist={data['all_orders'].natural_order_fdist}/>
        </td>
      </tr>
    );

  }
}
