var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer  = require('multer');
var fs = require('fs');

var users = require('./server/user_register_server.js');
var config = require('./server/config/config_server.js');
var tokens = require('./server/tokens/tokens_server.js');
var teachers = require('./server/teachers/teachers_server.js');
var classs = require('./server/classs/classs_server.js');
var pages = require('./server/pages/pages_server.js');
var contact = require('./server/contact/contact_server.js');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

var fileDone;

app.use(multer({ dest: './spanishpro/uploadFile',

    onFileUploadStart: function (file) {
      console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
      fileDone = file;
      console.log(file.fieldname + ' uploaded to  ' + file.path)
      done=true;
    }
}));

app.use('/spanishpro', users);
app.use('/spanishpro', config);
app.use('/spanishpro', tokens);
app.use('/spanishpro', teachers);
app.use('/spanishpro', classs);
app.use('/spanishpro', pages);
app.use('/spanishpro', contact);


app.use(function (req, res, next) {
  var isHtmlJs = req.path.indexOf("html") != -1;
  
  if (isHtmlJs) {
    res.setHeader('Content-Type','text/html; charset=ISO-8859-1');
  }
  
  next();
});

app.post('/spanishpro/uploadFile', function(req, res){
   if(fileDone){
      console.log("Recibiendo archivo " + req);
      res.send(fileDone.path);
   }
});

app.get('/*', function(req, res){
  res.sendFile(__dirname + req.path);
});

process.on('uncaughtException', function (err) {
  console.log("ERROR " + err.stack);
})

var port = process.env.PORT || 1234;

//var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
//var port = process.env.OPENSHIFT_NODEJS_PORT || 1234;

app.listen(port);
console.log("Server started...");

