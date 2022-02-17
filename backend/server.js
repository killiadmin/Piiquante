const port = 3000;
//dotenv Stockage de la config d'auth' dans l'environnement séparé du code 
require('dotenv').config();

//express
const express = require("express");
const app = express();

//Body-parser
const bodyParser = require("body-parser");

//CORS
const cors = require("cors");

//On se connecte à la dataBases
require("./mongo");
const {newUserRegister, connectUser} = require("./controllers/users");
const { createSauce, getSauces} = require("./controllers/sauces");

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { AuthUser } = require('./middleware/authorization');
//Multer
const multer = require("multer");
const storage = multer.diskStorage({
    destination: "images/",
    filename: function (req, file, cb) {
        cb(null, useFileName(req, file));
    }});

    function useFileName(file) {
        const fileName = `${Date.now()}-${file.originalname}`.replace(/\s/g, "-")
        file.fileName = fileName;
        return fileName
    };

const uploadImage = multer({ storage: storage});

//routes POST/GET
app.post("/api/auth/signup", (req, res) => newUserRegister(req, res));
app.post("/api/auth/login", (req, res) => connectUser(req, res));
app.get("/api/sauces", AuthUser, getSauces);
app.post("/api/sauces", AuthUser, uploadImage.single("image"), createSauce);
app.get("/", (req, res) => {
    res.send("Bienvenue sur le site des sauces piquantes!");
});

//On écoute le port 3000
app.listen(port, () => console.log("Listening on port" + port));