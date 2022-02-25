/**
 * On utilise CORS pour ajouter des en-têtes HTTP afin de permettre à l'utilisateur d'accéder aux ressources du serveur.
 * Et on utilise Helmet afin de nous aider à sécuriser express en définissant divers conditions aux en-têtes http. 
 */

//express
const express = require("express");
const app = express();
app.use(express.json());

//CORS
const cors = require("cors");
app.use(cors());

//Helmet
const helmet = require("helmet")
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

module.exports = { app, express };