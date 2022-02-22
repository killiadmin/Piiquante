const jsonWebToken = require("jsonwebtoken")

/**
 * Cette fonction va nous permettre d'authentifier l'utilisateur avec 'jsonwebtoken', une fois l'utilisateur vérifier,
 * il pourra voir et crée des produits mais il ne pourra pas supprimer les produits des autres utilisateurs et inversement.
 */

function AuthUser(req, res, next) {
    const headersToken = req.header("Authorization");
    const tokenJwt = headersToken.split(" ")[1];
    
    if (headersToken == null) {
        return res.status(403).send({ message: "Headers invalid !" + err });

    } else if (tokenJwt == null) {
        return res.status(403).send({ message: "Token has a null value!" + err });

    }else {
        jsonWebToken.verify(tokenJwt, process.env.PASSWORD_TOKEN, (err) => {
            if (err) {
                return res.status(403).send({ message: "Token is invalid !" + err });

            } else {
                next();
            }}
            )}
        };

module.exports = { AuthUser };