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
        opacity={.5}
        cx={(this.props.rangeBandTarget * this.props.rangeBand) + '%'}
        cy={this.props.availableHeight - this.props.cy}
        stroke={this.props.stroke}
        style={{strokeWidth: '1px'}}
        />
    );
  }
}
