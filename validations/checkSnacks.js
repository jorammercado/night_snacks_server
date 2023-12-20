const { getAllSnacks } = require("../queries/snacks")

const checkSnacks = async (req, res, next) => {
    const allSnacks = await getAllSnacks()
    if (allSnacks[0]) {
        return next()
    }
    else {
        res.status(500).json({ error: "server error in getAllSnacks, list validation failed" })
    }
}

const checkSnackIndex = async (req, res, next) => {
    const allSnacks = await getAllSnacks()
    const { resource_id } = req.params
    const ids = allSnacks.map(e => e.resource_id)
    if (ids.includes(Number(resource_id)))
        return next()
    else
        res.status(400).json({ error: "server error in checkSnackIndex, id validation failed" })
}

const checkSnackName = (req, res, next) => {
    if (req.body.name) {
        return next()
    }
    else {
        res.status(400).json({ error: "snack name is required, name validation failed" })
    }
}

const checkIsFavoriteBoolean = (req, res, next) => {
    const { is_favorite } = req.body
    if (is_favorite === "true" ||
        is_favorite === "false" ||
        is_favorite === undefined ||
        typeof is_favorite === "boolean")
        return next()
    else
        res.status(400).json({ error: "is_favorite must be a bool value, bool validation failed" })
}

const checkIsNumberCalories = (req, res, next) => {    
    const { calories } = req.body
    if (calories === undefined ||
        typeof Number(calories) === "number")
        return next()
    else
        res.status(400).json({
            error: `calories must be number type, calories validation failed, ` +
                `current input: ${calories}`
        })
}

const checkIsNumberRating = (req, res, next) => {
    const { rating } = req.body
    if (rating === undefined ||
        typeof Number(rating) === "number")
        return next()
    else
        res.status(400).json({ error: "rating must be number type, rating validation failed" })
}

const checkImageLink = (req, res, next) => {
    const { image } = req.body
    if (/^http:\/\/|^https:\/\//.test(image) ||
        image === null || image === "" || image === undefined)
        return next()
    else
        res.status(400).json({
            error: `image link must start as http(s)://,` +
                ` image validation failed, current input=${image}`
        })
}


module.exports = {
    checkSnacks,
    checkSnackIndex,
    checkSnackName,
    checkIsFavoriteBoolean,
    checkIsNumberCalories,
    checkIsNumberRating,
    checkImageLink
}