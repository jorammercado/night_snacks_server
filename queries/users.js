const db = require("../db/dbConfig.js")

const getOneUser = async (id) => {
    try {
        const oneUser = await db.one(`SELECT * FROM users WHERE id=$1`, id)
        return oneUser
    } catch (err) {
        return { err: `${err}, sql query error - get one user` }
    }
}

const getOneUserByEmail = async ({ email }) => {
    try {
        const oneUser = await db.oneOrNone("SELECT * FROM users WHERE email=$1",
            email)
        return oneUser
    }
    catch (err) {
        return { err: `${err}, sql query error - get one user by email` }
    }
}

const getOneUserByUserName = async ({ username }) => {
    try {
        const oneUser = await db.oneOrNone("SELECT * FROM users WHERE username=$1",
            username)
        return oneUser
    }
    catch (err) {
        return { err: `${err}, sql query error - get one user by username` }
    }
}

const createUser = async (user) => {
    try {
        const createdUser = await db.one(`INSERT INTO users (firstname, lastname, email, password, username) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [user.firstname, user.lastname, user.email, user.password, user.username])
        return createdUser
    }
    catch (err) {
        return { err: `${err}, sql query error - create user` }
    }
}


module.exports = {
    getOneUser,
    getOneUserByEmail,
    getOneUserByUserName,
    createUser
}