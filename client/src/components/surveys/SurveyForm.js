// SurveyForm shows a form for a user to add input
import _ from 'lodash'
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import {Link} from 'react-router-dom'
import SurveyField from './SurveyField'

const FIELDS = [
  {label: 'Survey Title', name: 'title'},
  {label: 'Survey Line', name: 'Line'},
  {label: 'Email Body', name: 'email'},
  {label: 'Recipients List', name: 'emails'},
]

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({label, name}) => {
      return (
        <Field key={name} label={label} type="text" name={name} component={SurveyField}/>
      )
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => {console.log(values)})}>
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

// reduxForm(==connect) is a helper from redux-form
export default reduxForm({
  form: 'surveyForm'
})(SurveyForm)