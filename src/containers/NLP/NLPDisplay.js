import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { Table, Button, Row, Col, Panel } from 'react-bootstrap';

import NLPForm from '../../components/forms/NLPForm'
import NLPTable from '../../components/tables/NLPTable'

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
          <Row>
            <Col lg={6} lgOffset={3}>
              <Panel>
                <NLPForm/>
              </Panel>
            </Col>
          </Row>
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
