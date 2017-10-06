import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Alert, Row, Col, ListGroupItem, Button, Well, Table } from 'react-bootstrap';

import NLPMinRankTable from '../tables/NLPMinRankTable';

import { loadNLPAnalysis } from '../../actions/actions';


class NLPListItem extends React.Component {
  constructor (props) {
    super(props);
    this.loadAnalysis = this.loadAnalysis.bind(this);
  }

  loadAnalysis(id) {
    const { dispatch } = this.props;
    console.log(id);
    let data = {
      'analysis_id': id
    }
    dispatch(loadNLPAnalysis(data))
  }

  render () {
    let data = this.props.data

    let array = data.emotion_set.sort(function(a,b) {
                    return b.normalized_r_score - a.normalized_r_score || alphaSortEmotion(a,b);
                });

    function alphaSortEmotion(a, b) {
      if(a.emotion < b.emotion) return -1;
      if(a.emotion > b.emotion) return 1;
      return 0;
    }

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
                    Emotion Set:d
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
            <Col md={6} lg={6}>
              <div style={{
                     display: 'flex',
                     alignItems: 'center',
                     height: '128px'
                   }}>
                <div>
                  <div style={{fontWeight: "900"}}>Document</div>
                  <div>
                    {data.doc}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} lg={12}>
              <div style={{textAlign: "right"}}>
                <Button onClick={()=>{this.loadAnalysis(data._id.$oid)}} style={{width: '200px'}} bsSize="xsmall" href="#/nlp">
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

NLPListItem.propTypes = {
  metadata: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  console.log(state);
  const { dataByDataset } = state;
  const {
    isFetching,
    lastUpdated,
    items: data,
    metadata: metadata
  } = dataByDataset['nlp-analyses'] || {
    isFetching: true,
    items: [],
    metadata: {}
  };

  return {
    metadata,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(NLPListItem);
