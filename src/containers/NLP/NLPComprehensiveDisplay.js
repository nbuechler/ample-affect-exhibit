import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { Table, Button, Row, Col, Panel, Accordion } from 'react-bootstrap';

import NLPComprehensiveForm from '../../components/forms/NLPComprehensiveForm'
import NLPTable from '../../components/tables/NLPTable'
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
        <a href="#/dashboard"><Button className="pull-right">Back</Button></a>
        <div style={{paddingBottom: '100px'}}>
          <h1>Natural Language Processing</h1>
          <hr></hr>

          {/* These panels get fixed around the edge of the screen */}
          <Panel className="transparent--module form--nlp">
            <NLPComprehensiveForm/>
          </Panel>
          <Panel className="transparent--module transparent--module_module-1">
            <NLPRankTable/>
          </Panel>
          <Panel className="transparent--module transparent--module_module-2">
            <NLPLaggerTable/>
          </Panel>

          <Row>
            <Col lg={12}>
              <Panel>
                <NLPTable/>
              </Panel>
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
