import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import _ from 'underscore';

export default class PillPoint extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      // TODO Change me to be a classname instead maybe?
      "success": false
    };
  }

  _handleOver(d, i) {
    console.log(this);
    this.setState({
        success: !this.state.success
    });
  }

  _handleOut(d, i) {
    console.log(this);
    this.setState({
        success: !this.state.success
    });
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
