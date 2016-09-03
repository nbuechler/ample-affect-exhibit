import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

export default class Line extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }
  render () {
    return (
      <line fill={this.props.fillColor}
        width={this.props.width} height={this.props.height}
        x1={this.props.x1 + this.props.width/2}
        x2={this.props.x2 + this.props.width/2}
        y1={this.props.availableHeight - this.props.y1}
        y2={this.props.availableHeight - this.props.y2}
        style={{stroke: 'black', strokeWidth: '3px'}} />
    );
  }
}
