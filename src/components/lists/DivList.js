import React from 'react';

import { Alert } from 'react-bootstrap';

export default class DivList extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let fdist = this.props.fdist,
        listItems = [];

    // Handle the Part-of-speech
    function handlePOS(wordTuple) {
      switch (wordTuple[1]) {
        case 'NN':
          return (
            <div style={{color: 'lightgreen'}}>
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
