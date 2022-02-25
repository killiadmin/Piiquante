const { app, express } = require("./app");
const { productsRouter } = require("./routers/sauces.router");
const { authRouter } = require("./routers/auth.router");
const rateLimit  = require('express-rate-limit');
const port = 3000;

//On se connecte à la dataBases
require("./mongo");

/**
 * On utilise Path pour accéder et interagir avec le systeme de fichiers, dirname va nous retourner la partie repertoire d'un chemin,
 * donc "images".
 */

const path = require("path");

/**
 * On utilise Limiter, pour limiter le débit à toutes nos requetes, cela évite tout répétement abusif aux demandes de l'API
 */

const limiter = rateLimit ({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100, // limite chaque IP à 100 requêtes par 'window' de 15 minutes
    standardHeaders: true, // retourne l'info de limite dans les headers
    legacyHeaders: false // désactive le 'X-rateLimit-*' headers
});

//Router
app.use("/api/sauces", productsRouter);
app.use("/api/auth", authRouter);
app.use(limiter);

//express, display Image with path
app.use("/images", express.static(path.join(__dirname, "images")));

//On écoute le port 3000
app.listen(port, () => console.log("Listening on port" + port));