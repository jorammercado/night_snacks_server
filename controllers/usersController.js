const express = require("express")
const bcrypt = require("bcryptjs")

const {
    getOneUserByEmail,
    getOneUserByUserName,
    createUser,
    deleteUser
} = require("../queries/users.js")
const {
    checkUsername,
    checkEmail,
    checkPassword,
    checkUserIndex
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
users.post("/", checkUsername, checkEmail, checkPassword, async (req, res) => {
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
                    newUser.profile_img = !newUser.profile_img ? "profile image" : newUser.profile_img
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

// delete user
users.delete("/:user_id", checkUserIndex, async (req, res) => {
    try {
        const { user_id } = req.params
        const deletedUser = await deleteUser(user_id)
        if (deletedUser) {
            deletedUser.password = ""
            res.status(200).json(deletedUser)
        }
        else {
            res.status(404).json({ error: "user not found => not deleted" })
        }
    }
    catch (error) {
        res.status(400).json({error: `${error}, error in delete server path`})
    }
})


module.exports = users
