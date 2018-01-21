import axios from 'axios'
import {FETCH_USER} from './types'

// export const fetchUser = () => {
//   // when the data come back, redux-thunk dispatch the action with payload vlue
//   return function(dispatch) {
//     axios
//       .get('/api/currentuser')
//       .then(res => dispatch({type: FETCH_USER, payload: res}))
//   }  
// }

// use redux-thunk: when the request is completed, dispatch the action with data come back from req
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/currentuser')  
  dispatch({type: FETCH_USER, payload: res.data})
}

export const handleStripeToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token)  
  dispatch({type: FETCH_USER, payload: res.data})
}