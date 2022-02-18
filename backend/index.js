//Dotenv.
require('dotenv').config();

//express
const express = require("express");
const app = express();

//CORS
const cors = require("cors");

//APP
app.use(cors());
app.use(express.json());

module.exports = { app, express };