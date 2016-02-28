'use strict';

//var fs = require('fs');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var uploadFile = multer({ storage: storage }).single('userFile');


module.exports = function (app, File) {
    
    app.post('/upload', function(req, res) {
        
        uploadFile(req, res, function(err) {
            if (err) throw err;
            
            var fileEntry = {
                name: req.file.originalname, //req.file.filename
                size: req.file.size
            };
            
            (new File(fileEntry)).save(function(err, file) {
                if (err) throw err;
            });
            
            //fs.unlinkSync("./uploads/" + req.file.filename);
            res.send(fileEntry);
        });
    });
};