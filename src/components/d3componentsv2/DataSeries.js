import React from 'react';
import d3 from 'd3';
import _ from 'underscore';
import { Calendar } from 'calendar';

import Empty from '../d3componentsv2/Empty';
import Point from '../d3componentsv2/Point';
import PillPoint from '../d3componentsv2/PillPoint';
import ToolTip from '../d3componentsv2/ToolTip';

export default class DataSeries extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {

    let data = undefined;
    let props = undefined;
    let yScale = undefined;
    let xScale = undefined;
    let r = undefined;

    let graphId = this.props.graphId

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
            <Point id={i} key={i} r={r || '3px'} stroke={strokeAlt} opacity={.5}
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
        let maxYValue = this.props.maxYValue

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

        {/*
        var axisText = _.map(data, function(dataPoint, i) {
          return (

            <text key={i + 'text'} y={props.height - 150} x={dataPoint.bin * xScale.rangeBand()/100 + dataPoint.bin/2 + '%'} dy=".71em" text-anchor="middle" transform="translate(-24,12)rotate(-0)">01 Jan</text>
          );
        });
        */}

        r = this.props.pointRadius;

        let graphWidth = 100 - props.padding * 2
        // TODO: Organize the code OR refactor into something more elegant!
        let binData = []
        // binCountFrequency is a list of lists where each list contains the point of the respective order
        // i.e. order I is in the zeroth position, order II is in the first position.
        let binCountFrequency = [[], [], [], [], [], [], []]
        for (let point of data) {
          switch (point.bin) {
            case 0:
              // binCountFrequency[point.bin].push(point)
              binCountFrequency[point.bin].push(point.count)
              break;
            case 1:
              // binCountFrequency[point.bin].push(point)
              binCountFrequency[point.bin].push(point.count)
              break;
            case 2:
              // binCountFrequency[point.bin].push(point)
              binCountFrequency[point.bin].push(point.count)
              break;
            case 3:
              // binCountFrequency[point.bin].push(point)
              binCountFrequency[point.bin].push(point.count)
              break;
            case 4:
              // binCountFrequency[point.bin].push(point)
              binCountFrequency[point.bin].push(point.count)
              break;
            case 5:
              // binCountFrequency[point.bin].push(point)
              binCountFrequency[point.bin].push(point.count)
              break;
            case 6:
              // binCountFrequency[point.bin].push(point)
              binCountFrequency[point.bin].push(point.count)
              break;
            default:
              order = 'None'
          }
        }

        // Find the frequency of each count of words
        let frequencyDistOfCounts = []
        for (let bcfOrder of binCountFrequency) {
          let counts = {};
          let arr = bcfOrder
          for (var i = 0; i < arr.length; i++) {
              counts[arr[i]] = 1 + (counts[arr[i]] || 0);
          }
          frequencyDistOfCounts.push(counts)
        }

        var points = _.map(data, function(dataPoint, i) {
          if (dataPoint.pos == 'PRP$') {
            dataPoint.pos = 'PRPS';
          }
          if (props.graphSize == "md") {
            graphWidth = 542 - props.padding * 2
          }

          let order = 'None'
          switch (dataPoint.bin) {
            case 0:
              order = 'I'
              break;
            case 1:
              order = 'II'
              break;
            case 2:
              order = 'III'
              break;
            case 3:
              order = 'I-II'
              break;
            case 4:
              order = 'I-III'
              break;
            case 5:
              order = 'II-III'
              break;
            case 6:
              order = 'I-II-II'
              break;
            default:
              order = 'None'
          }

          {/*TODO: Make the pillpoint opacity more effective by not drawing duplicate points*/}
          return (
            <PillPoint id={i} key={i} rw={r * 3 + 'px'} rh={r / 2 + 'px'} stroke={strokeAlt} opacity={.1} className={ dataPoint.pos + '-pos-point' || ''}
              cy={yScale(dataPoint.count)} count={dataPoint.count} rangeBandTarget={dataPoint.bin} rangeBand={xScale.rangeBand()/100}
              availableHeight={props.height} availableWidth={graphWidth} graphSize={props.graphSize} graphId={graphId} order={order}
              frequencyDistOfCounts={frequencyDistOfCounts}/>
          );
        });

        let tooltip = ''
        let xAxisLabels = [
          <text className="radiant--axis_label" key={'t_1'} y={'99%'} x={1 * xScale.rangeBand()/100 + '%'} dy=".71em" textAnchor="middle" transform="translate(-24,12)rotate(-0)">I</text>,
          <text className="radiant--axis_label" key={'t_2'} y={'99%'} x={2 * xScale.rangeBand()/100 + '%'} dy=".71em" textAnchor="middle" transform="translate(-24,12)rotate(-0)">II</text>,
          <text className="radiant--axis_label" key={'t_3'} y={'99%'} x={3 * xScale.rangeBand()/100 + '%'} dy=".71em" textAnchor="middle" transform="translate(-24,12)rotate(-0)">III</text>,
          <text className="radiant--axis_label" key={'t_12'} y={'99%'} x={4 * xScale.rangeBand()/100 + '%'} dy=".71em" textAnchor="middle" transform="translate(-24,12)rotate(-0)">I-II</text>,
          <text className="radiant--axis_label" key={'t_13'} y={'99%'} x={5 * xScale.rangeBand()/100 + '%'} dy=".71em" textAnchor="middle" transform="translate(-24,12)rotate(-0)">I-III</text>,
          <text className="radiant--axis_label" key={'t_23'} y={'99%'} x={6 * xScale.rangeBand()/100 + '%'} dy=".71em" textAnchor="middle" transform="translate(-24,12)rotate(-0)">II-III</text>,
          <text className="radiant--axis_label" key={'t_123'} y={'99%'} x={7 * xScale.rangeBand()/100 + '%'} dy=".71em" textAnchor="middle" transform="translate(-24,12)rotate(-0)">I-II-III</text>,
        ]
        let yAxisLabels = ''
        if (props.graphSize == "md") {
          tooltip = <ToolTip id={"tooltip-" + graphId} ttRectWidth={'100'} ttRectHeight={'40'}  visibility={'hidden'}/>
          yAxisLabels = [
            <text className="radiant--axis_label" key={'maxYValue'} y={0 - 3} x={'102%'} dy=".71em">{maxYValue}</text>,
            <text className="radiant--axis_label" key={'midYValue'} y={props.height - yScale(maxYValue/2) - 3} x={'102%'} dy=".71em">{maxYValue/2}</text>,
            <text className="radiant--axis_label" key={'minYValue'} y={props.height - yScale(0) - 3} x={'102%'} dy=".71em">{0}</text>,
          ]
        }

        return (
          <g>
            <g>
              {points}
            </g>
            <g>
              {xAxisLabels}
            </g>
            <g>
              {yAxisLabels}
            </g>
            {tooltip}
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
