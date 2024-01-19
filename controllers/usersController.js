const express = require("express")
const bcrypt = require("bcryptjs")

const {
    getOneUser,
    getOneUserByEmail,
    getOneUserByUserName,
    createUser,
} = require("../queries/users.js")
const {
    checkName,
    checkEmail,
    checkPassword
} = require("../validations/checkUser.js")

const PRIVATE_KEY = process.env.PRIVATE_KEY
const users = express.Router()

// LOGIN ROUTE
users.post("/login", checkEmail, checkPassword, async (req, res) => {
    let oneUser = await getOneUserByEmail(req.body)
    if (oneUser) {
        bcrypt.compare(req.body.password, oneUser.password).then((isMatch) => {
            if (isMatch) {
                oneUser.password="hidden"
                res.status(200).json({ status: "Login Success", login: true, oneUser })
            }
            else {
                res.status(400).json({
                    error: "incorect password/email combo",
                    status: "Login Failure",
                    login: false
                })
            }
        })
    }
    else {
        res.status(404).json({ error: `user with ${req.body.email} email not found!` })
    }
})

// SIGN UP ROUTE
users.post("/", checkName, checkEmail, checkPassword, async (req, res) => {
    const registeredUserByEmail = await getOneUserByEmail(req.body)
    const registeredUserByUserName = await getOneUserByUserName(req.body)
    if (registeredUserByEmail)
        return res.status(400).json({ error: "user already registered with this address" })
    else if (registeredUserByUserName)
        return res.status(400).json({ error: "user already registered with this username" })
    else {
        const newUser = req.body
        bcrypt.genSalt(10, async (err, salt) => {
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
                if (err) throw err
                newUser.password = hash
                try {
                    let createdUser = await createUser(newUser)
                    if (createdUser.user_id) {
                        createdUser.password="hidden"
                        res.status(200).json(createdUser)
                    }
                    else {
                        res.status(400).json({
                            error: `unknown error,` +
                                ` user may have still been created`
                        })
                    }
                }
                catch (error) {
                    res.status(400).json({ error: "error creating user" })
                }
            })
        })
    }
})


module.exports = users
