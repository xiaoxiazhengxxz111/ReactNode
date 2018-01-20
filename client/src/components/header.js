import React, { Component } from 'react';
import { connect } from 'react-redux'

class Header extends Component {
  renderContent() {
    switch(this.props.auth){
      case null:
        return ;
      case false:
        return <li><a href="/auth/google">Login with Google</a></li>
      default:
        return <li><a>Login out</a></li>
    }
  }
  render() {
    // console.log("authReducer props", this.props)
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">Emaily</a>
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