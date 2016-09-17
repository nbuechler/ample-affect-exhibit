import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import { Button } from 'react-bootstrap';

import submit from './submit'

const NLPForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props

  return (
    <form style={{backgorund: "gray"}}
          onSubmit={handleSubmit(submit)}>
      <div>
        <label>Document</label><br></br>
        <Field className="form-control" style={{width: "100%"}} rows="4" name="doc"
          component="textarea" type="text" placeholder="Write something!" required/>
      </div>
      <br></br>
      <div>
        <label>Language</label><br></br>
        <Field className="form-control" name="lang"
          component="input" type="text" placeholder="Choose a language... (i.e. english)" required/>
      </div>
      <br></br>
      <div>
        <label>Emotion Set</label>
        <div>
          {/* TODO: Get the options via a call to the server!*/}
          <Field className="form-control" name="emotion_set"
            component="select" required>
            <option value="all_emotions">All Affects</option>
            <option value="emotion_ml">Emotion Markup Language</option>
            <option value="big_6">Big 6</option>
          </Field>
        </div>
      </div>
      <hr></hr>
      <Button className="pull-left" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
      <Button className="pull-right" disabled={pristine || submitting} type="submit">Submit</Button>
    </form>
  );
}

// Decorate the form component
export default reduxForm({
  form: 'nlp' // a unique name for this form
})(NLPForm);
