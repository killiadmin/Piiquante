/**
 * On va utiliser dotenv, qui nous permet de charger les variables d'environnement d'un fichier env. Le stockage de la config,
 * est séparé du code.
 * On utilise CORS pour ajouter des en-têtes HTTP afin de permettre à l'utilisateur d'accéder aux ressources du serveur.
 * Et on utilise Helmet afin de nous aider à sécuriser express en définissant divers conditions aux en-têtes http. 
 */

require('dotenv').config();

//express
const express = require("express");
const app = express();
app.use(express.json());

//CORS
const cors = require("cors");
app.use(cors());

const helmet = require("helmet")
app.use(helmet());

module.exports = { app, express };