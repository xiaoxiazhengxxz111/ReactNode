import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../actions'


import Header from './header'
import Landing from './landing'
import Survays from './survays'
import Dashboard from './dashboard'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return(
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/survays" component={Dashboard} />
            <Route exact path="/survays/new" component={Survays} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, actions)(App);
