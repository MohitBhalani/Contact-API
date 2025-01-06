let mongoose = require('mongoose')
let Schema = mongoose.Schema

let admindata = new Schema({
  email: {
    type: String,
    required: [true,"Please Enter Email"],
    unique: true
  },  
  password: {
    type: String,
    required: [true,"Please Enater Password"]
  }
})

let ADMIN = mongoose.model('Adminlogin',admindata)

module.exports = ADMIN







































