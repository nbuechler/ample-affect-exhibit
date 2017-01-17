import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import _ from 'underscore';

export default class PillPoint extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }
  render () {
    return (
      <rect
        className={this.props.className}
        rx="5px"
        ry="5px"
        width={this.props.rw}
        height={this.props.rh}
        opacity={this.props.opacity}
        x={(this.props.rangeBandTarget * this.props.rangeBand) + this.props.rangeBand/2 + '%'}
        y={this.props.availableHeight - this.props.cy}
        stroke={this.props.stroke}
        style={{strokeWidth: '1px', transform: "translate(-50%, -50%)"}}
        />
    );
  }
}
