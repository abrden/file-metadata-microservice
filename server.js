'use strict';

var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/img-search',
    routes = require('./app/routes/index.js'),
    fileMeta = require('./app/file-metadata.js'),
    port = process.env.PORT || 8080;

var File = mongoose.model('File', new Schema({
  name: String,
  size: Number
}));

mongoose.connect(mongoUri);

routes(app);
fileMeta(app, File);

app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', this.address().port, app.settings.env);
});