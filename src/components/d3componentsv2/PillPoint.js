import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import _ from 'underscore';

export default class PillPoint extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      "success": ""
    };
  }

  _handleOver(d) {
    let graphWidth = 400;
    let x = (d.rangeBandTarget * d.rangeBand) + d.rangeBand/2 // x coordinate
    let y = d.availableHeight - d.cy // y coordinate
    let currentTipXPos = document.getElementById("tooltip-" + d.graphId).children[0]['x'].baseVal.value
    let currentTipYPos = document.getElementById("tooltip-" + d.graphId).children[0]['x'].baseVal.value

    // console.log(x * graphWidth / 100, y);
    this.setState({
        success: "active"
    });

    document.getElementById("tooltip-" + d.graphId).children[0]['x'].baseVal.value = x * graphWidth / 100
    document.getElementById("tooltip-" + d.graphId).children[0]['y'].baseVal.value = y
    document.getElementById("tooltip-" + d.graphId).style.visibility = ""
  }

  _handleOut(d) {
    this.setState({
        success: ""
    });
    document.getElementById("tooltip-" + d.graphId).style.visibility = "hidden"
  }

  render () {
    return (
      <rect
        className={this.props.className + " " + this.state.success.toString()}
        rx="5px"
        ry="5px"
        width={this.props.rw}
        height={this.props.rh}
        opacity={this.props.opacity}
        x={(this.props.rangeBandTarget * this.props.rangeBand) + this.props.rangeBand/2 + '%'}
        y={this.props.availableHeight - this.props.cy}
        stroke={this.props.stroke}
        style={{strokeWidth: '1px', transform: "translate(-50%, -50%)"}}
        onMouseOver={this._handleOver.bind(this, this.props)}
        onMouseOut={this._handleOut.bind(this, this.props)}
        />
    );
  }
}
