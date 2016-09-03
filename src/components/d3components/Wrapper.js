import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

export default class Wrapper extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }
  render () {
    if(this.props.border){
      return (
        <svg
          style={{border: this.props.borderWeight + 'px solid black', padding: '0px', marginTop: '10px', marginBottom: '10px', background: '#222'}}
          width={this.props.width} height={this.props.height}>{this.props.children}</svg>
      );
    } else {
      return (
        <svg
          style={{border: '0px solid black', padding: '0px', background: '#222', marginTop: '10px', marginBottom: '10px'}}
          width={this.props.width} height={this.props.height}>{this.props.children}</svg>
      );
    }

  }

}
