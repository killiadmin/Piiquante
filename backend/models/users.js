//Plugin gestion d'erreur en cas de mail similaires et password faible 

const mongoose = require('mongoose');
const uniqueEmail = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
    email: { type : String, required: true, unique: true },
    password: { type : String, required: true }
});

userSchema.plugin(uniqueEmail);

const User = mongoose.model("User", userSchema);

module.exports = { User, userSchema };