const mongoose = require("mongoose")

const sauceSchema = new mongoose.Schema({
    userId: String,
    name: String,
    manufacturer: String,
    description: String,
    mainPepper: String,
    imageUrl: String,
    heat: Number,
    //likes et dislikes
    likes:  Number,
    dislikes: Number,
    usersLiked: [String],
    usersDisliked: [String]
})

const Sauce = mongoose.model("Sauce", sauceSchema)

//Requete GET pour aller chercher les sauces crée
function getSauces(req, res) {
    console.log("Tu es maintenant dans la fonction getSauce")
    Sauce
        .find({})
        .then(sauces => res.send(sauces))
        .catch((err) => console.error("Le produit n'a pas été envoyé", err))
}

//Add sauce, formulaire

function createSauce(req, res) {
    const objSauce = JSON.parse(req.body.sauce);
    const { body, file} = req;
    console.log(file);

    const{name, manufacturer, description, mainPepper, heat, userId} = objSauce;

    const imageUrl = req.file.destination + req.file.filename;

    const sauce = new Sauce({
        userId: userId,
        name: name,
        manufacturer: manufacturer,
        description: description,
        mainPepper: mainPepper,
        imageUrl: imageUrl,
        heat: heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    })
    sauce
    .save()
    .then((res)=> console.log("Sauce enregistré", res))
    .catch((err)=> console.error(err))
}

module.exports = { getSauces, createSauce }