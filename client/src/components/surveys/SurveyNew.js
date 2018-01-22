// SurveyNew is to show SurveyForm and SurveyFromReview
import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import SurveyForm from './SurveyForm'
import SurveyFromReview from './SurveyFormReview'

class SurveyNew extends Component {
  // // react classic way to add component state is to add construtor and assigne the value to state
  // constructor(props){
  //   super(props)
  //   this.state = {surveyFormReview: false}
  // }

  // use the state to taggle different form
  // add component state with babel config syntax; 
  state = {showFormReview: false}

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFromReview 
          onCanel={() =>{this.setState({showFormReview: false})}}
        />)
    }

    // to allow SurveyForm to change its state by adding callback
    return (
      <SurveyForm 
        onSurveyFormSubmit={() =>{this.setState({showFormReview: true})}}
      />)
  }

  render() {
    return (
      <div>{this.renderContent()}</div>
    )
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew)