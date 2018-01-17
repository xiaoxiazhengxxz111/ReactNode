const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
require('./models/users')
require('./services/passport')

mongoose.connect(keys.mongodbURI)

const app = express()



// Middleware
app.use(cookieSession({
    maxAge: 5*60*60*1000,
    keys: [keys.cookieSessionKey] // to encrypt the cookie
}))
app.use(passport.initialize())
app.use(passport.session()) // tell cookie to manager auth

require('./routes/authRoutes')(app)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {console.log('listen to port 5000...')})