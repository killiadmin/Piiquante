const { User } = require("../models/users");
const bcrypt = require("bcrypt");
const tokenJwt = require("jsonwebtoken");

/**
 * Creation d'un nouvel utilisateur, on va récupérer son email et son password pour ensuite le sauvegarder dans la base de données,
 * le mdp est hasher avec bcrypt qui va crée un algorythme de chiffrement afin de ne pas voir en dur le mot de passe de l'utilisateur
 */

async function newUserRegister(req, res) {
    try {
        const { email, password } = req.body;      
        const crypPassword = await hashPassword(password);      
        const user = new User({ email : email, password : crypPassword });       
        await user.save();        
        res.status(201).send({ message: "L'utilisateur est bien enregistrer !" });
    } catch(err){
        console.error(err);
        res.status(409).send({ message: "Il y a eu une erreur lors de la validation de l'utilisateur! "});
    };
};

/**
 * Cryptage des passwords avec bcrypt
 */

function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

/**
 * Dans le login, on récupère l'email et le mdp qui est vérifier avec la methode compare de bcrypt si il est correct,
 * ensuite on appelle la fonction 'createNewToken', un userId et un nouveau token sera crée si les logins sont correct,
 * sinon une erreur 403( Forbidden) sera retourner.
 */

async function connectUser(req, res) {
    try{
        const { email, password } = req.body;    
        const user = await User.findOne({ email: email });
        const cryptPassword = await bcrypt.compare(password, user.password);
        const token = createNewToken(email);
        if (!cryptPassword) {
            res.status(403).send({ message: "Le mot de passe est invalide!" });
        } else {
            res.status(200).send({ userId: user?._id, token: token });
        };
    } catch(err){
        console.error(err);
        res.status(500).send({ message:"Il y a eu une erreur lors de la connection de l'utilisateur!" });
    };
};

/**
 * Creation de token assigné a la connection de l'utilisateur
 */

function createNewToken(email) {
    const passwordToken = process.env.PASSWORD_TOKEN;
    const newToken = tokenJwt.sign({ email : email }, `${passwordToken}`, { expiresIn: "48h" });
    return newToken;
};
 
module.exports = { newUserRegister, connectUser };