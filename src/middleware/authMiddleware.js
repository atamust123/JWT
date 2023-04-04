const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../controllers/authController");
const User = require("../models/Users");
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt; // we store token as jwt key in the cookies
    //check json web oken exists & is verified
    if (token) {
        jwt.verify(token, PRIVATE_KEY, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;// set explicitly null if token does not exist
                res.redirect("/login");
            } else {
                next();
            }
        })
    } else {
        res.redirect("/login")
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, PRIVATE_KEY, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;// set explicitly null if token does not exist
                res.redirect("/login");
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next()
    }
}

module.exports = { requireAuth, checkUser }