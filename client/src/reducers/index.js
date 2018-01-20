import { combineReducers } from 'redux'
import authReducer from './authReducer'

export default combineReducers({
  // list of state properties 
  auth: authReducer
})