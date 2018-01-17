const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')
const mongoose = require('mongoose')

const User = mongoose.model('users') // to instancier User obj so that call model built-in functions

passport.serializeUser((user, done) => {
    done(null, user.id) //get userId from user obj to store in session
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user)) //id is used to find the user, which will be store in req.user
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accesToken, refreshToken, profile, done) => {
    User.findOne({googleId:profile.id})
    .then((userExsited) => {
        if (userExsited){
            done(null, userExsited) // all fine and here is userExsited
        } else {
            new User({googleId: profile.id})
              .save()
              .then( newUser => done(null, newUser))
        } 
    })    
}))