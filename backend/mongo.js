/**
 * On va utiliser dotenv, qui nous permet de charger les variables d'environnement d'un fichier env. Le stockage de la config,
 * est séparé du code.
*/

//dotenv
require('dotenv').config();
const login = process.env.LOGIN;
const password = process.env.PASSWORD;
const dataBase = process.env.DATA_BASE;

//mongoose
const mongoose = require('mongoose');
const uri = `mongodb+srv://${login}:${password}@cluster0.0k4ku.mongodb.net/${dataBase}?retryWrites=true&w=majority`;

mongoose
.connect(uri)
.then((()=> console.log("Connection Mongoose OK!")))
.catch(() => console.error("Connection Mongoose KO!"));

module.exports = { mongoose };