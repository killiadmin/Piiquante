const jsonWebToken = require("jsonwebtoken")

/**
 * Cette fonction va nous permettre d'authentifier l'utilisateur avec 'jsonwebtoken', une fois l'utilisateur vérifier,
 * il pourra voir et crée des produits mais il ne pourra pas supprimer les produits des autres utilisateurs et inversement.
 */

function AuthUser(req, res, next) {
    const headersToken = req.header("Authorization");
    const tokenJwt = headersToken.split(" ")[1];
    
    if (headersToken == null) {
        return res.status(403).send({ message: "Le token n'est pas valide" });

    } else if (tokenJwt == null) {
        return res.status(403).send({ message: "Le token n'est pas valide"});

    }else {
        jsonWebToken.verify(tokenJwt, process.env.PASSWORD_TOKEN, (err) => {
            if (err) {
                console.error(err);
                return res.status(403).send({ message: "L'authentification du token pose un probleme"});
            } else {
                next();
            }})}};

module.exports = { AuthUser };