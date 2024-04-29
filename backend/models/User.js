const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
},{timestamps: true})

const User = mongoose.model('user', userSchema)

module.exports = User


// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// const employeeSchema = new Schema({
//     name: {
//         type: String
//     },
//     designation: {
//         type: String
//     },
//     email: {
//         type: String
//     },
//     phone: {
//         type: String
//     },
//     age: {
//         type: Number
//     },
//     file: {
//         type: String
//     }
// },{timestamps: true})

// const Employee =  mongoose.model('Employee', employeeSchema)
// module.exports = Employee