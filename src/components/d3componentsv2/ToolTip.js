import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

export default class ToolTip extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    var ttRectWidth = this.props.ttRectWidth,
        ttRectHeight = this.props.ttRectHeight,
        scaleShift = this.props.offset + this.props.width/2;

    var textElement = 'hi';

    return (
      <g id={this.props.id} style={{visibility: this.props.visibility, fontWeight: 900, textAlign: 'center'}}>
        <rect width={ttRectWidth} height={ttRectHeight} fill="#111" opacity="0.9" stroke="black" strokeWidth="3px"
              x={0} y={0} >
        </rect>
        <text>
          {textElement}
        </text>
      </g>
    );
  }

}
