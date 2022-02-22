const multer = require("multer");

/**
 * Objet de config. qui contient 2 éléments : destination et filename.
 * On utilise Multer avec la méthode diskStorage; Filename va générer le nom du fichier et élimine les tirets avec replace,
 * La cb génère ensuite un nom avec l'ajout d'un time-stamp + le nom de l'image
 */

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename : function (req, file, cb) {
        cb(null, useFileName(req, file));
    }});

    function useFileName(req, file) {
        const fileName = `${Date.now()}-${file.originalname}`.replace(/\s/g, "-")
        file.fileName = fileName;
        return fileName;
    };

/**
 * Export du middleware multer configuré en passant l'objet storage, 
 *  avec single pour un fichier image unique
 */ 

const uploadImage = multer({ storage: storage});

module.exports = { uploadImage };