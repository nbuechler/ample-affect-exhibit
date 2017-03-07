import React from 'react';

import { Alert, Row, Col, ListGroupItem, Button, Well, Table } from 'react-bootstrap';

import NLPMinRankTable from '../tables/NLPMinRankTable';

import { fetchDataIfNeeded } from '../../actions/actions';

export default class NLPListItem extends React.Component {
  constructor (props) {
    super(props);
    this.fetchResults = this.fetchResults.bind(this);
  }

  fetchResults(resultID) {
    console.log(resultID);
    // fetchDataIfNeeded('nlp-analyses', '5000');
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
          <Row style={{paddingBottom: "10px"}}>
            <Col md={6} lg={6}>
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
            </Col>
            <Col md={6} lg={6}>
              <div className="pull-right">
                <div>
                  Date: {data.date[0]}
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={3} lg={3}>
              <div className="opaque--module opaque--module_alt-01">
                <NLPMinRankTable data={array}/>
              </div>
            </Col>
            <Col md={9} lg={9}>
              <div style={{fontWeight: "900"}}>Document</div>
              <div>
                <div>
                  {data.doc}
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} lg={12}>
              <div style={{textAlign: "right"}}>
                <Button onClick={()=>{this.fetchResults(data._id.$oid)}} style={{width: '200px'}} bsSize="xsmall" href="#/nlp">
                  <i className="fa fa-leaf" aria-hidden="true"></i> See results
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </ListGroupItem>
    );

  }

}
