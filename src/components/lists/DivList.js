import React from 'react';

import { Alert } from 'react-bootstrap';

export default class DivList extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let fdist = this.props.fdist,
        listItems = [];

    let nounColor = 'lightgreen',
        adjColor = 'lightblue',
        verbColor = 'lightcoral';

    // Handle the Part-of-speech
    function handlePOS(wordTuple) {
      switch (wordTuple[1]) {
        case 'NN': //Nouns
          return (
            <div style={{color: nounColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'NNP': //Nouns
          return (
            <div style={{color: nounColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'NNS': //Nouns
          return (
            <div style={{color: nounColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'JJ': //Adjectives
          return (
            <div style={{color: adjColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'JJR': //Adjectives
          return (
            <div style={{color: adjColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'JJS': //Adjectives
          return (
            <div style={{color: adjColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'RB': //Adjectives
          return (
            <div style={{color: adjColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'RBR': //Adjectives
          return (
            <div style={{color: adjColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'RBS': //Adjectives
          return (
            <div style={{color: adjColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'MD': //Verbs
          return (
            <div style={{color: verbColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'VB': //Verbs
          return (
            <div style={{color: verbColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'VBD': //Verbs
          return (
            <div style={{color: verbColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'VBG': //Verbs
          return (
            <div style={{color: verbColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'VBN': //Verbs
          return (
            <div style={{color: verbColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'VBP': //Verbs
          return (
            <div style={{color: verbColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'VBZ': //Verbs
          return (
            <div style={{color: verbColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        default:
          return wordTuple[0] + ' (' + wordTuple[1] + ')'
      }
    }

    function test() {
      return 'helloworld'
    }

    for (var i = 0; i < fdist.length; i++) {
      listItems.push(
        <div key={'list-item-' + fdist[i]}>
          <span className="pull-left">
            {handlePOS(fdist[i][0])}
          </span>
          <span className="pull-right">
            {fdist[i][1]}
          </span>
          <br></br>
        </div>
      )
    }
    if (listItems.length < 1) {
      listItems.push(
        <div key={'list-item-' + fdist[i]}>
          <span>
            None
          </span>
          <br></br>
        </div>
      )
    }
    return (
      <div>
        {listItems}
      </div>
    );

  }

}
