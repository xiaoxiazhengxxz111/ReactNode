// libries
const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
const bodyParser = require('body-parser')

// models
require('./models/users')
require('./models/Survey')
require('./services/passport')

// DB set up
mongoose.connect(keys.mongodbURI)

const app = express()

// App leverl Middleware: 
// to handler all incoming requests before forward to router handler
app.use(bodyParser.json()) // parser all kinds of incoming requests and assigne to req.body properties
app.use(cookieSession({
    maxAge: 5*60*60*1000,
    keys: [keys.cookieSessionKey] // to encrypt the cookie
}))
app.use(passport.initialize())
app.use(passport.session()) // tell cookie to manager auth

// route handlers
require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)
require('./routes/surveyRoutes')(app)

// environment variables
// heroku: for the production: to handle some routes the express server doesn't know
if( process.env.NODE_ENV === 'production') {
  // epxress will serve up production assets
  // like main.js file or main.css file
  app.use(express.static('client/build'))

  // express will serve up the index.html file if it doesn't recognize the route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {console.log('listen to port 5000...')})