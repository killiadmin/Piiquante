/**
 * On fait appel à un objet router pour gérer nos requetes POST, signup et login qui est ensuite exporté dans le server
 */

const express = require('express');
const authRouter = express.Router();

const {newUserRegister, connectUser} = require("../controllers/users");

authRouter.post("/signup", (req, res) => newUserRegister(req, res));
authRouter.post("/login", (req, res) => connectUser(req, res));

module.exports = { authRouter };