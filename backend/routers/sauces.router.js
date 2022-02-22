/**
 * On importe nos fonctions principales pour les assigner à nos routes http
 * On utilise ensuitye le package Body-Parser pour analysez les corps des requêtes entrantes
 * Et on fait appel à un objet router pour gérer nos requetes GET, POST, PUT et DELETE, qui est ensuite exporté dans le server
 */

const express = require('express');
const productsRouter = express.Router();
const { createSauce, getSauces, getSauceId, deleteSauce, modifySauce, likeSauce } = require("../controllers/sauces");
const { AuthUser } = require('../middleware/authorization');
const { uploadImage } = require("../middleware/multer");
const bodyParser = require("body-parser");

productsRouter.use(bodyParser.json());
productsRouter.use(bodyParser.urlencoded({ extended: true }));
productsRouter.use(AuthUser)

/**
 * Route GET, POST, PUT et DELETE
 */

productsRouter.get("/", getSauces);
productsRouter.post("/", uploadImage.single("image"), createSauce);
productsRouter.get("/:id", getSauceId); 
productsRouter.delete("/:id", deleteSauce);
productsRouter.put("/:id", uploadImage.single("image"), modifySauce);
productsRouter.post("/:id/like", likeSauce);

module.exports = { productsRouter };