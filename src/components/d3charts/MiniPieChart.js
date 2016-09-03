import React from 'react';
import d3 from 'd3';

export default class MiniPieChart extends React.Component {

  static defaultProps = {
    width: 50,
    height: 50,
    x: 0,
    y: 0,
  }
  constructor (props) {
    super(props);
    this.state = { };
  }

  render () {
    var {props} = this, {width, height, data} = props;
    var radius = Math.min(width, height) / 2;
    var layout = d3.layout.pie()(data);
    var arcGen = d3.svg.arc()
      .innerRadius(radius * 0.0)
      .outerRadius(radius * 0.9);
    var color = ['#EB493A', '#5078A9', '#8B2E74', '#4E981F', '#D69C30'];
    return (
      <svg {...props} visibility={'hidden'}>
        <g transform={`translate(${width / 2},${height / 2})`}>
          {layout.map((d, i) => {
            return (
              <path
                d={arcGen(d)}
                key={i}
                style={{
                  fill: color[i % 5],
                  stroke: 'black',
                  strokeWidth: '2px',
                }}
              />
              );
          })}
        </g>
      </svg>

    );

  }

}
