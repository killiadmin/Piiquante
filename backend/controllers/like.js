const Sauce = require('../models/Sauce')

/**
 * Cette fonction va nous checker different points et de conditions avant de pouvoir envoyer un .then(200) = Le like est envoyé.
 * On utilise includes pour gérer le cas d'erreur si une autre valeur que 1, 0 ou -1 est intégré dans le tableau des likes 
 */

function likeSauce(req, res) {
    const { like, userId } = req.body;
    const { id } = req.params

    if(![0, -1, 1].includes(like)) return res.status(403).send({message : "La valeur du like est invalid!"})

    Sauce.findById(id)
        .then((product) => likeVote(product, like, userId, res))
        .then(saveProd => saveProd.save())
        .then((product) => {
            if (product != null) {
                res.status(200).send ({ message: "Le produit a bien été liké!"});
                return product
            } else {
                return res.status(404).send({ message: "Le produit est introuvable dans la base de données!"});
            }})
        .catch(()=> res.status(500).send({ message: "Il y a eu un problème lors de la validation du like!"}))
}

/**
 * Si la valeur du like est 1 ou -1, la fonction "InjectVote" est invoqué sinon 
 * c'est que c'est la valeur 0 qui est demander donc on retourne la fonction decreaseVote
 */

function likeVote(product, like, userId, res) {
    if (like === 1 || like === -1) return injectVote(product, userId, like)
    return decreaseVote(product, userId, res)
}

/**
 * Pour la gestion de nos like, on utilise un opérateur conditionnel qui va comporter 3 opérandes.
 * Le like sera attribué selon la demande de requete si c'est pour le usersLiked ou bien usersDisliked,
 * pour ensuite être push dans le tableau dédié et attribué le vote au like ou au dislike.
 */

function injectVote(product, userId, like) {
    const { usersLiked, usersDisliked} = product;
    const arrayVote = like === 1 ? usersLiked : usersDisliked;
    if ([usersLiked, usersDisliked].every((array) => array.includes(userId)))
    return res.status(500).send({ message: "L'utilisateur à déjà voté!"});

    if (arrayVote.includes(userId)) return product;
    arrayVote.push(userId);

    like === 1 ? ++product.likes : ++product.dislikes;
    return product;
};

/**
 * Fonction qui nous permet d'enlever un vote, Les conditions d'erreur sont gérés, l'utilisateur ne peut pas voter deux fois,
 * et il ne peut pas avoir de vote "actif" si il n'a pas déjà voté.
 * On utilise ensuite la methode filter pour generer un nouveau tableau sans l'id concerné de l'utilisateur
 */

function decreaseVote(product, userId, res) {
    const { usersLiked, usersDisliked} = product;

    if ([usersLiked, usersDisliked].every((array) => array.includes(userId)))
    return res.status(500).send({ message: "L'utilisateur à déjà voté!"});

    if (![usersLiked, usersDisliked].some(array => array.includes(userId)))
    return res.status(500).send({ message: "L'utilisateur n'a pas voté!"});

    if (usersLiked.includes(userId)){
        --product.likes;
        product.usersLiked = product.usersLiked.filter((id) => id !== userId);
    } else {
        --product.dislikes;
        product.usersDisliked = product.usersDisliked.filter((id) => id !== userId);
    }
    return product;
};

module.exports = { likeSauce };