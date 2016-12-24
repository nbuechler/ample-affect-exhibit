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

    let data = undefined;
    let props = undefined;
    let yScale = undefined;
    let xScale = undefined;

    let graphYRange = [0 + (this.props.padding * 2), this.props.height];
    let graphXRangeBands = [0, 10000];

    let fillColors = this.props.fillColors,
        stroke = 'black',
        strokeAlt = 'white';

    let modulus = this.props.modulus;

    switch (this.props.chart) {
      case 'simple-scatter': //chart
        data = this.props.data;
        props = this.props;
        // In px (pixels)
        yScale = d3.scale.linear()
          // d3.max(<data>) should have the data with the greatest point
          .domain([0, d3.max(data)])
          // The VectorGraphicWrapper adds padding. The tallest point is fine.
          // The shortest point is twice the padding off the graph.
          .range(graphYRange);

        // In % (percents)
        xScale = d3.scale.ordinal()
          .domain(d3.range(data.length))
          .rangeRoundBands(graphXRangeBands);

        var points = _.map(data, function(dataPoint, i) {
          return (
            <Point id={i} key={i} r={'3px'} stroke={strokeAlt} opacity={.5}
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
        let rawData = this.props.data,
            processedData = [],
            datapoint = {},
            counter = 0;
        for (let i of rawData) {
          for (let j of i) {
            datapoint = {
              "word": j[0][0],
              "pos": j[0][1],
              "count": j[1],
              "bin": counter,
            }
            processedData.push(datapoint)
          }
          counter++
        }

        data = processedData;
          // d3.max(<data>) should have the data with the greatest point

        let maxYValue = d3.max(data, function(d) {
                          return +d.count;
                        })

        props = this.props;
        // In px (pixels)
        yScale = d3.scale.linear()
          .domain([0, maxYValue])
          // The VectorGraphicWrapper adds padding. The tallest point is fine.
          // The shortest point is twice the padding off the graph.
          .range(graphYRange);

        // In % (percents)
        xScale = d3.scale.ordinal()
          .domain(d3.range(counter))
          .rangeRoundBands(graphXRangeBands);

        console.log(xScale.rangeBand()/100);
        var points = _.map(data, function(dataPoint, i) {
          return (
            <Point id={i} key={i} r={'3px'} stroke={strokeAlt} opacity={.3}
              cy={yScale(dataPoint.count)} rangeBandTarget={dataPoint.bin} rangeBand={xScale.rangeBand()/100}
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
