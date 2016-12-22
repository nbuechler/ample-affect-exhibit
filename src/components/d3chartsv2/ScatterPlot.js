import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

import DataSeries from '../d3componentsv2/DataSeries';
import VectorGraphicWrapper from '../d3componentsv2/VectorGraphicWrapper';

export default class ScatterPlot extends React.Component {

  static defaultProps = {
    width: 500,
    height: 500
  }
  constructor (props) {
    super(props);
    this.state = { };
  }

  render () {

    // You are pulling levels for building the chart.
    let svgStyle = {
      border: '1px solid black',
      padding: '20px',
      height: this.props.heightPixel + 'px',
      width: this.props.widthPercent + '%',
    }
    return (
      <div>
        <div>{this.props.title}</div>
        <VectorGraphicWrapper svgStyle={svgStyle}>
          <DataSeries
            distinctColors={this.props.distinctColors}
            fillColors={this.props.fillColors}
            modulus={this.props.modulus}
            chart={'scatter'}
            data={this.props.data}
            height={this.props.heightPixel}
            width={this.props.widthPercent}/>
        </VectorGraphicWrapper>
      </div>
    );

  }

}
