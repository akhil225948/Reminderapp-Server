//db connection

//import mongoose
const mongoose = require('mongoose')

//connection string
mongoose.connect('mongodb://localhost:27017/remainderApp',{
    useNewUrlParser:true
})

//model definition
const User = mongoose.model('User',{
    uid: Number,
    username: String,
    password: Number,
    balance: Number,
    transaction: []
})

module.exports={
    User

}