var express = require('express');
var router = express.Router();
var util_server = require('./util/server_util.js');
var service = require('./register_server_service.js');

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

/*function emailRegisterError(res) {
    res.status(500);
    res.send("El Correo ya esta registrado / Email already registered");  
}*/



module.exports = router;