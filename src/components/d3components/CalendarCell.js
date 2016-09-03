import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import _ from 'underscore';

export default class Bar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  _handleClick(d) {
    console.log(d);
    localStorage.setItem('reflectionDate', d.date);
    if (d.logCount > 0) {
      localStorage.setItem('popoverMessage', 'Good work!');
    } else {
      localStorage.setItem('popoverMessage', 'Oh well, no worries here!');
    }
    localStorage.setItem('eventCount', d.logCount);
    d.openModal(); //Opens the modal information from the parent... in LogDisplay.js
  }

  render () {

    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
      <rect fill={this.props.fillColor}
        width={this.props.width - 4} height={this.props.height - 4}
        x={this.props.x + 2} y={this.props.y + 2}
        rx="5" ry="5"
        style={{stroke: '#111', strokeWidth: '2px'}}
        onClick={this._handleClick.bind(this, this.props)}>
        <title><b>{this.props.logCount}</b> logs on {monthNames[this.props.month].substring(0,3)} {this.props.day}, {this.props.year + 1900}</title>
      </rect>
    );
  }
}
