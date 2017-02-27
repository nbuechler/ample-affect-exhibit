import React from 'react';

import { Alert, Col, ListGroupItem, Button } from 'react-bootstrap';

export default class NLPListItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let data = this.props.data
    return (
      <ListGroupItem>
        <div>
          {data.doc}
        </div>
        <div>
          {data.name}
        </div>
        <div>
          {data.date[0]}
        </div>
        <div style={{textAlign: "right"}}>
          <Button style={{width: '200px'}} bsSize="xsmall" href="#/nlp">
            <i className="fa fa-leaf" aria-hidden="true"></i> See results
          </Button>
        </div>
      </ListGroupItem>
    );

  }

}
