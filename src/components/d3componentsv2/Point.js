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
      <circle
        className={this.props.className}
        r={this.props.r}
        opacity={this.props.opacity}
        cx={(this.props.rangeBandTarget * this.props.rangeBand) + this.props.rangeBand/2 + '%'}
        cy={this.props.availableHeight - this.props.cy}
        stroke={this.props.stroke}
        style={{strokeWidth: '1px'}}
        />
    );
  }
}
