import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import _ from 'underscore';

export default class Link extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }
  render () {
    return (
      <line fill={this.props.fillColor}
        x1={this.props.x1}
        x2={this.props.x2}
        y1={this.props.y1}
        y2={this.props.y2}
        style={{stroke: 'gray', strokeWidth: '3px'}} />
    );
  }
}
