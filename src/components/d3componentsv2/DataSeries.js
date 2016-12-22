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
    let props = this.props;
    let yScale = d3.scale.linear()
      .domain([0, d3.max(this.props.data)])
      .range([0 + this.props.padding, this.props.height - this.props.padding]);

    let xScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeRoundBands([0, this.props.width], 0.05);

      console.log(xScale.rangeBand());

    let fillColors = this.props.fillColors,
        stroke = 'black',
        strokeAlt = 'white';

    /**
     * The return statement needs to know what chart to apply the DataSeries to.
     * And, here's the thing, this.props.chart actually gets defined in the
     * React Component that calls DataSeries, where the defnition is, sort of
     * like dependency injection.
     */
    let computedColor = '#AAA',
        computedColorAlt = '#222',
        distinctColors = this.props.distinctColors,
        modulus = this.props.modulus;

    let buffers = {
      'top': .95,
      'bottom': .00,
      'left': .05,
      'right': .05,
    }

    var tempStore = {};
        tempStore.data = this.props.data;
        tempStore.eventfulDates = this.props.eventfulDates;
        tempStore.dataLength = this.props.data.length;
        tempStore.openModal = this.props.openModal;

    switch (this.props.chart) {
      case 'scatter': //chart
        var points = _.map(this.props.data, function(dataPoint, i) {
          if (distinctColors){
            computedColor = fillColors[i % modulus];
          }
          return (
            <Point id={i} dataLength={tempStore.dataLength}
              height={yScale(dataPoint)} width={xScale.rangeBand()} offset={xScale(i)} r={'5px'}
              availableHeight={props.height} stroke={strokeAlt} fillColor={computedColorAlt} key={i} />
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
