import React from 'react';

import { Alert, Col, ListGroupItem, Button, Well } from 'react-bootstrap';

export default class NLPListItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let data = this.props.data
    return (
      <ListGroupItem>
        <div style={{fontSize: "12px"}}>
          <div className="pull-left">
            <div>
              Emotion Set: {data.name}
            </div>
          </div>
          <div className="pull-right">
            <div>
              Date: {data.date[0]}
            </div>
          </div>
          <br></br>
          <br></br>
          <div>
            <div style={{fontWeight: "900"}}>Document</div>
            <Well>
              {data.doc}
            </Well>
          </div>
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
