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
  // console.log('fetchUser res', res) 
  dispatch({type: FETCH_USER, payload: res.data})
}

// the token come back from stripe api after submit credit cart details form for the user
// post this token to our backend api, our server will update userModel accordly and send back to client
export const handleStripeToken = (token) => async dispatch => {
  // console.log('token', token)
  const res = await axios.post('/api/stripe', token)  
  // console.log('handleStripeToken res', res)
  dispatch({type: FETCH_USER, payload: res.data})
}