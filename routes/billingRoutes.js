const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey )
// const requiredLogin = require('../middlewares/requiredLogin')
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  //after stripe form infor sent to stripe api ,it return a token as a charge
  // we post the token to our api 
  // verify if user logged in 
  // create a charge
  // update and save the charge to userModel
  // send the update user back to client
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // console.log('req.body', req.body)
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      source: req.body.id, 
      description: "$5 for 5 credits"
    })
    // console.log(charge)
    // console.log('req.user', req.user)    // passport property
    req.user.credits += 5
    const user = await req.user.save()
    res.send(user)
  })
}
