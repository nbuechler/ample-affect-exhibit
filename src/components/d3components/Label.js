import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

export default class Label extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }
  render () {
    return (
      <text x={this.props.offset + 5 } y={this.props.availableHeight + this.props.buffers.top/2 - this.props.height} fill={'white'}>{this.props.mainText}</text>
    );
  }

}
