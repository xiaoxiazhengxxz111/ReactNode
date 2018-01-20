import 'materialize-css/dist/css/materialize.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import App from './components/App'
import reducers from './reducers'


const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(
  // provider has store attribut, when store update, it will informe all its children component app to update and rerender
  <Provider store={store}><App /></Provider>, 
  document.querySelector('#root')
)