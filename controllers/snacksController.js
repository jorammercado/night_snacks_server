const express = require("express")
const snacks = express.Router()
const {
    getAllSnacks,
    getOneSnack,
    deleteSnack,
    createSnack,
    updateSnack
} = require("../queries/snacks")
const {
    checkSnacks,
    checkSnackIndex,
    checkSnackName,
    checkIsNumberCalories,
    checkIsNumberRating,
    checkIsFavoriteBoolean,
    checkImageLink
} = require("../validations/checkSnacks")


snacks.get("/", checkSnacks, async (req, res) => {
    try {
        const allSnacks = await getAllSnacks()
        if (req.query.order) {
            allSnacks.sort((a, b) => {
                if (req.query.order === "asc" || req.query.order === "desc") {
                    if (a.name.toLowerCase() < b.name.toLowerCase())
                        return -1
                    else if (a.name.toLowerCase() > b.name.toLowerCase())
                        return 1
                    else
                        return 0
                }
                else if (req.query.order === "ascCat" || req.query.order === "descCat") {
                    if (a.category.toLowerCase() < b.category.toLowerCase())
                        return -1
                    else if (a.category.toLowerCase() > b.category.toLowerCase())
                        return 1
                    else
                        return 0
                }
                else if (req.query.order === "ascCal" || req.query.order === "descCal") {
                    if (a.calories < b.calories)
                        return -1
                    else if (a.calories > b.calories)
                        return 1
                    else
                        return 0
                }
                else if (req.query.order === "ascRa" || req.query.order === "descRa") {
                    if (a.rating < b.rating)
                        return -1
                    else if (a.rating > b.rating)
                        return 1
                    else
                        return 0
                }
            })
            if (req.query.order === "asc" || req.query.order === "ascCat" ||
                req.query.order === "ascCal" || req.query.order === "ascRa")
                res.status(200).json(allSnacks)
            else if (req.query.order === "desc" || req.query.order === "descCat" ||
                req.query.order === "descCal" || req.query.order === "descRa")
                res.status(200).json(allSnacks.reverse())
            else
                res.status(400).json({ error: `Order query error in index path.` })
        }
        else if (req.query.is_favorite) {
            if (req.query.is_favorite === "true") {
                res.status(200).json(allSnacks.filter(current => {
                    return current.is_favorite === true
                }))
            }
            else if (req.query.is_favorite === "false") {
                res.status(200).json(allSnacks)
            }
            else
                res.status(400).json({ error: `Is favorite query error in index path.` })
        }
        else
            res.status(200).json(allSnacks)
    }
    catch (error) {
        res.status(400).json({ error: `${error}, error in index controller path.` })
    }
})

snacks.get("/:resource_id", checkSnackIndex, async (req, res) => {
    try {
        const { resource_id } = req.params
        const snack = await getOneSnack(resource_id)
        res.status(200).json(snack)
    }
    catch (error) {
        res.status(400).json({ error: `${error}, error in show controller path` })
    }
})

snacks.delete("/:resource_id", checkSnackIndex, async (req, res) => {
    try {
        const { resource_id } = req.params;
        const deletedSnack = await deleteSnack(resource_id)
        if (deletedSnack)
            res.status(200).json({ success: true, deletedSnack })
        else
            res.status(404).json({ error: `Snack not found.` })

    } catch (error) {
        res.status(400).json({ error: `${error}, error in delete controller path` })
    }
})

snacks.post("/", checkSnackName,
    checkIsFavoriteBoolean,
    checkImageLink,
    checkIsNumberCalories,
    checkIsNumberRating, async (req, res) => {
        try {
            const snack = req.body;
            snack.category = !snack.category ? "Snack Category" : snack.category
            snack.calories = !snack.calories ? 0 : snack.calories
            snack.rating = !snack.rating ? 0 : snack.rating
            snack.image = !snack.image ? 'https://commons.wikimedia.org/wiki/Main_Page' : snack.wikipedia_link
            snack.is_favorite = !snack.is_favorite ? false : snack.is_favorite
            const snackAdded = await createSnack(snack)
            res.status(200).json(snackAdded)
        }
        catch (error) {
            res.status(400).json({ error: `${error},  error in new controller path` })
        }
    }
)

snacks.put("/:resource_id", checkSnackName,
    checkSnackIndex,
    checkIsFavoriteBoolean,
    checkIsNumberCalories,
    checkIsNumberRating,
    checkImageLink, async (req, res) => {
        try {
            const { resource_id } = req.params
            const snack = req.body
            snack.category = !snack.category ? "Snack Category" : snack.category
            snack.calories = !snack.calories ? 0 : snack.calories
            snack.rating = !snack.rating ? 0 : snack.rating
            snack.image = !snack.image ? 'https://commons.wikimedia.org/wiki/Main_Page' : snack.image
            snack.is_favorite = !snack.is_favorite ? false : snack.is_favorite
            const updatedSnack = await updateSnack(resource_id, snack)
            if (updatedSnack.resource_id) {
                res.status(200).json(updatedSnack)
            } else {
                res.status(400).json({ error: `Snack not found.` })
            }
        }
        catch (error) {
            res.status(400).json({ error: `${error}, error in update controller path` })
        }
    }
)


module.exports = snacks
