import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { Table } from 'react-bootstrap';

class DashboardForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  handleChange(nextDataset) {
  }

  handleRefreshClick(e) {
    e.preventDefault();
  }

  render () {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h1>Hello world</h1>
        <p>This is a Dashboard?</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" component="input" type="email"/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

// Decorate the form component
DashboardForm = reduxForm({
  form: 'contact' // a unique name for this form
})(DashboardForm);

export default DashboardForm
