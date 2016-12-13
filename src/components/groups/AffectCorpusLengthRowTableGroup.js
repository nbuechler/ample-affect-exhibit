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
            <i className="fa fa-pull-left fa-file affect--emotion_fa-icon-adjustment" aria-hidden="true"></i> Corpus Length
          </div>
        </td>
        <td>
          <div className="affect--display_corpus-length">
            {data['order-1'].order_length}
          </div>
        </td>
        <td>
          <div className="affect--display_corpus-length">
            {data['order-2'].order_length}
          </div>
        </td>
        <td>
          <div className="affect--display_corpus-length">
            {data['order-3'].order_length}
          </div>
        </td>
        <td>
          <div className="affect--display_corpus-length">
            {data['order_1_and_2'].order_length}
          </div>
        </td>
        <td>
          <div className="affect--display_corpus-length">
            {data['order_1_and_3'].order_length}
          </div>
        </td>
        <td>
          <div className="affect--display_corpus-length">
            {data['order_2_and_3'].order_length}
          </div>
        </td>
        <td>
          <div className="affect--display_corpus-length">
            {data['all_orders'].order_length}
          </div>
        </td>
      </tr>
    );

  }
}
