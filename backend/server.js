const port = 3000;
const { app, express } = require("./index");
const bodyParser = require("body-parser");

//On se connecte à la dataBases
require("./mongo");
const {newUserRegister, connectUser} = require("./controllers/users");
const { createSauce, getSauces, getSauceId, deleteSauce, modifySauce } = require("./controllers/sauces");

//Path
const path = require("path");

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { AuthUser } = require('./middleware/authorization');
const { uploadImage } = require("./middleware/multer")

//routes POST/GET
app.post("/api/auth/signup", (req, res) => newUserRegister(req, res));
app.post("/api/auth/login", (req, res) => connectUser(req, res));
app.get("/api/sauces", AuthUser, getSauces);
app.post("/api/sauces", AuthUser, uploadImage.single("image"), createSauce);
app.get("/api/sauces/:id", AuthUser, getSauceId); 
app.delete("/api/sauces/:id", AuthUser, deleteSauce);
app.put("/api/sauces/:id", AuthUser, uploadImage.single("image"), modifySauce);
app.get("/", (req, res) => {
    res.send("Bienvenue sur le site des sauces piquantes!");
});

//express, display Image with path
app.use("/images", express.static(path.join(__dirname, "images")));

//On écoute le port 3000
app.listen(port, () => console.log("Listening on port" + port));