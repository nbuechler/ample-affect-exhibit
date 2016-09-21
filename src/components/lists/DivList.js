import React from 'react';

import { Alert } from 'react-bootstrap';

export default class DivList extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let fdist = this.props.fdist,
        listItems = [];
    for (var i = 0; i < fdist.length; i++) {
      listItems.push(
        <div key={'list-item-' + fdist[i]}>
          <span className="pull-left">
            {fdist[i][0]}
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
