const multer = require("multer");

const storage = multer.diskStorage({
    destination: "images/",
    filename: function (req, file, cb) {
        cb(null, useFileName(req, file));
    }});

    function useFileName(req, file) {
    const fileName = `${Date.now()}-${file.originalname}`;
    file.fileName = fileName;
    return fileName;
};

const uploadImage = multer({ storage: storage});

module.exports = { uploadImage }