const express = require("express")
const bcrypt = require("bcryptjs")

const {
    getOneUser,
    getOneUserByEmail,
    createUser,
} = require("../queries/users.js")
const{
  checkName,
  checkEmail,
  checkPassword
} = require("../validations/checkUser.js")

const PRIVATE_KEY = process.env.PRIVATE_KEY
const users = express.Router()

// LOGIN ROUTE
users.post("/login", checkName, checkEmail, checkPassword,  async (req, res) => {
    const oneUser = await getOneUserByEmail(req.body)
    if (oneUser) {
        bcrypt.compare(req.body.password, oneUser.password).then((isMatch) => {
            if (isMatch) {
                res.status(200).json(oneUser)
            }
            else {
                res.status(400).json({ error: "incorect password" })
            }
        })
    }
    else {
        res.status(404).json({ error: "not found!" })
    }
})

// SIGN UP ROUTE
users.post("/", checkName, checkEmail, checkPassword, async (req, res) => {
    const registeredUser = await getOneUserByEmail(req.body)
    if(registeredUser)
        return res.status(400).json({error: "user already registered with this address"})
    else{
        const newUser = req.body
        bcrypt.genSalt(10, async(err, salt) => {
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
                if(err) throw err
                console.log(hash, " hash ")
                newUser.password = hash
                try{
                    const createdUser = await createUser(newUser)
                    console.log(createdUser, " created user here")
                    if(createdUser.id){
                        res.status(200).json(createdUser)
                    }
                }
                catch(error){
                    res.status(400).json({error: "error creating user"})
                }
            })
        })
    }
})


module.exports = users
