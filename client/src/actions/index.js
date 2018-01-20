// import axios from 'axios'
// import {FETCH_USER} from './types'

// export const fetchUser = () => {
//   // when the data come back, redux-thunk dispatch the action with payload vlue
//   return function(dispatch) {
//     axios.get('/api/currentuser')
//       .then(res => dispatch({type: FETCH_USER, payload: res}))
//   }  
// }

import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => {
  return function(dispatch) {
    axios
      .get('/api/currentuser')
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};