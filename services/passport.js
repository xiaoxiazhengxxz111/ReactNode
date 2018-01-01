const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accesToken, refreshToken, profile, done) => {
    console.log('accesToken',accesToken)
    console.log('refresh Token', refreshToken)
    console.log('profile', profile)
}))