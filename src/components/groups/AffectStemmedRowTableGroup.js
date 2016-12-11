import React from 'react';

import DivList from '../lists/DivList'

export default class AffectStemmedRowTableGroup extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {

    let data = this.props.data;

    return (
      <tr>
        <td className="row-title">
          Stemmed
        </td>
        <td>
          <DivList fdist={data['order-1'].stemmer_order_fdist}/>
        </td>
        <td>
          <DivList fdist={data['order-2'].stemmer_order_fdist}/>
        </td>
        <td>
          <DivList fdist={data['order-3'].stemmer_order_fdist}/>
        </td>
        <td>
          <DivList fdist={data['order_1_and_2'].stemmer_order_fdist}/>
        </td>
        <td>
          <DivList fdist={data['order_1_and_3'].stemmer_order_fdist}/>
        </td>
        <td>
          <DivList fdist={data['order_2_and_3'].stemmer_order_fdist}/>
        </td>
        <td>
          <DivList fdist={data['all_orders'].stemmer_order_fdist}/>
        </td>
      </tr>
    );

  }
}
