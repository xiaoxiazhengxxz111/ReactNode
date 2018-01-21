const mongoose = require('mongoose')
const  { Schema } = mongoose

const userSchema = new Schema({
    googleId: String,
    credits: {type: Number, default: 0}
})

// use mongoose's model function to call userschema to create users collection
mongoose.model('users', userSchema)