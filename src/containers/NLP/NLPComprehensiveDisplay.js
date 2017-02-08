import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { Table, Button, Row, Col, Panel, Accordion } from 'react-bootstrap';

import NLPComprehensiveForm from '../../components/forms/NLPComprehensiveForm'
import NLPComprehensiveTable from '../../components/tables/NLPComprehensiveTable'
import NLPRankTable from '../../components/tables/NLPRankTable'
import NLPLaggerTable from '../../components/tables/NLPLaggerTable'

import NLPNLTKPOSTable from '../../components/tables/NLPNLTKPOSTable'

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
          <h1><i className="fa fa-tint" aria-hidden="true"></i>  Precise Processing</h1>

          {/* These panels get fixed around the edge of the screen */}
          <div className="transparent--module transparent--module_alt-01 transparent--module_module-3">
            <div className="transparent--module_module-content">
              <NLPNLTKPOSTable/>
            </div>
            <div className="transparent--module_module-icon">
              <i className="fa fa-2x fa-key" aria-hidden="true"></i>
            </div>
          </div>
          <div className="transparent--module transparent--module_alt-01 transparent--module_form--nlp">
            <div className="transparent--module_module-icon">
              <i className="fa fa-2x fa-list-alt" aria-hidden="true"></i>
            </div>
            <div className="transparent--module_module-content">
              <NLPComprehensiveForm/>
            </div>
          </div>
          <div className="transparent--module transparent--module_alt-01 transparent--module_module-1">
            <div className="transparent--module_module-content">
              <NLPRankTable/>
            </div>
            <div className="transparent--module_module-icon">
              <i className="fa fa-2x fa-table" aria-hidden="true"></i>
            </div>
          </div>
          <div className="transparent--module transparent--module_alt-01 transparent--module_module-2">
            <div className="transparent--module_module-content">
              <NLPLaggerTable/>
            </div>
            <div className="transparent--module_module-icon">
              <i className="fa fa-2x fa-table" aria-hidden="true"></i>
            </div>
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
