import React from 'react';

import DivList from '../lists/DivList'

export default class AffectLemmatizedRowTableGroup extends React.Component {
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
            <i className="fa fa-pull-left fa-puzzle-piece affect--emotion_fa-icon-adjustment" aria-hidden="true"></i> Lemmatized
          </div>
        </td>
        <td>
          <DivList limitList={limitList} fdist={data['order-1'].lemma_order_fdist}/>
        </td>
        <td>
          <DivList limitList={limitList} fdist={data['order-2'].lemma_order_fdist}/>
        </td>
        <td>
          <DivList limitList={limitList} fdist={data['order-3'].lemma_order_fdist}/>
        </td>
        <td>
          <DivList limitList={limitList} fdist={data['order_1_and_2'].lemma_order_fdist}/>
        </td>
        <td>
          <DivList limitList={limitList} fdist={data['order_1_and_3'].lemma_order_fdist}/>
        </td>
        <td>
          <DivList limitList={limitList} fdist={data['order_2_and_3'].lemma_order_fdist}/>
        </td>
        <td>
          <DivList limitList={limitList} fdist={data['all_orders'].lemma_order_fdist}/>
        </td>
      </tr>
    );

  }
}
