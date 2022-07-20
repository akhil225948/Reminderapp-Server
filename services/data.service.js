//import jsonwebtoken

const jwt = require('jsonwebtoken')

//import db.js
const db = require('./db')

//Register asynchronous
const register = (username, uid, password) => {

    return db.User.findOne({
      uid
    }).then(user => {
      console.log(user);
      if (user) {
        return {
          status: false,
          message: "Already registered..Please Log in",
          statusCode: 401
  
        }
      }
      else {
        const newUser = new db.User({
          uid,
          username,
          password,
          balance: 0,
          transaction: []
        })
        newUser.save()
        return {
          status: true,
          message: "Registered successfully",
          statusCode: 200
        }
      }
  
    })
  
  
  }
//login asynchronous

const login = (uid, pswd) => {

  return db.User.findOne({
    uid,
    password: pswd
  }).then(user => {
    if (user) {
      
      currentUid = uid
      currentPassword = pswd

      //token generation
      token = jwt.sign({
        //store account number inside token
        currentUid: uid
      }, 'supersecretkey12345')

      return {
        status: true,
        message: "Loged in successfully",
        statusCode: 200,
        currentUid,
        currentPassword,
        token

      }
    }
    else {
      return {
        status: false,
        message: "Invalid Account number or Password !",
        statusCode: 401
      }
    }
  })

}

//add event asynchronous

const addEvent = (req,date,message) => {
  
  let currentUid = req.currentUid
  return db.User.findOne({
    uid:currentUid
  }).then(user => {
    if (user) {
      console.log(user);
      user.transaction.push({
     date : date,
     message : message
    })
   user.save()
      return{
        status: true,
        message: "Event added successfully",
        statusCode: 200
      }
    }
    else {
      return {
        status: false,
        message: "Invalid Credetials !",
        statusCode: 401
      }

    }
  })

}

//veiw event asynchronous

const veiwEvent = (uid) => {
  return db.User.findOne({
    uid
  }).then (user=>{
    if(user){
      return {
        status: true,
        statusCode: 200,
        transaction:user.transaction
  
      }
    }
    else{
      return {
        status: false,
        message: "User does not exist",
        statusCode: 401
  
      }
    }
  })
  
  }

//delete account

const deleteAcc = (uid)=> {
  return db.User.deleteOne({
    uid
  }).then(user=>{
    if(!user){
      return {
        status: false,
        message: "Operation failed",
        statusCode: 401
  
      }
    }
    return{
      status: true,
      statusCode: 200,
      message: 'Successfully deleted'
    }
  })
}

  module.exports = {
    register,
    login,
    addEvent,
    veiwEvent,
    deleteAcc
    
  }