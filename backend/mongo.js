//Plugin gestion d'erreur en cas de mail similaires
const uniqueEmail = require("mongoose-unique-validator");

//dotenv
const login = process.env.LOGIN;
const password = process.env.PASSWORD;
const dataBase = process.env.DATA_BASE;

//mongoose
const mongoose = require('mongoose');
const uri = `mongodb+srv://${login}:${password}@cluster0.0k4ku.mongodb.net/${dataBase}?retryWrites=true&w=majority`;

mongoose
.connect(uri)
.then((()=> console.log("Connection Mongoose Ok")))
.catch(err => console.error("Error connecting", err));

//On crée le schema de l'utilisateur
const userschema = new mongoose.Schema({
    email: { type : String, required: true, unique: true },
    password: { type : String, required: true }
});

userschema.plugin(uniqueEmail);

const User = mongoose.model("User", userschema);

module.exports = {mongoose, User};