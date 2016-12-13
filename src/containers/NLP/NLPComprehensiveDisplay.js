import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { Table, Button, Row, Col, Panel, Accordion } from 'react-bootstrap';

import NLPComprehensiveForm from '../../components/forms/NLPComprehensiveForm'
import NLPComprehensiveTable from '../../components/tables/NLPComprehensiveTable'
import NLPRankTable from '../../components/tables/NLPRankTable'
import NLPLaggerTable from '../../components/tables/NLPLaggerTable'

class NLPDisplay extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  handleRefreshClick(e) {
    e.preventDefault();
  }

  render () {
    const { } = this.props;

    return (
      <div>
        <a href="#/dashboard"><Button bsStyle="success" className="pull-right">Back</Button></a>
        <div style={{paddingBottom: '100px'}}>
          <h1><i className="fa fa-language" aria-hidden="true"></i>  Natural Language Processing</h1>

          {/* These panels get fixed around the edge of the screen */}
          <div className="transparent--module transparent--module_alt-01 form--nlp">
            <NLPComprehensiveForm/>
          </div>
          <div className="transparent--module transparent--module_alt-01 transparent--module_module-1">
            <NLPRankTable/>
          </div>
          <div className="transparent--module transparent--module_alt-01 transparent--module_module-2">
            <NLPLaggerTable/>
          </div>

          <Row>
            <Col lg={12}>
              <div>
                <NLPComprehensiveTable/>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

NLPDisplay.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { } = state;

  return {
  };
}

export default connect(mapStateToProps)(NLPDisplay);
