const express = require("express")
const bcrypt = require("bcryptjs")

const {
  getOneUser,
  getOneUserByEmail,
  createUser,
} = require("../queries/users.js")
// const{
//   checkName,
//   checkBoolean
// } = require("../validations/checkUser.js")

const PRIVATE_KEY = process.env.PRIVATE_KEY
const users = express.Router()

// LOGIN ROUTE
users.post("/login", async (req, res) => {

})

// SIGN UP ROUTE
users.post("/", async (req, res) => {
    
})



    

module.exports = users;
