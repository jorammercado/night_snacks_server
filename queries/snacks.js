const db = require(`../db/dbConfig.js`)

const getAllSnacks = async () => {
    try {
        const allSnacks = await db.any(`SELECT * FROM snacks`)
        return allSnacks
    }
    catch (err) {
        return { err: `${err}, sql query error - get all snacks` }
    }
}

const getOneSnack = async (resource_id) => {
    try {
        const oneSnack = await db.one(`SELECT * FROM snacks WHERE resource_id=$1`, resource_id)
        return oneSnack
    }
    catch (err) {
        return { err: `${err}, sql query error - get one snack` }
    }
}

const deleteSnack = async (resource_id) => {
    try {
        const deletedSnack = await db.one(
            `DELETE FROM snacks WHERE resource_id=$1 RETURNING *`,
            resource_id
        )
        return deletedSnack
    }
    catch (err) {
        return { err: `${err}, sql query error - delete a snack` }
    }
}

const createSnack = async (snack) => {
    try {
        const { name, image, category, calories,
            rating, is_favorite, user_id } = snack
        const newSnack = await db.one(
            `INSERT INTO snacks(name, image, category, calories,` +
            ` rating, is_favorite, user_id)` +
            ` VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [name, image, category, calories,
                rating, is_favorite, user_id]
        )
        return newSnack
    }
    catch (err) {
        return { err: `${err}, sql query error - create a snack` }
    }
}

const updateSnack = async (resource_id, snack) => {
    try {
        const { name, image, category, calories,
            rating, is_favorite } = snack
        const updatedSnack = await db.one(
            `UPDATE snacks SET name=$1, image=$2, category=$3,` +
            ` calories=$4, rating=$5,` +
            ` is_favorite=$6 WHERE resource_id=$7 RETURNING *`,
            [name, image, category, calories,
                rating, is_favorite, resource_id]
        )
        return updatedSnack
    }
    catch (err) {
        return { err: `${err}, sql query error - update a snack` }
    }
}

module.exports = {
    getAllSnacks,
    getOneSnack,
    deleteSnack,
    createSnack,
    updateSnack
}
