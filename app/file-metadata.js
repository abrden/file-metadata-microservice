'use strict';

var multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var uploadFile = multer({ storage: storage }).single('user-file');

module.exports = function (app, File) {
    
    app.post('/result', function(req, res) {
        
        uploadFile(req, res, function(err) {
            if (err) throw err;
            
            var fileEntry = {
                name: req.file.originalname,
                size: req.file.size
            };
            
            (new File(fileEntry)).save(function(err, file) {
                if (err) throw err;
            });
            
            fs.unlinkSync("./uploads/" + req.file.filename);
            
            res.json(fileEntry);
        });
    });
};