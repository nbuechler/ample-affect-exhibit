import React from 'react';
import d3 from 'd3';

export default class PieChart extends React.Component {

  constructor (props) {
    super(props);
    this.state = { };
  }

  render () {
    var props = this.props;
    let data = [1,2,3,4,5]
    var radius = Math.min(200, 200) / 2;
    var layout = d3.layout.pie()(data);
    var arcGen = d3.svg.arc()
      .innerRadius(radius * 0.0)
      .outerRadius(radius * 0.9);
    var color = ['#eae3db', '#c2f6ff', '#90a9dc', '#d5c5fc', '#a3b2ca'];
    return (
      <svg >
        <g transform={`translate(${200 / 2},${200 / 2})`}>
          {layout.map((d, i) => {
            return (
              <path
                d={arcGen(d)}
                key={i}
                style={{
                  fill: color[i % 5],
                  stroke: 'white',
                  strokeWidth: '1px'
                }}
              />
              );
          })}
        </g>
      </svg>

    );

  }

}
