import React from 'react';
import d3 from 'd3';
import _ from 'underscore';
import { Calendar } from 'calendar';

import Empty from '../d3componentsv2/Empty';
import Point from '../d3componentsv2/Point';

export default class DataSeries extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let data = this.props.data;
    let props = this.props;
    // In px (pixels)
    let yScale = d3.scale.linear()
      // d3.max(>data>) should have the data with the greatest point
      .domain([0, d3.max(data)])
      // The VectorGraphicWrapper adds padding. The tallest point is fine.
      // The shortest point is twice the padding off the graph.
      .range([0 + (this.props.padding * 2), this.props.height]);

    // In % (percents)
    let xScale = d3.scale.ordinal()
      .domain(d3.range(data.length))
      .rangeRoundBands([0, 10000]);

    let fillColors = this.props.fillColors,
        stroke = 'black',
        strokeAlt = 'white';

    let modulus = this.props.modulus;

    switch (this.props.chart) {
      case 'simple-scatter': //chart
        var points = _.map(data, function(dataPoint, i) {
          return (
            <Point id={i} key={i} r={'3px'} stroke={strokeAlt}
              cy={yScale(dataPoint)} rangeBandTarget={i} rangeBand={xScale.rangeBand()/100}
              availableHeight={props.height}/>
          );
        });

        return (
          <g>
            {points}
          </g>
        );
        break;
      case 'bin-scatter': //chart
        var points = _.map(data, function(dataPoint, i) {
          console.log(dataPoint, i);
          return (
            <Point id={i} key={i} r={'3px'} stroke={strokeAlt}
              cy={yScale(dataPoint)} rangeBandTarget={i} rangeBand={xScale.rangeBand()/100}
              availableHeight={props.height}/>
          );
        });

        return (
          <g>
            {points}
          </g>
        );
        break;
      default:
        return (
          <Empty height={this.props.height} width={this.props.width}></Empty>
        );
        break;
    }
  }
}
