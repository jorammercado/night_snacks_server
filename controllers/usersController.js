const express = require("express")
const bcrypt = require("bcryptjs")

const {
    getOneUserByEmail,
    getOneUserByUserName,
    createUser,
    deleteUser,
    updateUser
} = require("../queries/users.js")
const {
    checkUsername,
    checkEmail,
    checkPassword,
    checkUserIndex
} = require("../validations/checkUser.js")

const PRIVATE_KEY = process.env.PRIVATE_KEY
const users = express.Router()

// LOGIN ROUTE TO USER ACCOUNT
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

// SIGN UP ROUTE, CREATE USER
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
                    let createdUser = await updateUser(newUser)
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

// DELETE USER
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
        res.status(400).json({ error: `${error}, error in delete server path` })
    }
})

// UPDATE USER
users.put("/:user_id/edit", checkUserIndex, async (req, res) => {
    try {
        const userToUpdate = req.body
        userToUpdate.profile_img = !userToUpdate.profile_img ? "profile image" : userToUpdate.profile_img
        userToUpdate.firstname = !userToUpdate.firstname ? "unknown first name" : userToUpdate.firstname
        userToUpdate.lastname = !userToUpdate.lastname ? "unknown last name" : userToUpdate.lastname
        userToUpdate.about = !userToUpdate.about ? "about me" : userToUpdate.about
        userToUpdate.dob = !userToUpdate.dob ? "1/1/2024" : userToUpdate.dob
        let updatedUser = await createUser(userToUpdate)
        if (updatedUser.user_id) {
            updatedUser.password = "hidden"
            res.status(200).json(updatedUser)
        }
        else {
            res.status(400).json({
                error: `error in updating, try again`
            })
        }
    }
    catch (error) {
        res.status(400).json({ error: `${error}, error in user edit route, in controller` })
    }
})


module.exports = users
