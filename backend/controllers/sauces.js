//On utilise FileSystem (fs) pour manipuler le système de fichiers
const { unlink } = require("fs").promises;
const{ likeSauce } = require("./like")
const Sauce = require("../models/Sauce")

//Requete GET pour aller chercher les sauces crées
function getSauces(req, res) {
    Sauce
    .find({})
    .then(sauces => res.send(sauces))
    .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Il y a un problème d'affichage des produits!"});
})};

//Requete GET pour aller chercher la sauce que l'on souhaite consulter à l'aide de son id 
function getSauceId(req, res) {
    const id = req.params.id;

    Sauce
    .findById(id)
    .then(sauce => res.send(sauce))
    .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Il y a un problème d'affichage du produits!"});
})};

// Requete DELETE pour supprimer un produit 
function deleteSauce(req, res) {
    const id = req.params.id;
    
    Sauce.findByIdAndDelete(id)
    .then(sauce => {
        if (sauce != null) {
            res.status(200).send({ message: "Le produit a bien été supprimé!"});
            return sauce
        } else {
            res.status(404).send({ message: "Le produit est introuvable dans la base de données!"});
        }
    })
    .then(product => deleteImage(product))
    .catch((err) => {
        console.error(err);
        res.status(500).send({ message : "Le produit n'a pas pu être supprimer!"});
})};

/**
 * Requete PUT qui va gérer la modification du body ou alors la modification de l'image. 
 * Erreur gérer : Si le produit est supprimer de la base de données, une erreur est renvoyer. 
 */
function modifySauce(req, res) {
    const {params: { id }
    } = req;

    const hasModifyImage = req.file != null;
    const bodyRequest = putBodyRequest(hasModifyImage, req);
    
    Sauce.findByIdAndUpdate(id, bodyRequest)
    .then((product) => {
        if (product != null) {
            res.status(200).send ({ message: "Le produit a bien été modifié!"});
            return product
        } else {
            return res.status(404).send({ message: "Le produit est introuvable dans la base de données!"});
        }})
    .then((product) => deleteImage(product, hasModifyImage))
    .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Il y a eu un probleme pour modifier le produit!" });
})};

/**
 * Fonction qui nous permet de supprimer l'image du dossier images avec la méthode unlink,
 * unlink est utilisée pour supprimer un fichier du système de fichiers.
 */

function deleteImage(product, hasModifyImage) {
    if (hasModifyImage === false) {
        return;
    }else{
        const imageToDelete = product.imageUrl.split("/").at(-1);
        return unlink("images/" + imageToDelete);
    };
};

/**
 * On utilise dans cette fonction la propriété req.protocol qui contient la chaîne de protocole de requête qui est HTTP 
 * cette propriété utilise la valeur du champ d'en-tête X-Forwarded-Proto si elle est présente.
 */

function protocolImageUrl(req) {
    return req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
};

/**
 * Cette fonction va gérer la modification des images, si la requete PUT modifie seulement le body, il retourne seulementle body sans l'image
 * sinon le body + l'image url est renvoyé 
 */

function putBodyRequest(hasModifyImage, req) {
    if (hasModifyImage == false) {
        return req.body;
    } else {
        const requestBody = JSON.parse(req.body.sauce);
        requestBody.imageUrl = protocolImageUrl(req);
        return requestBody;
    };  
};

/**
 * fonction qui nous permet de crée un produit en injectant toutes les informations necesaire, 
 * qui est ensuite sauvegarder et envoyé dans la base de données
 */

function createSauce(req, res) {
    const objSauce = JSON.parse(req.body.sauce);
    const { name, manufacturer, description, mainPepper, heat, userId } = objSauce;
    const imageUrl = protocolImageUrl(req)

    const sauce = new Sauce({
        userId, name, manufacturer, description, mainPepper, imageUrl, heat,
        likes: 0, 
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });

    sauce
    .save()
    .then(() => res.status(201).send({ message : "Le produit a bien été crée!" }))
    .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Il y a eu un probleme pour crée le produit!" });
})};

module.exports = { getSauces, createSauce, getSauceId, deleteSauce, modifySauce, likeSauce };