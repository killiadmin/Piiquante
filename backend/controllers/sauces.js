const mongoose = require("mongoose");
const { unlink } = require("fs").promises;

const sauceSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    //likes et dislikes
    likes:  Number,
    dislikes: Number,
    usersLiked: [String],
    usersDisliked: [String]
});

const Sauce = mongoose.model("Sauce", sauceSchema);

//Requete GET pour aller chercher les sauces crée
function getSauces(req, res) {
    // Sauce.deleteMany({}).then(console.log).catch(console.error())
    Sauce
    .find({})
    .then(sauces => res.send(sauces))
    .catch((err) => res.status(500).send(err));
};

//Affiche les toutes les sauces dans "All Sauces"
function getSauceId(req, res) {
    const id = req.params.id;

    Sauce
    .findById(id)
    .then(sauce => res.send(sauce))
    .catch((err) => res.status(500).send(err));
};

// Supprime la sauce du tableau
function deleteSauce(req, res) {
    const id = req.params.id;
    
    Sauce.findByIdAndDelete(id)
    .then(sauce => deleteFileImage(sauce))
    .then(sauce => res.send({ message: sauce }))
    .catch((err) => res.status(500).send({ message : err }));
};

// Supprime l'image du fichiers "images"
function deleteFileImage(sauce) {
    const fileSplit = sauce.imageUrl.split('/')[4];
    unlink(`images/${fileSplit}`);
    return sauce;
}

//Modifie une sauce existante
function modifySauce(req, res) {
    const {
        params: { id }
    } = req;
    
    const { body } = req
    // Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id})
    
    Sauce.findByIdAndUpdate(id, body)
    .then((response) => {
        if (response != null) {
            console.log("La modification c'est bien passé!", response)
            res.status(200).send ({ message: "Ton objet a bien été modifié!"})
        } else {
            console.log("La modificiation a échoué!", response)
            res.status(404).send({ message: "Ton objet est introuvable!"})
        }})
    .catch(error => console.error("Il y a eu un probleme, catch", error)) 
}

//Ajouter une sauce, formulaire
function createSauce(req, res) {
    const objSauce = JSON.parse(req.body.sauce);
    const { name, manufacturer, description, mainPepper, heat, userId } = objSauce;
    const imageUrl = req.protocol + "://" + req.get("host") + "/images/" + req.file.filename

    const sauce = new Sauce({
        userId, name, manufacturer, description, mainPepper, imageUrl, heat,
        likes: 0, 
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });

    sauce
    .save()
    .then((message)=> res.status(201).send({ message }))
    .catch((err)=> res.status(500).send(err));
};

module.exports = { getSauces, createSauce, getSauceId, deleteSauce, modifySauce };