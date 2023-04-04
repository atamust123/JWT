const mongoose = require("mongoose");
const { isEmail } = require("validator")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: [true, "This email has already in database"],
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter an email"],
        minLength: [6, "Min passowrd length must be 6 characters"]
    },
})

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// static method to login user
userSchema.statics.login = async function (email, password) {
    // this refer to User
    const user = await this.findOne({ email }) // if not found return undefined 
    if (user) {
        const auth = await bcrypt.compare(password, user.password); debugger
        if (auth) {
            return user;
        }
        throw Error("Incorrect password")
    }
    throw Error("Incorrect email")
}

const User = mongoose.model("user", userSchema)

module.exports = User;