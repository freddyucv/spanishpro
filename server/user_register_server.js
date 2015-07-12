var express = require('express');
var router = express.Router();
var util_server = require('./util/server_util.js');
var service = require('./register_server_service.js');
var aws = require('aws-sdk');

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;

router.post('/users',function(req, res) {
  console.log("Recibiendo peticion para registrar usuario " + JSON.stringify(req.body));
 
  service.newUser({
                    user: req.body,
                    successCallback: function(){
                                                util_server.okResponse(res);
                                              }, 
                    errorCallback:  function(message){
                                        util_server.failRegisterResponse(res, message);
                                    }
                    
                  });
});

router.get('/users/:idUser',function(req, res) {
  console.log("pediendo informacion del usuario " + req.params.idUser);
 
  service.getUser({
                    userId: req.params.idUser,
                    successCallback: function(user){
                                               res.json(user);
                                              }, 
                    errorCallback:  function(message){
                                        util_server.failRegisterResponse(res, message);
                                    }
                    
                  });
});

router.put('/users/reset_password',function(req, res) {
  console.log("Recibiendo peticion para reinicio de password " + JSON.stringify(req.body));
 
  service.resetpassword({
                    userId: req.body.userId,
                    password: req.body.password,
                    successCallback: function(){
                                                util_server.okResponse(res);
                                              }, 
                    errorCallback:  function(message){
                                        util_server.failRegisterResponse(res, message);
                                    }
                    
                  });
});

router.put('/users/forget_password',function(req, res) {
  console.log("Recibiendo peticion para reinicio de password " + JSON.stringify(req.body));
 
  service.forgetPassword({
                    login: req.body.login,
                    successCallback: function(){
                                                util_server.okResponse(res);
                                              }, 
                    errorCallback:  function(message){
                                        util_server.failRegisterResponse(res, message);
                                    }
                    
                  });
});

router.put('/users/login',function(req, res) {
  console.log("Recibiendo peticion de login " + JSON.stringify(req.body));
 
  service.login({
                    login: req.body.login,
                    password: req.body.password,
                    successCallback: function(user){
                                                res.json(user);
                                              }, 
                    errorCallback:  function(message){
                                        util_server.failForbiddenResponse(res, message);
                                    }
                    
                  });
});

router.post('/users/:idUser',function(req, res) {
  console.log("Guardando info del ususraio " + JSON.stringify(req.body));
 
  service.updateUser({
                    user: req.body,
                    userId: req.params.idUser,
                    successCallback: function(user){
                                               res.json(user);
                                              }, 
                    errorCallback:  function(message){
                                        util_server.failRegisterResponse(res, message);
                                    }
                    
                  });
});

router.get('/sign_s3', function(req, res){
    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
    
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
});

/*function emailRegisterError(res) {
    res.status(500);
    res.send("El Correo ya esta registrado / Email already registered");  
}*/



module.exports = router;