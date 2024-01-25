const { getAllUsers } = require("../queries/users")

const checkUsername = (req, res, next) => {
    if (req.body.username) {
        return next()
    } else {
        res.status(400).json({ error: "username is required!" })
    }
}

const checkEmail = (req, res, next) => {
    if (req.body.email) {
        return next()
    } else {
        res.status(400).json({ error: "email is required!" })
    }
}

const checkPassword = (req, res, next) => {
    if (req.body.password) {
        return next()
    } else {
        res.status(400).json({ error: "password is required!" })
    }
}

const checkValidUsername = async (req, res, next) => {
    const allUsers = await getAllUsers()
    const { username } = req.params
    const allUsernames = allUsers.map(e => e.username)
    if (allUsernames.includes(Number(username)))
        return next()
    else
        res.status(400).json({
            error: `server error - invalid username sent`
        })
}

const checkUserIndex = async (req, res, next) => {
    const allUsers = await getAllUsers()
    const { user_id } = req.params
    const ids = allUsers.map(e => e.user_id)
    if (ids.includes(Number(user_id)))
        return next()
    else
        res.status(400).json({
            error: `server error - invalid user_id sent`
        })
}



module.exports = {
    checkUsername,
    checkEmail,
    checkPassword,
    checkUserIndex,
    checkValidUsername
}
