const jsonWebToken = require("jsonwebtoken")

//Verification de l'authentification de l'utilisateur pour ensuite voir et creée les sauces
function AuthUser(req, res, next) {
    console.log("Authenticate User")
    const headersToken = req.header("Authorization");
    const tokenJwt = headersToken.split(" ")[1];
    
    if (headersToken == null) {
        return res.status(403).send({ message: "Headers invalid !" + err })

    } else if (tokenJwt == null) {
        return res.status(403).send({ message: "Token has a null value!" + err })

    }else {
        jsonWebToken.verify(tokenJwt, process.env.PASSWORD_TOKEN, (err) => {
            if (err) {
                return res.status(403).send({ message: "Token is invalid !" + err })

            } else {
                next()
            }}
            )}
        }

module.exports = { AuthUser };