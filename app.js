const express = require("express")
const mongoose = require("mongoose")
const authRoutes = require("./src/routes/authRoutes")
var path = require('path');
const { application } = require("express");

const app = express();
// middleware
app.use(express.static("public"));
app.use(express.json())
app.set("views", path.join(__dirname, "./src/views")) // set the home path in src ->  view folder

//view engine
app.set("view engine", "ejs")

//db connection
const dbURI = 'mongodb+srv://atakan:atakan@cluster0.mj9xcyf.mongodb.net/node-auth' //todo handle here
mongoose.connect(dbURI)
    .then(res => app.listen(3000))
    .catch(err => console.log(err));

//routes
app.get("/", (req, res) => res.render("home"))
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(authRoutes);