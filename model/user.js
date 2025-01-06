let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userdata = new Schema({
    firstName: {
        type: String,
        required: [true,"Please Enter your First Name"],
        trim: true
    },
    userName: {
        type: String,
        required: [true,"Please Enter Your Name "],
        trim: true
    },
    lastName: {
        type: String,
        required: [true,"Please Enter your Last Name"],
        trim: true
    },
    email: {
        type: String,
        required: [true,"Please Enter Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Please Enater Passsword'],
        trim : true
    },
    profile: [String]
})

let USER = mongoose.model('userLogin',userdata)

module.exports = USER