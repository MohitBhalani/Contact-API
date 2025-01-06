let mongoose = require('mongoose')
let Schema = mongoose.Schema

let contactData = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter User Name"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Email"],
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: [true, "Please Enter Phone Number"],
        unique: true,
        trim: true
    },
    address: {
        type: String,
        required: [true, "Please Enter Address"]
    },
    userId : { type: mongoose.Schema.Types.ObjectId, ref : 'userLogin' }
})

let CONTACT = mongoose.model("Contact", contactData)

module.exports = CONTACT