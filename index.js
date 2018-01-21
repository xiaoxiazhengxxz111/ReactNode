const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
const bodyParser = require('body-parser')
require('./models/users')
require('./services/passport')

mongoose.connect(keys.mongodbURI)

const app = express()

// App leverl Middleware: to handler all incoming requests before forward to router handler
app.use(bodyParser.json()) // parser all kinds of incoming requests and assigne to req.body properties
app.use(cookieSession({
    maxAge: 5*60*60*1000,
    keys: [keys.cookieSessionKey] // to encrypt the cookie
}))
app.use(passport.initialize())
app.use(passport.session()) // tell cookie to manager auth

require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {console.log('listen to port 5000...')})