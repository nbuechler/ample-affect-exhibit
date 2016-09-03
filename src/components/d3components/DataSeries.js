import React from 'react';
import d3 from 'd3';
import _ from 'underscore';
import { Calendar } from 'calendar';

import ToolTip from '../d3components/ToolTip';
import ForceTip from '../d3components/ForceTip';

import Bar from '../d3components/Bar';
import CalendarCell from '../d3components/CalendarCell';
import Empty from '../d3components/Empty';
import Label from '../d3components/Label';
import Line from '../d3components/Line';
import Link from '../d3components/Link';
import Node from '../d3components/Node';
import Point from '../d3components/Point';

export default class DataSeries extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }
  render () {

    var props = this.props;

    var yScale = d3.scale.linear()
      .domain([0, d3.max(this.props.data)])
      .range([0, this.props.height]);

    var xScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeRoundBands([0, this.props.width], 0.05);

    var fillColors = this.props.fillColors,
        stroke = 'black',
        strokeAlt = 'white';

    /**
     * The return statement needs to know what chart to apply the DataSeries to.
     * And, here's the thing, this.props.chart actually gets defined in the
     * React Component that calls DataSeries, where the defnition is, sort of
     * like dependency injection.
     */
    var computedColor = '#AAA',
        computedColorAlt = '#222',
        distinctColors = this.props.distinctColors,
        modulus = this.props.modulus;

    var buffers = {
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

    var title = <text fill="white" fontSize="20px" x={5} y= "18">{this.props.title ? this.props.title : ''}</text>;

    switch (this.props.chart) {
      case 'bar': //chart
        var bars = _.map(this.props.data, function(dataPoint, i) {
          if (distinctColors){
            computedColor = fillColors[i % modulus];
          }
          return (
            <Bar id={i} dataLength={tempStore.dataLength}
              height={yScale(dataPoint * buffers.top)} width={xScale.rangeBand()}
              offset={xScale(i)} availableHeight={props.height} fillColor={computedColor} key={i} />
          );
        });

        var labels = _.map(this.props.data, function(dataPoint, i) {
          if (distinctColors){
            computedColor = fillColors[i % modulus];
          }
          return (
            <Label id={i} dataLength={tempStore.dataLength} buffers={buffers} mainText={dataPoint}
              height={yScale(dataPoint)} width={xScale.rangeBand()} offset={xScale(i)} availableHeight={props.height} fillColor={computedColor} key={i} />
          );
        });

        var tips = _.map(this.props.data, function(dataPoint, i) {
          if (distinctColors){
            computedColor = fillColors[i % modulus];
          }
          return (
            <ToolTip id={i} dataLength={tempStore.dataLength} buffers={buffers}
              mainText={dataPoint} ttRectWidth={'50'} ttRectHeight={'50'}  visibility={'hidden'}
              height={yScale(dataPoint)} width={xScale.rangeBand()} offset={xScale(i)} availableHeight={props.height} fillColor={computedColor} key={i} />
          );
        });

        return (
          <g>
            {bars}
            {tips}
            {title}
          </g>
        );
        break;
      case 'line': //chart
        var points = _.map(this.props.data, function(dataPoint, i) {
          if (distinctColors){
            computedColor = fillColors[i % modulus];
          }
          return (
            <Point id={i} dataLength={tempStore.dataLength} isLineChart={1}
              height={yScale(dataPoint)} width={xScale.rangeBand()} offset={xScale(i)} r={'10px'}
              availableHeight={props.height} stroke={stroke} fillColor={computedColor} key={i} />
          );
        });

        var lines = _.map(this.props.data, function(dataPoint, i) {
          if (distinctColors){
            computedColor = fillColors[i % modulus];
          }
          return (
            <Line id={i} dataLength={tempStore.dataLength}
              height={yScale(dataPoint)} width={xScale.rangeBand()} availableHeight={props.height}
              y2={yScale(dataPoint)} y1={yScale(tempStore.data[i-1])}
              x2={xScale(i)} x1={xScale(i-1)}
              stroke={stroke} fillColor={computedColor} key={i} />
          );
        });

        var tips = _.map(this.props.data, function(dataPoint, i) {
          if (distinctColors){
            computedColor = fillColors[i % modulus];
          }
          return (
            <ToolTip id={i} dataLength={tempStore.dataLength} buffers={buffers}
              mainText={dataPoint} ttRectWidth={'50'} ttRectHeight={'50'}  visibility={'hidden'}
              height={yScale(dataPoint)} width={xScale.rangeBand()} offset={xScale(i)} availableHeight={props.height} fillColor={computedColor} key={i} />
          );
        });

        return (
          <g>
            {lines.slice(1, lines.length)}
            {points}
            {tips}
            {title}
          </g>
        );
        break;
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

        var tips = _.map(this.props.data, function(dataPoint, i) {
          if (distinctColors){
            computedColor = fillColors[i % modulus];
          }
          return (
            <ToolTip id={i} dataLength={tempStore.dataLength} buffers={buffers}
              mainText={dataPoint} ttRectWidth={'50'} ttRectHeight={'50'}  visibility={'hidden'}
              height={yScale(dataPoint)} width={xScale.rangeBand()} offset={xScale(i)} availableHeight={props.height} fillColor={computedColor} key={i} />
          );
        });

        return (
          <g>
            {points}
            {tips}
            {title}
          </g>
        );
        break;
      case 'force': //chart

        var theNodes = this.props.force.nodes()
        var theLinks = this.props.force.links()

        self = this;

        /**
         * Each tick is a STATE of the force directed graph, and remember that this is in the REACT 'state'
         */

        this.props.force.on('tick', function (tick, b, c) {
          // console.log('tick', tick);
          self.forceUpdate();
        })


        var drawNodes = function () {
          var nodes = theNodes.map(function (node, i) { //Nodes
            return (
              <Node id={i} dataLength={tempStore.dataLength}
                cx={node.x} cy={node.y} r={'10'}
                stroke={strokeAlt} fillColor={computedColorAlt} key={i}
                name={node.name}
                nodeType={node.nodeType}
                characters={node.characters}
                academicArrayLength={node.academicArrayLength}
                academicContent={node.academicContent}
                communeArrayLength={node.communeArrayLength}
                communeContent={node.communeContent}
                emotionArrayLength={node.emotionArrayLength}
                emotionContent={node.emotionContent}
                etherArrayLength={node.etherArrayLength}
                etherContent={node.etherContent}
                physicArrayLength={node.physicArrayLength}
                physicContent={node.physicContent}
                privacy={node.privacy}
                />
            );
          });
          return (
            <g>
              {nodes}
            </g>
          )
        }

        var drawLinks = function () {
          var links = theLinks.map(function (link, i) { //Links
            return (
              <Link id={i} dataLength={tempStore.dataLength}
                y2={link.source.y} y1={link.target.y}
                x2={link.source.x} x1={link.target.x} />
            );
          });
          return (
            <g>
              {links}
            </g>
          )
        }

        return (
          <g>
            {drawLinks()}
            {drawNodes()}
            {title}
            <ForceTip id={'567885'} dataLength={tempStore.dataLength}
              mainText={'hi'} ttRectWidth={'50'} ttRectHeight={'50'}  visibility={'hidden'}
              height={30} width={30} availableHeight={props.height} fillColor={computedColor} />
          </g>
        );
        break;
      case 'calendar': //chart


        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];

        /**
          * Date logic using a 3rd part npm library called 'Calendar'
          */
        var now = new Date;
        var nowDay = now.getDay();
        var nowMonth;
        var nowYear;

        if(parseInt(localStorage.getItem('focusedMonth')) != null){
          nowMonth = parseInt(localStorage.getItem('focusedMonth'));
        } else {
          nowMonth = now.getMonth();
          localStorage.setItem('focusedMonth', now.getMonth());
        }
        if(parseInt(localStorage.getItem('focusedYear')) != null){
          nowYear = parseInt(localStorage.getItem('focusedYear'));
        } else {
          now.getMonth()
          localStorage.setItem('focusedYear', now.getYear());
        }
        var cSun = new Calendar(0); // weeks starts on Sunday
        var mdc = cSun.monthDays(nowYear + 1900, nowMonth);
        for (var i = 0; i < mdc.length; i++) {
          // console.log(mdc[i])
        };


        var dayOfTheWeekDistance = 20;
        var monthDistance = 40;
        var thisMonthText =  monthNames[nowMonth];
        var thisYearText = nowYear + 1900;

        /**
          * Setting up the main business logic
          */
        var cellSize = props.height/7;
        var calendarCellDate = '';
        var match = false;
        var dp = '';
        var cells = [];
        var cellRow = [];
        for (var r = 0; r < mdc.length; r++) {
          cellRow = _.map(mdc[r], function(dataPoint, i) {
            calendarCellDate = nowYear + 1900 + '-' + (nowMonth + 1) + '-' +  dataPoint;
            // console.log(calendarCellDate);
            for (var d = 0; d < tempStore.data.length; d++) {
                if(tempStore.data[d].ymd == calendarCellDate){
                  // console.log('match', calendarCellDate);
                  match = true;
                  dp = tempStore.data[d];
                }
            }
              if (match) {
                // console.log(tempStore.data);
                match = false;
                if (distinctColors){
                  computedColor = fillColors[dp.winningIndexes[0] % modulus];
                }
                  return (
                    <CalendarCell id={i} dataLength={tempStore.dataLength}
                      height={cellSize} width={cellSize}
                      y={cellSize * (r) + dayOfTheWeekDistance + monthDistance} x={cellSize * (i % 7) } fillColor={computedColor} key={calendarCellDate}
                      date={dp.ymd} month={nowMonth} day={dataPoint} year={nowYear}
                      logCount={dp.logCount}
                      openModal={tempStore.openModal}/>
                  );
              } else if (dataPoint == 0) {
                // Don't do anything
              } else {
                if (distinctColors){
                  computedColor = 'lightGray';
                }
                  return (
                    <CalendarCell id={i} dataLength={tempStore.dataLength}
                      height={cellSize} width={cellSize}
                      y={cellSize * (r) + dayOfTheWeekDistance + monthDistance} x={cellSize * (i % 7) } fillColor={computedColor} key={calendarCellDate}
                      date={calendarCellDate} month={nowMonth} day={dataPoint} year={nowYear}
                      logCount={0}
                      openModal={tempStore.openModal}/>
                  );
              }
          });
          cells = cells.concat(cellRow);
        }
        return (
          <g>
            {cells}
            <text fill="lightgray" x={cellSize/4 + 2 + cellSize * 0} y={monthDistance - 17}
              style={{fontSize: '30px'}}>
              {thisMonthText}
            </text>
            <text fill="lightgray" x={props.width - 87} y={monthDistance - 17}
              style={{fontSize: '30px'}}>
              {thisYearText}
            </text>
            <text fill="gray" x={cellSize/4 + 2 + cellSize * 0} y={monthDistance + dayOfTheWeekDistance - 7}>
              Sun
            </text>
            <text fill="gray" x={cellSize/4 + 2 + cellSize * 1} y={monthDistance + dayOfTheWeekDistance - 7}>
              Mon
            </text>
            <text fill="gray" x={cellSize/4 + 2 + cellSize * 2} y={monthDistance + dayOfTheWeekDistance - 7}>
              Tue
            </text>
            <text fill="gray" x={cellSize/4 + 2 + cellSize * 3} y={monthDistance + dayOfTheWeekDistance - 7}>
              Wed
            </text>
            <text fill="gray" x={cellSize/4 + 2 + cellSize * 4} y={monthDistance + dayOfTheWeekDistance - 7}>
              Thu
            </text>
            <text fill="gray" x={cellSize/4 + 4 + cellSize * 5} y={monthDistance + dayOfTheWeekDistance - 7}>
              Fri
            </text>
            <text fill="gray" x={cellSize/4 + 2 + cellSize * 6} y={monthDistance + dayOfTheWeekDistance - 7}>
              Sat
            </text>
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
