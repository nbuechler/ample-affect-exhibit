import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import _ from 'underscore';

export default class Point extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }
  render () {
    return (
      <circle fill={this.props.fillColor}
        r={this.props.r}
        cx={this.props.offset + this.props.width/2}
        cy={this.props.availableHeight - this.props.height}
        stroke={this.props.stroke}
        style={{strokeWidth: '1px'}}
        />
    );
  }
}
