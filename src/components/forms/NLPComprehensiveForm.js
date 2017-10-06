import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { Button, Row, Col} from 'react-bootstrap';

import submit from './submit'

const NLPComprehensiveForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Row>
        <Col lg={12}>
          <label>Language <span style={{color: 'gray'}}>(only English for now)</span></label><br></br>
          <div>
            {/* TODO: Get the options via a call to the server!*/}
            <Field className="form-control" name="lang"
              component="select" required>
              <option value="english">English</option>
            </Field>
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
                <option value="everday_categories">Everyday Categories</option>
                <option value="occ_categories">OCC Categories</option>
                <option value="fsre_categories">FSRE Categories</option>
                <option value="frijda_categories">Frijda Categories</option>
                <option value="dimensions">Dimensions</option>
              </Field>
            </div>
          </div>
          <br></br>
          <div>
            <label>Document</label><br></br>
            <Field className="form-control" style={{width: "100%"}} rows="4" name="doc"
              component="textarea" type="text" placeholder="Write something!"
              id="analyze-form_text-area" required/>
          </div>
          <div style={{margin: "10px 0px", padding: "10px 10px", background: "#454545"}}>
            <div>
              Constrain the affect words to use from the corpora.
              <br></br>
              <h6 style={{color: "#AAA"}}>
                (Setting both bounds to 25 will use the middle 50 percent of the affect words.)
              </h6>
            </div>
            <label>Upper Bound</label>
            <div>
              <Field className="form-control" style={{width: "100%"}} name="ub"
                component="input" type="number" placeholder="0-100" min="0" max="100"
                required/>
            </div>
            <br></br>
            <label>Lower Bound</label>
            <div>
              <Field className="form-control" style={{width: "100%"}} name="lb"
                component="input" type="number" placeholder="0-100" min="0" max="100"
                required/>
            </div>
            <br></br>
            <div>
              Constrain the how the document is scored.
              <br></br>
              <h6 style={{color: "#AAA"}}>
                (Stemming and lammatizing words will score based on the alteration of the root word.)
              </h6>
            </div>
            <Row style={{textAlign: 'center'}}>
              <Col md={4} lg={4}>
                <label>Unprocessed</label>
                <div style={{textAlign: 'left'}}>
                  <label><Field name="natural" component="input" type="radio" value="1" required/> Included</label>
                  <br></br>
                  <label><Field name="natural" component="input" type="radio" value="0"/> Excluded</label>
                </div>
              </Col>
              <Col md={4} lg={4}>
                <label>Stemmed</label>
                <div style={{textAlign: 'left'}}>
                  <label><Field name="stemmer" component="input" type="radio" value="1" required/> Included</label>
                  <br></br>
                  <label><Field name="stemmer" component="input" type="radio" value="0"/> Excluded</label>
                </div>
              </Col>
              <Col md={4} lg={4}>
                <label>Lemmatized</label>
                <div style={{textAlign: 'left'}}>
                  <label><Field name="lemma" component="input" type="radio" value="1" required/> Included</label>
                  <br></br>
                  <label><Field name="lemma" component="input" type="radio" value="0"/> Excluded</label>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Button bsSize="xsmall" className="pull-left" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
      <Button bsSize="xsmall" className="pull-right" disabled={pristine || submitting} type="submit">Start Analysis</Button>
    </form>
  );
}

// Decorate the form component
export default reduxForm({
  form: 'nlp' // a unique name for this form
})(NLPComprehensiveForm);
