const User = require("../models/Users")

module.exports.signup_get = (req, res) => {

    res.render("signup");
}

module.exports.login_get = (req, res) => {
    res.render("login");
}
module.exports.signup_post = async (req, res) => {
    const { name, email, password } = req.body || {}
    try {
        const user = await User.create({ email, password });
        res.status(201).json(user)
    } catch (err) {
        // console.log(err);
        res.status(400).send("error, user could not be created");
    }
}

module.exports.login_post = async (req, res) => {
    const { name, email, password } = req.body || {}
    res.send("user login");
}