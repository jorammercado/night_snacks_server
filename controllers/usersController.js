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
                oneUser.password = "hidden"
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
                    newUser.profile_img = !newUser.profile_img ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-person" viewBox="0 0 16 16">
                    <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                    <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    </svg>` : newUser.profile_img
                    newUser.firstname = !newUser.firstname ? "unknown first name" : newUser.firstname
                    newUser.lastname = !newUser.lastname ? "unknown last name" : newUser.lastname
                    newUser.about = !newUser.about ? "about me" : newUser.about
                    newUser.dob = !newUser.dob ? "1/1/2024" : newUser.dob
                    let createdUser = await createUser(newUser)
                    if (createdUser.user_id) {
                        createdUser.password = "hidden"
                        res.status(200).json(createdUser)
                    }
                    else {
                        res.status(400).json({
                            error: `error creating user, try again`
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
