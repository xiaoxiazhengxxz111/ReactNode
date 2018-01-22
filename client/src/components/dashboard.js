import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Dashboard extends Component {


  render() {
    return (
      <div>
        <h1>Dashboard page</h1>
          <div className="fixed-action-btn">
            <Link to="/surveys/new"className="btn-floating btn-large red">
              <i className="material-icons">add</i>
            </Link>
          </div>
      </div>
    )
  }
}

export default Dashboard