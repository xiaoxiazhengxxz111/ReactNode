import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import _ from 'lodash'
import formFields from './formFields'
import * as actions from '../../actions'

// properties
const SurveyFromReview = ({onCanel, formValues, submitSurvey, history}) => { 
  const renderReviewFields = _.map(formFields, ({label, name}) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    )
  })

  return (
    <div>
      <h2>SurveyFromReview</h2>
      {renderReviewFields}
      <button className="yellow darken-3 btn-flat white-text" onClick={onCanel}>
        Back
      </button>
      {/* to delay the action creator execute immidiately when the fomr is rendered, wrap it a arraw function */}
      <button className="green right btn-flat white-text" onClick={() => submitSurvey(formValues, history)}>
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  )
}

function mapStatToProps(state) {
  // console.log(state)
  // the return values/obj showup in SurveyFromReview component as a props
  return {formValues: state.form.surveyForm.values};
}

export default connect(mapStatToProps, actions)(withRouter(SurveyFromReview))