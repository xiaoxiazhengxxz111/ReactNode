import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Header extends Component {
  renderContent() {
    switch(this.props.auth){
      case null:
        return ;
      case false:
        return <li><a href="/auth/google">Login with Google</a></li>
      default:
        return <li><a href="/api/logout">Login out</a></li>
    }
  }
  render() {
    // console.log("authReducer props", this.props)
    return (
      <nav>
        <div className="nav-wrapper">
          <Link 
            to={this.props.auth? "/survays": "/"}
            className="left brand-logo"
          >Emaily
          </Link>
          <ul className="right">
            {/* <li><a>Login with Google</a></li> */}
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps({auth}) {
  return {auth}
}

export default connect(mapStateToProps)(Header)