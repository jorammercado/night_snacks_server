// this file is in charge of QUERYING
// the DB and returning the data to the controller

const db = require("../db/dbConfig.js");


const getOneUser = async (email) => {
    try {
        const oneUser = await db.one(`SELECT * FROM users WHERE email=$1`, email)
        return oneSnack
    }
    catch (err) {
        return { err: `${err}, sql query error - get one user` }
    }
};
const getOneUserByEmail = async ({email}) => {

};
const createUser = async (user) => {

}


module.exports = {
    getOneUser,
    getOneUserByEmail,
    createUser
}