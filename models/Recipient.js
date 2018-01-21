const mongoose = require('mongoose')
const  { Schema } = mongoose

const recipientSchema = new Schema({
    email: String,
    responde: {type: Boolean, default:false}
})

// as subDoc
module.exports = recipientSchema