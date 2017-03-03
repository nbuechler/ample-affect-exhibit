import React from 'react';

import { Alert, Col, ListGroupItem, Button, Well, Table } from 'react-bootstrap';

export default class NLPListItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let data = this.props.data

    let array = this.props.data.emotion_set.sort(function(a,b) {
                    return b.normalized_r_score - a.normalized_r_score;
                });

    return (
      <ListGroupItem>
        <div style={{fontSize: "12px"}}>
          <div className="pull-left">
            <div>
              Emotion Set: {data.name}
            </div>
            <Table style={{fontSize: '12px', margin: 'auto', textAlign: 'center'}} condensed>
              <tbody>
                <tr>
                  <td>
                    <div className="affect--display_name">
                        {array[0].emotion}
                    </div>
                  </td>
                  <td>
                    <div className="affect--display_rank">
                        1
                    </div>
                  </td>
                  <td>
                    <div className="affect--display_scores">
                        {array[0].normalized_r_score.toFixed(4)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="affect--display_name">
                        {array[1].emotion}
                    </div>
                  </td>
                  <td>
                    <div className="affect--display_rank">
                        2
                    </div>
                  </td>
                  <td>
                    <div className="affect--display_scores">
                        {array[1].normalized_r_score.toFixed(4)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="affect--display_name">
                        {array[2].emotion}
                    </div>
                  </td>
                  <td>
                    <div className="affect--display_rank">
                        3
                    </div>
                  </td>
                  <td>
                    <div className="affect--display_scores">
                        {array[2].normalized_r_score.toFixed(4)}
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>

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
