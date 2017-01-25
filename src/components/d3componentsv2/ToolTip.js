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
        // TODO: Add className attr to rect and in CSS to handle this better
        <rect width={ttRectWidth} height={ttRectHeight} fill="#111" opacity="0.9" stroke="black" strokeWidth="1px"
              x={0} y={0} >
        </rect>
        <text x={0} y={0} className="infographic--tooltip_text">
          {textElement}
        </text>
        <text x={0} y={0} className="infographic--tooltip_text">
          {"in Y order"}
        </text>
        <text x={0} y={0} className="infographic--tooltip_text">
          {"and there was Z word(s)"}
        </text>
      </g>
    );
  }

}
