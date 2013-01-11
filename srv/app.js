var fs = require('fs');
var path = require('path');
var util = require('util')
var express = require('express');
var app = express();
var mmm = require('mmmagic');
var mime = new mmm.Magic(mmm.MAGIC_MIME_TYPE);

var pub = path.normalize(__dirname + '/../pub/');

var fosCounter = 0;

app.get('/counter', function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.send({ message: 'Hello World!', counter: ++fosCounter });
  res.end();
});

app.all('/(core.html)?', function(req, res) {
  res.writeHeader(200, { "Content-Type": "text/html" });
  res.end(fs.readFileSync(pub + 'core.html', 'utf8'));
});

app.all('/manifest.webapp', function(req, res) {
  res.writeHeader(200, { "Content-Type": "application/json" });
  res.end(fs.readFileSync(pub + 'manifest.webapp', 'utf8'));
});

app.get('/js/:filename', function(req, res) {
  var filePath = 'js/' + req.params.filename;
  fs.exists(pub + filePath, function(exists) {
    if (exists) {
      res.writeHeader(200, { "Content-Type": "text/javascript" });
      var stream = fs.createReadStream(pub + filePath);
      util.pump(stream, res, function(err) { });
    } else {
      res.writeHeader(404);
      res.end();
    }
  });
});

app.get('/css/:filename', function(req, res) {
  var filePath = 'css/' + req.params.filename;
  fs.exists(pub + filePath, function(exists) {
    if (exists) {
      res.writeHeader(200, { "Content-Type": "text/css" });
      res.end(fs.readFileSync(pub + filePath, 'utf8'));
    } else {
      res.writeHeader(404);
      res.end();
    }
  });
});

app.get('/img/:filename', function(req, res) {
  var filePath = 'img/' + req.params.filename;
  fs.exists(pub + filePath, function(exists) {
    if (exists) {
      mime.detectFile(pub + filePath, function(err, type) {
        res.writeHeader(200, {
          "Content-Type": type
        });
        var stream = fs.createReadStream(pub + filePath);
        util.pump(stream, res, function(err) { });
      });
    } else {
      res.writeHeader(404);
      res.end();
    }
  });
});

app.all('*', function(req, res) {
  res.statusCode = 404;
  res.send({ error: true, message: 'nothing here..' });
  res.end();
});

app.listen(8002);
console.log('running');