/**
 * On utilise password-validator pour filtrer les saisie de mot de passe afin qu'il soit un minimum complexe.
 * Il devra faire entre 8 et 25 caractere avec au moins un chiffre et pas d'espace
 */

const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();
passwordSchema
.is().min(8)
.is().max(25)
.has().digits(1)
.has().not().spaces()

module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        next();
    } else {
        return res.status(400).json({ error : "Le mdp doit comporte au moins 1 chiffres et sans espace, de 8 caractère min."
        + passwordSchema.validate('req.body.password', {list: true})});
    };
};