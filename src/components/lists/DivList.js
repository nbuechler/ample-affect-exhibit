import React from 'react';

import { Alert } from 'react-bootstrap';

export default class DivList extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let fdist = this.props.fdist,
        listItems = [];
    if (true) {
      for (var i = 0; i < fdist.length; i++) {
        listItems.push(
          <h6 key={'list-item-' + fdist[i]}>
            <span className="pull-left">
              {fdist[i][0]}
            </span>
            <span className="pull-right">
              {fdist[i][1]}
            </span>
            <br></br>
          </h6>
        )
      }
    }
    if (listItems.length < 1) {
      listItems.push(
        <h6 key={'list-item-' + fdist[i]}>
          <span>
            None
          </span>
          <br></br>
        </h6>
      )
    }
    return (
      <Alert bsStyle="warning">
        {listItems}
      </Alert>
    );

  }

}
