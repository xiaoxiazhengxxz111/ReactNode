import 'materialize-css/dist/css/materialize.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import App from './components/App'

const store = createStore(() => [], {}, applyMiddleware())

ReactDOM.render(
  // provider has store attribut, when store update, it will informe all its children component app to update and rerender
  <Provider store={store}><App /></Provider>, 
  document.querySelector('#root')
)