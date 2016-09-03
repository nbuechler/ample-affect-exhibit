import React, { Component, PropTypes } from 'react';

import { Grid, Row, Col, Panel } from 'react-bootstrap';

export default class Picker extends Component {
  render () {
    const { value, onChange, options } = this.props;

    const title = (
      <h3>Description</h3>
    );

    return (
      <Grid>
        <Row>
          <Col xs={12} sm={12} md={6}>
            <h1 className='alert alert-success' style={{textAlign: 'center'}}>
              {this.props.title}
            </h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} className='pull-left'>
            <div>
              <Panel header={title}>
                <p>{this.props.descriptionPrimary}</p>
                <p>{this.props.descriptionSecondary}</p>
              </Panel>
            </div>
          </Col>
          <Col xs={12} sm={12} md={4} className='pull-right'>
              <label>Change Display</label>
              <select onChange={e => onChange(e.target.value)}
                      value={value}
                      className='form-control'
                      style={{minWidth: '300px', background: '#111', border: 'white solid 1px'}}>
                {options.map(option =>
                  <option value={this.props.apiOptions[option]} key={this.props.apiOptions[option]}>
                    {this.props.displayOptions[option]}
                  </option>)
                }
              </select>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
