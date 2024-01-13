
const checkName = (req, res, next) => {
    if(req.body.username){
        return next()
    } else {
        res.status(400).json({ error: "username is required!" })
    }
}

const checkEmail = (req, res, next) => {
    if(req.body.email){
        return next()
    } else {
        res.status(400).json({ error: "email is required!" })
    }
}

const checkPassword = (req, res, next) => {
    if(req.body.password){
        return next()
    } else {
        res.status(400).json({ error: "password is required!" })
    }
}

module.exports = {
    checkName,
    checkEmail,
    checkPassword
}
