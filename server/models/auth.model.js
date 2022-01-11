const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    _id: { type: String },
    first_name: { type: String, min: 3, max: 255, trim: true },
    last_name: { type: String, min: 3, max: 255, trim: true },
    email: { type: String, min: 6, max: 255, trim: true },
    password: { type: String, min: 10, max: 1500, trim: true },
    verifyPassword: { type: String, min: 10, max: 1500, trim: true, },
    country: { type: String, min: 3, max: 255, trim: true },
    date: { type: Date, default: Date.now },
    role:{type: Number, default:0}
})

module.exports = mongoose.model('users', usersSchema)
