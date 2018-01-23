import { combineReducers } from 'redux'
import authReducer from './authReducer'
import { reducer as reduxForm} from 'redux-form'
import surveysReducer from './surveysReducer'

export default combineReducers({
  // list of state properties 
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer
})