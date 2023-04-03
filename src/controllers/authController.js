const User = require("../models/Users")
const jwt = require("jsonwebtoken")

const USER_VALIDATON_FAILED = "user validation failed"
const MONGO_SERVER_ERROR = "MongoServerError";
const handleErrors = (err) => {
    // duplicate error code 11000
    if (err.name === MONGO_SERVER_ERROR && err.code === 11000) {
        return { ["email"]: "That email is already in use" };
    }
    debugger
    let errors = { password: "", email: "" };
    // incorrect email
    if (err.message === "Incorrect email") {
        errors.email = "that email is not registered"
    }
    // incorrect password
    if (err.message === "Incorrect password") {
        errors.password = "that password is not registered"
    }

    if (err.message.includes(USER_VALIDATON_FAILED)) {
        Object.values(err.errors).forEach(({ properties }) => {
            console.log(properties);
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}
const MAX_AGE = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'net ninja secret', {
        expiresIn: MAX_AGE
    })
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
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
        res.status(201).json({ user: user._id })
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
}

module.exports.login_post = async (req, res) => {
    const { name, email, password } = req.body || {}
    try {
        // this login function were passed as statics in User.js file
        const user = await User.login(email, password);
        res.status(200).json({ user: user._id })
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors })
    }

}