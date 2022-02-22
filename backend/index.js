/**
 * On va utiliser dotenv, qui nous permet de charger les variables d'environnement d'un fichier env. Le stockage de la config,
 * est séparé du code.
 * On utilise CORS pour ajouter des en-têtes HTTP afin de permettre à l'utilisateur d'accéder aux ressources du serveur.
 */

require('dotenv').config();

//express
const express = require("express");
const app = express();
app.use(express.json());

//CORS
const cors = require("cors");
app.use(cors());

// const helmet = require("helmet")
// app.use(helmet());
// app.disable('x-powered-by')

module.exports = { app, express };