import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import _ from 'underscore';

export default class Node extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }

  _handleOver(d) {

    var shifter = 30; // This gets the whole tooltip away from the node
    var forceTipDOM = ReactDOM.findDOMNode(this).parentElement.parentElement.children[3]; //DOM Element


        //These transformations apply to each case
        forceTipDOM.children[1].innerHTML = d.nodeType.charAt(0).toUpperCase() + d.nodeType.slice(1);
        forceTipDOM.children[0].setAttribute('visibility', 'visible');
        forceTipDOM.children[1].setAttribute('visibility', 'visible');

    switch (d.nodeType) {
      case 'log':
        // Change Rectangle Element
        forceTipDOM.children[0].setAttribute('x', d.cx + shifter);
        forceTipDOM.children[0].setAttribute('y', d.cy + shifter);
        forceTipDOM.children[0].setAttribute('width', 60);

        // Change Text Title
        forceTipDOM.children[1].setAttribute('x', d.cx + 20 + shifter);
        forceTipDOM.children[1].setAttribute('y', d.cy + 30 + shifter);

        // Pie Variables
        var nodePiePaths = forceTipDOM.children[2].children[0].children; //piePaths
        var nodePieData = [d.physicArrayLength, d.emotionArrayLength, d.academicArrayLength, d.communeArrayLength, d.etherArrayLength]; //data
        var nodePie = d3.layout.pie()(nodePieData); //pie layout
        var arcGen = d3.svg.arc() //arcGeneration of pie slices paths
              .innerRadius(25 * 0.0)
              .outerRadius(25 * 0.9);

        // Change MiniPieChart Element
        forceTipDOM.children[2].setAttribute('visibility', 'visible');
        forceTipDOM.children[2].setAttribute('x', d.cx + 5);
        forceTipDOM.children[2].setAttribute('y', d.cy + 5);
        forceTipDOM.children[2].setAttribute('visibility', 'visible');

        nodePiePaths[0].setAttribute('d', arcGen(nodePie[0]));
        nodePiePaths[1].setAttribute('d', arcGen(nodePie[1]));
        nodePiePaths[2].setAttribute('d', arcGen(nodePie[2]));
        nodePiePaths[3].setAttribute('d', arcGen(nodePie[3]));
        nodePiePaths[4].setAttribute('d', arcGen(nodePie[4]));
        break;
      case 'word':
        // Change Rectangle Element
        forceTipDOM.children[0].setAttribute('x', d.cx + shifter);
        forceTipDOM.children[0].setAttribute('y', d.cy + shifter);
        forceTipDOM.children[0].setAttribute('width', 100);

        // Change Text Title
        forceTipDOM.children[1].setAttribute('x', d.cx + 20 + shifter);
        forceTipDOM.children[1].setAttribute('y', d.cy + 30 + shifter);
        forceTipDOM.children[1].innerHTML += '(' + d.characters + ')';
        break;
      case 'experience':
        // Change Rectangle Element
        forceTipDOM.children[0].setAttribute('x', d.cx + shifter);
        forceTipDOM.children[0].setAttribute('y', d.cy + shifter);
        forceTipDOM.children[0].setAttribute('width', 113);

        // Change Text Title
        forceTipDOM.children[1].setAttribute('x', d.cx + 20 + shifter);
        forceTipDOM.children[1].setAttribute('y', d.cy + 30 + shifter);
        break;
      case 'activity':
        // Change Rectangle Element
        forceTipDOM.children[0].setAttribute('x', d.cx + shifter);
        forceTipDOM.children[0].setAttribute('y', d.cy + shifter);
        forceTipDOM.children[0].setAttribute('width', 93);

        // Change Text Title
        forceTipDOM.children[1].setAttribute('x', d.cx + 20 + shifter);
        forceTipDOM.children[1].setAttribute('y', d.cy + 30 + shifter);
        break;
      default:
        break;
    }

  }
  _handleOut(d) {
    var forceTipDOM = ReactDOM.findDOMNode(this).parentElement.parentElement.children[3];

        // Change Rectangle Element
        forceTipDOM.children[0].setAttribute('visibility', 'hidden');

        // Change Text Title
        forceTipDOM.children[1].setAttribute('visibility', 'hidden');

    switch (d.nodeType) {
      case 'log':
        // Change MiniPieChart Element
        forceTipDOM.children[2].setAttribute('visibility', 'hidden');
        break;
      case 'word':

        break;
      case 'experience':

        break;
      case 'activity':

        break;
      default:
        break;
    }

  }

  render () {
    var node = '';
    var nodeColor = '#111';
    if (this.props.privacy) {
      nodeColor = 'white';
    }

    switch (this.props.nodeType) {
      case 'log': //draw a log node

        node = <circle  fill={nodeColor}
                        r={this.props.r + 'px'}
                        cx={this.props.cx}
                        cy={this.props.cy}
                        stroke={nodeColor}
                        style={{strokeWidth: '3px'}}
                        onMouseOver={this._handleOver.bind(this, this.props)}
                        onMouseOut={this._handleOut.bind(this, this.props)}
                        />
        break;
      case 'word': //draw a word node
        node = <circle  fill={this.props.fillColor}
                        r={this.props.r * ('.' + this.props.characters) + 'px'}
                        cx={this.props.cx}
                        cy={this.props.cy}
                        stroke={this.props.stroke}
                        style={{strokeWidth: '3px'}}
                        onMouseOver={this._handleOver.bind(this, this.props)}
                        onMouseOut={this._handleOut.bind(this, this.props)}
                        />
        break;
      case 'experience': //draw a word node
        node = <circle  fill={nodeColor}
                        r={this.props.r + 'px'}
                        cx={this.props.cx}
                        cy={this.props.cy}
                        stroke={nodeColor}
                        style={{strokeWidth: '3px'}}
                        onMouseOver={this._handleOver.bind(this, this.props)}
                        onMouseOut={this._handleOut.bind(this, this.props)}
                        />
        break;
      case 'activity': //draw a word node
        node = <circle  fill={nodeColor}
                        r={this.props.r + 'px'}
                        cx={this.props.cx}
                        cy={this.props.cy}
                        stroke={'red'}
                        style={{strokeWidth: '3px'}}
                        onMouseOver={this._handleOver.bind(this, this.props)}
                        onMouseOut={this._handleOut.bind(this, this.props)}
                        />
        break;
      default:
        break;
    }

    return (
      node
    );
  }
}
