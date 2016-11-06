import React from 'react';

export default class StatisticGroup extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {

    let data = this.props.data;
    let title = this.props.title;

    return (
      <div>
        <div>
          <span className='pull-left'><strong>{title}</strong></span>
        </div>
        <br></br>
        <div>
          <span className='pull-left'>{title} Corpus Length</span>
          <span className='pull-right'>{data.order_length}</span>
          <br></br>
          <span className='pull-left'>{title} Normalized Score</span>
          <span className='pull-right'>{data.normalized_order.toFixed(4)}</span>
        </div>
        <br></br>
      </div>
    );

  }
}
