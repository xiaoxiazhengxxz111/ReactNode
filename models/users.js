const mongoose = require('mongoose')
const  { Schema } = mongoose

const userSchema = new Schema({
    googleId: String
})

// use mongoose's model function to call userschema to create users collection
mongoose.model('users', userSchema)