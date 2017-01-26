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
    let graphWidth = d.availableWidth;
    let x = (d.rangeBandTarget * d.rangeBand) //+ d.rangeBand/2 // x coordinate
    let y = d.availableHeight - d.cy // y coordinate

    // console.log(x * graphWidth / 100, y);
    this.setState({
        success: "active"
    });

    // console.log(d.rangeBandTarget, d.rangeBand, "+", d.rangeBand/2, "=", x);
    // console.log(graphWidth, x);

    // Logic to position tooltip rect
    document.getElementById("tooltip-" + d.graphId).children[0]['x'].baseVal.value = graphWidth * x/100 - 13
    document.getElementById("tooltip-" + d.graphId).children[0]['y'].baseVal.value = y + 17
    // Logic to position tooltip texts, and to change the text
    document.getElementById("tooltip-" + d.graphId).children[1]['x'].baseVal[0].valueAsString = graphWidth * x/100 - 8
    document.getElementById("tooltip-" + d.graphId).children[1]['y'].baseVal[0].valueAsString = y + 30
    document.getElementById("tooltip-" + d.graphId).children[2]['x'].baseVal[0].valueAsString = graphWidth * x/100 - 8
    document.getElementById("tooltip-" + d.graphId).children[2]['y'].baseVal[0].valueAsString = y + 40
    document.getElementById("tooltip-" + d.graphId).children[3]['x'].baseVal[0].valueAsString = graphWidth * x/100 - 8
    document.getElementById("tooltip-" + d.graphId).children[3]['y'].baseVal[0].valueAsString = y + 50
    document.getElementById("tooltip-" + 3).children[2].innerHTML = "found " + d.count + " times"

    // Show Tooltip and 'dim' graph background
    document.getElementById("tooltip-" + d.graphId).style.visibility = ""
    document.getElementById("infographic--graphic_background-" + d.graphId).className.baseVal += " active"
  }

  _handleOut(d) {
    this.setState({
        success: ""
    });
    document.getElementById("tooltip-" + d.graphId).style.visibility = "hidden"

    document.getElementById("infographic--graphic_background-" + d.graphId).className.baseVal = "infographic--graphic_background"
  }

  render () {
    return (
      <rect
        className={"infographic--pill_point " + this.props.className + " " + this.state.success.toString()}
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
