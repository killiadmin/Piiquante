const {User} = require("../mongo")
const bcrypt = require("bcrypt")
const tokenJwt = require("jsonwebtoken")

//Creation d'un nouvel utilisateur 
async function newUserRegister(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;       
        const crypPassword = await hashPassword(password);      
        const user = new User({email : email, password : crypPassword});       
        await user.save()
        
        res.status(201).send({message: "User register !"})

    } catch(err){
        res.status(409).send({message: "There is an error, this is " + err})
    };
};

//Cryptage des password avec bcrypt
function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds)
}


//Login de l'utilisateur + verif. du Token 
async function connectUser(req, res) {
    try{
        const email = req.body.email;
        const password = req.body.password;
    
        const user = await User.findOne({email: email})
        const cryptPassword = await bcrypt.compare(password, user.password)
        const token = createNewToken(email)
    
        if (!cryptPassword) {
            res.status(403).send({message: "Password invalid!"})
        } else {
            res.status(200).send({userId: user?._id, token: token})
        }
    } catch(err){
        console.error(err)
        res.status(500).send({message:"There is a error!"})
    }
}

//Creation de token du nouvel utilisateur
function createNewToken(email) {
    const passwordToken = process.env.PASSWORD_TOKEN
    const newToken = tokenJwt.sign({email : email}, `${passwordToken}`, {expiresIn: "48h"})
    return newToken
}

module.exports = {newUserRegister, connectUser};