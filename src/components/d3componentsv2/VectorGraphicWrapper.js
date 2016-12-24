import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

export default class VectorGraphicWrapper extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    let svgStyle = this.props.svgStyle || {}
    return (
      <svg
        className="graphic-background"
        style={svgStyle}>
        {this.props.children}
      </svg>
    );
  }
}
