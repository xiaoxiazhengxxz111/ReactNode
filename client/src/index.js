import 'materialize-css/dist/css/materialize.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import App from './components/App'
import reducers from './reducers'

// for development test only
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(
  // provider has store attribut, when store update, it will informe all its children component app to update and rerender
  <Provider store={store}><App /></Provider>, 
  document.querySelector('#root')
)

// console.log('stripe key is', process.env.REACT_APP_STRIPE_PUB_KEY)
// console.log('environment is', process.env.NODE_ENV)