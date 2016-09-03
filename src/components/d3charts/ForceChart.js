import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

import ForceMiddle from '../d3charts/ForceMiddle';

export default class ForceChart extends React.Component {

  static defaultProps = {
    width: 500,
    height: 500
  }
  constructor (props) {
    super(props);
  }

  state = {
    force: '',
  }

  render () {

    var force = d3.layout.force()
      // .nodes(data)
      .links(this.props.data[5].allLinks)
      .nodes(this.props.data[6].allNodes)
      .charge(function(d){
        return -140;
      })
      .linkDistance(60)
      .size([this.props.width, this.props.height]);

      //start the force
      force.start();

    return (
      <ForceMiddle  border={this.props.border} borderWeight={this.props.borderWeight}
        width={this.props.width} height={this.props.height}distinctColors={this.props.distinctColors} fillColors={this.props.fillColors}
        chart={'force'} modulus={this.props.modulus} title={this.props.title}
        data={this.props.data} force={force}/>
    );

  }

}
