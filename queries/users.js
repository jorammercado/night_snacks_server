const db = require("../db/dbConfig.js")

const getOneUser = async (id) => {
    try {
        const oneUser = await db.one(`SELECT * FROM users WHERE id=$1`, id)
        return oneUser
    } catch (err) {
        return { err: `${err}, sql query error - get one user` }
    }
}

const getAllUsers = async () => {
    try {
        const allUsers = await db.any(`SELECT * FROM users`)
        return allUsers
    }
    catch (err) {
        return { err: `${err}, sql query error - get all users` }
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
        const createdUser = await db.one(`INSERT INTO users (firstname,` +
            ` lastname,` +
            ` email,` +
            ` password,` +
            ` username,` +
            ` profile_img,` +
            ` about,` +
            ` dob) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [user.firstname,
            user.lastname,
            user.email,
            user.password,
            user.username,
            user.profile_img,
            user.about,
            user.dob])
        return createdUser
    }
    catch (err) {
        return { err: `${err}, sql query error - create user` }
    }
}

const deleteUserByUsername = async (username) => {
    try {
        const deletedUser = await db.one(
            `DELETE FROM users WHERE username=$1 RETURNING *`,
            username
        )
        return deletedUser
    }
    catch (err) {
        return { err: `${err}, sql query error in deleting a user` }
    }
}

const deleteUser = async (user_id) => {
    try {
        const deletedUser = await db.one(
            `DELETE FROM users WHERE user_id=$1 RETURNING *`,
            user_id
        )
        return deletedUser
    }
    catch (err) {
        return { err: `${err}, sql query error in deleting a user` }
    }
}

const updateUser = async (user_id, user) => {
    try {
        const { firstname, lastname, profile_img, about, dob } = user
        const updatedUser = await db.one(
            `UPDATE users SET firstname=$1, lastname=$2, ` +
            `profile_img=$3, about=$4, dob=$5 WHERE user_id=$6 ` +
            `RETURNING *`,
            [firstname, lastname, profile_img, about, dob, user_id]
        )
        return updatedUser
    }
    catch (err) {
        return { err: `${err}, sql query error in updating a user` }
    }
}


module.exports = {
    getOneUser,
    getAllUsers,
    getOneUserByEmail,
    getOneUserByUserName,
    createUser,
    deleteUserByUsername,
    deleteUser,
    updateUser
}