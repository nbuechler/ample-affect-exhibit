import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import { Button } from 'react-bootstrap';

class NLPForm extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { handleSubmit } = this.props;


    // TODO: Do this: http://redux-form.com/6.0.2/examples/submitValidation/
    function submit(values) {
      console.log('values');
      console.log(values);
    }


    return (
      <form style={{backgorund: "gray"}}
            onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="doc">Document</label><br></br>
          <Field className="form-control" style={{width: "100%"}} rows="4" name="doc" component="textarea" type="text"/>
        </div>
        <br></br>
        <div>
          <label htmlFor="lang">Language</label><br></br>
          <Field className="form-control" name="lang" component="input" type="text" value="english"/>
        </div>
        <hr></hr>
        <Button type="submit">Submit</Button>
      </form>
    );
  }
}

// Decorate the form component
NLPForm = reduxForm({
  form: 'nlp' // a unique name for this form
})(NLPForm);

export default NLPForm
