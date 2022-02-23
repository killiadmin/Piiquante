/**
 * On fait appel à un objet router pour gérer nos requetes POST, signup et login qui est ensuite exporté dans le server
 */

const express = require('express');
const authRouter = express.Router();

const {newUserRegister, connectUser} = require("../controllers/users");
const passwordRegister = require("../middleware/password");

authRouter.post("/signup", passwordRegister, newUserRegister);
authRouter.post("/login",connectUser);

module.exports = { authRouter };