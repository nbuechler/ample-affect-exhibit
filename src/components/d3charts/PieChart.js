import React from 'react';
import d3 from 'd3';

export default class PieChart extends React.Component {

  constructor (props) {
    super(props);
    this.state = { };
  }

  render () {
    var props = this.props;
    let data = props.data;
    var radius = Math.min(props.heightPixel, props.widthPixel) / 2;
    var layout = d3.layout.pie()(data);
    var arcGen = d3.svg.arc()
      .innerRadius(radius * 0.0)
      .outerRadius(radius * 0.9);
    var color = props.fillColors;
    return (
      <div>
        <div className="radiant--graph-title">
          Part-of-speech<br></br>
          {props.title}
        </div>
        <svg style={{
            height: props.heightPixel + 'px',
            width: props.widthPixel + 'px'
          }}>
          <g transform={`translate(${props.widthPixel / 2},${props.heightPixel / 2})`}>
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
      </div>

    );

  }

}
