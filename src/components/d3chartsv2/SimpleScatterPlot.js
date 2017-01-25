import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

import DataSeries from '../d3componentsv2/DataSeries';
import VectorGraphicWrapper from '../d3componentsv2/VectorGraphicWrapper';

export default class SimpleScatterPlot extends React.Component {

  static defaultProps = {
    width: 500,
    height: 500
  }
  constructor (props) {
    super(props);
    this.state = { };
  }

  render () {

    // You are pulling levers for building the chart.
    let svgStyle = {
      height: this.props.heightPixel + 'px',
      width: this.props.widthPercent + '%',
      padding: this.props.paddingPixel + 'px',
    }
    return (
      <div>
        <div className="infographic--graph-title">{this.props.title}</div>
        <VectorGraphicWrapper graphId={this.props.graphId} svgStyle={svgStyle}>
          <DataSeries
            modulus={this.props.modulus}
            chart={'simple-scatter'}
            data={this.props.data}
            height={this.props.heightPixel}
            width={this.props.widthPercent}
            padding={this.props.paddingPixel}
            graphId={this.props.graphId}/>
        </VectorGraphicWrapper>
      </div>
    );

  }

}
