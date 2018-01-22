// SurveyForm shows a form for a user to add input
import _ from 'lodash'
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import {Link} from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmail from '../../utils/validateEmail'
import formFields from './formFields'


class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({label, name}) => {
      return (
        <Field key={name} label={label} type="text" name={name} component={SurveyField}/>
      )
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveyFormSubmit)}>
          {/* <Field type="text" name="title" component="input" /> */}
          {/* <Field label="Survey Title" type="text" name="title" component={SurveyField}/>
          <Field label="Survey Line" type="text" name="Line" component={SurveyField}/>
          <Field label="Email Body" type="text" name="email" component={SurveyField}/>
          <Field label="Recipients List" type="text" name="emails" component={SurveyField}/> */}
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat left white-text">Cancel</Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  // if (!values.title){
  //   errors.title = 'You must provide a title'
  // }
  // if (!values.subject){
  //   errors.subject = 'You must provide a subject'
  // }
  // if (!values.body){
  //   errors.body = 'You must provide a body'
  // }

  errors.recipients = validateEmail(values.recipients || '')
  _.each(formFields, ({name}) => {
    // value[name]: the value, value.name: the property
    if (!values[name]) {
      errors[name] = 'You must provide a value'
    }
  })
  return errors;
}

// helper from redux-form
export default reduxForm({
  validate,
  form: 'surveyForm', // another sub form under store state.form
  destroyOnUnmount: false
})(SurveyForm)