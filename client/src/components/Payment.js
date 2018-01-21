import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout'
import {connect} from 'react-redux'
import * as actions from '../actions'

class Payment extends Component {
  
  render() {
    // debugger;
    return (
      <StripeCheckout 
        name="Emaily"
        description="$5 for 5 credits"
        amount={500}
        token={token => this.props.handleStripeToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_PUB_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    )
  }
}

export default connect(null, actions)(Payment)