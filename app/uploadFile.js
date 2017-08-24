var multer = require('multer');
var Profile = require('./models/profile');
const PROFILE_UPLOADS_PATH = '../images/uploads/';

function getFileOriginalExtension(filename) {
    return filename.split('.').pop();
}

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/images/uploads')
    },
    filename: function (req, file, callback) {
        callback(null, 'user' + req.user._id + '.' + getFileOriginalExtension(file.originalname));
    }
});

var allowedImageMimetypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        callback(null, allowedImageMimetypes.indexOf(file.mimetype) >= 0);
    }
});

module.exports = function (app) {
    app.post('/api/upload', upload.single('file'), function (req, res) {
        if (!req.file) {
            return res.status(400).json({ error: 'Only images allowed!' });
        }

        Profile.findByIdAndUpdate(req.body.userId, { $set: { profileImg: PROFILE_UPLOADS_PATH + req.file.filename } },
            function (err) {
                if (err) {
                    res.send(err);
                }

                res.status(200).json({ filename: req.file.filename });
            });
    });
};