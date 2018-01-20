import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Header from './header'
import Landing from './landing'
import Survays from './survays'
import Dashboard from './dashboard'

const App = () => {
  return(
    <div className="container">
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/survays/new" component={Survays} />
          <Route exact path="/dashboard" component={Dashboard} />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App