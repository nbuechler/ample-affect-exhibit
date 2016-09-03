import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

export default class ToolTip extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }
  render () {
    var ttRectWidth = this.props.ttRectWidth,
        ttRectHeight = this.props.ttRectHeight,
        scaleShift = this.props.offset + this.props.width/2;

    var textElement = '';

    if(this.props.mainText > 999999){
      textElement = <text id={this.props.tipId} x={scaleShift - ttRectWidth/2 + 13}
                          y={this.props.availableHeight/2}
                          fill={'lightGreen'}>{Math.round(this.props.mainText/1000000) + 'M'}</text>;
    } else if(this.props.mainText > 99999){
      textElement = <text id={this.props.tipId} x={scaleShift - ttRectWidth/2 + 8}
                          y={this.props.availableHeight/2}
                          fill={'lightGreen'}>{'0.' + Math.round(this.props.mainText/100000) + 'M'}</text>;
    } else if(this.props.mainText > 9999){
      textElement = <text id={this.props.tipId} x={scaleShift - ttRectWidth/2 + 10}
                          y={this.props.availableHeight/2}
                          fill={'white'}>{Math.round(this.props.mainText/1000) + 'K'}</text>;
    } else if(this.props.mainText > 999){
      textElement = <text id={this.props.tipId} x={scaleShift - ttRectWidth/2 + 15}
                          y={this.props.availableHeight/2}
                          fill={'white'}>{Math.round(this.props.mainText/1000) + 'K'}</text>;
    } else if(this.props.mainText > 99){
      textElement = <text id={this.props.tipId} x={scaleShift - ttRectWidth/2 + 10}
                          y={this.props.availableHeight/2}
                          fill={'white'}>{this.props.mainText}</text>;
    } else if (this.props.mainText > 9) {
      textElement = <text id={this.props.tipId} x={scaleShift - ttRectWidth/2 + 15}
                          y={this.props.availableHeight/2}
                          fill={'white'}>{this.props.mainText}</text>;
    } else {
      textElement = <text id={this.props.tipId} x={scaleShift - ttRectWidth/2 + 20}
                          y={this.props.availableHeight/2}
                          fill={'white'}>{this.props.mainText}</text>;
    }

    return (
      <g style={{visibility: this.props.visibility, fontWeight: 900, textAlign: 'center'}}>
        <rect width={ttRectWidth} height={ttRectHeight} fill="#111" opacity="0.9" stroke="black" strokeWidth="3px"
              x={this.props.offset + this.props.width/2 - ttRectWidth/2} y={this.props.availableHeight/2 - 30} >
        </rect>
        {textElement}
      </g>
    );
  }

}
