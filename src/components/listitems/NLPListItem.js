import React from 'react';

import { Alert, Col, ListGroupItem, Button, Well, Table } from 'react-bootstrap';

import NLPMinRankTable from '../tables/NLPMinRankTable';

export default class NLPListItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let data = this.props.data

    let array = this.props.data.emotion_set.sort(function(a,b) {
                    return b.normalized_r_score - a.normalized_r_score;
                });

    function titleCase(str) {
       let strList = str.toLowerCase().split('_');

       for(var i = 0; i < strList.length; i++){
           switch (strList[i]) {
             case 'fsre':
               strList[i] = strList[i].toUpperCase();
               break;
             case 'occ':
               strList[i] = strList[i].toUpperCase();
               break;
             case 'ml':
               strList[i] = 'Markup Language';
               break;
             default:
               strList[i] = strList[i].split('');
               strList[i][0] = strList[i][0].toUpperCase();
               strList[i] = strList[i].join('');
           }
       }
       return strList.join(' ');
    }

    return (
      <ListGroupItem>
        <div style={{fontSize: "12px"}}>
          <div className="pull-left">
            <div style={{display: "inline-flex"}}>
              <div style={{margin: "4px 4px 4px 0px"}}>
              Emotion Set:
              </div>
              <div className="affect--display_corpus-set_name">
                {titleCase(data.name)}
              </div>
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
            <Alert>
              {data.doc}
            </Alert>
          </div>
        </div>
        <div>
          <NLPMinRankTable data={array}/>
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
