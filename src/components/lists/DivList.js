import React from 'react';

import { Alert } from 'react-bootstrap';

export default class DivList extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let fdist = this.props.fdist,
        limit = this.props.limitList || false,
        listItems = [];

    let reversed_fdist = []
        for (var i = 0; i < fdist.length; i++) {
          reversed_fdist.unshift(fdist[i])
        }

    let prepColor = 'palegoldenrod',
        nounColor = 'lightgreen',
        adjColor = 'lightblue',
        verbColor = 'lightcoral',
        numColor = 'goldenrod',
        foreColor = 'lightslategrey';


    // Handle the Part-of-speech
    function handlePOS(wordTuple) {
      switch (wordTuple[1]) {
        case 'IN': //Preposition
          return (
            <div className='affect--display_word-result' style={{color: prepColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'RP': //Particle
          return (
            <div className='affect--display_word-result' style={{color: prepColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'PRP': //Nouns
          return (
            <div className='affect--display_word-result' style={{color: nounColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'NN': //Nouns
          return (
            <div className='affect--display_word-result' style={{color: nounColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'NNP': //Nouns
          return (
            <div className='affect--display_word-result' style={{color: nounColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'NNS': //Nouns
          return (
            <div className='affect--display_word-result' style={{color: nounColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'JJ': //Adjectives
          return (
            <div className='affect--display_word-result' style={{color: adjColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'JJR': //Adjectives
          return (
            <div className='affect--display_word-result' style={{color: adjColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'JJS': //Adjectives
          return (
            <div className='affect--display_word-result' style={{color: adjColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'RB': //Adjectives
          return (
            <div className='affect--display_word-result' style={{color: adjColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'RBR': //Adjectives
          return (
            <div className='affect--display_word-result' style={{color: adjColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'RBS': //Adjectives
          return (
            <div className='affect--display_word-result' style={{color: adjColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'MD': //Verbs
          return (
            <div className='affect--display_word-result' style={{color: verbColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'VB': //Verbs
          return (
            <div className='affect--display_word-result' style={{color: verbColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'VBD': //Verbs
          return (
            <div className='affect--display_word-result' style={{color: verbColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'VBG': //Verbs
          return (
            <div className='affect--display_word-result' style={{color: verbColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'VBN': //Verbs
          return (
            <div className='affect--display_word-result' style={{color: verbColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'VBP': //Verbs
          return (
            <div className='affect--display_word-result' style={{color: verbColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'VBZ': //Verbs
          return (
            <div className='affect--display_word-result' style={{color: verbColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'CD': //Number
          return (
            <div className='affect--display_word-result' style={{color: numColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        case 'FW': //Foreign word
          return (
            <div className='affect--display_word-result' style={{color: foreColor}}>
              {wordTuple[0] + ' (' + wordTuple[1] + ')'}
            </div>
            )
          break;
        default:
          return wordTuple[0] + ' (' + wordTuple[1] + ')'
      }
    }

    let targetFrequencyDist = reversed_fdist;
    for (var i = 0; i < targetFrequencyDist.length; i++) {
      if (i < 5) {
        if (limit == '1') {
          listItems.push(
            <div key={'list-item-' + targetFrequencyDist[i]}>
              <span className="pull-left">
                {handlePOS(targetFrequencyDist[i][0])}
              </span>
              <span className="pull-right">
                {targetFrequencyDist[i][1]}
              </span>
              <br></br>
            </div>
          )
        } else {
          listItems.push(
            <div key={'list-item-' + targetFrequencyDist[i]}>
              <span className="pull-left">
                {handlePOS(targetFrequencyDist[i][0])}
              </span>
              <span className="pull-right">
                {targetFrequencyDist[i][1]}
              </span>
              <br></br>
            </div>
          )
        }
      }
    }
    if (listItems.length < 1) {
      listItems.push(
        <div style={{textAlign: 'center', color: '#888'}} key={'list-item-' + targetFrequencyDist[i]}>
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
