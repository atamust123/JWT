const User = require("../models/Users")
const USER_VALIDATON_FAILED = "user validation failed"
const MONGO_SERVER_ERROR = "MongoServerError";
const handleErrors = (err) => {
    if (err.name === MONGO_SERVER_ERROR && err.code === 11000) {
        return { [err.name]: "That email is already in use" };
    }

    let errors = { password: "", email: "" };
    console.log(err.message, err.code)

    if (err.message.includes(USER_VALIDATON_FAILED)) {
        Object.values(err.errors).forEach(({ properties }) => {
            console.log(properties);
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

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
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
}

module.exports.login_post = async (req, res) => {
    const { name, email, password } = req.body || {}
    res.send("user login");
}