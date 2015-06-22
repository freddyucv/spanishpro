var express = require('express');
var router = express.Router();
var util_server = require('../util/server_util.js');
var service = require('./contact_service.js');


router.post('/contact_admin',function(req, res) {
  console.log("Receibiendo peticion de contacto con el administrador");
 
  service.sendEmailToAdmin({
                    email: req.body.email,
                    content: req.body.content,
                    userName: req.body.userName,
                    successCallback: function(data){
                                                util_server.okResponse(res);
                                              }, 
                    errorCallback:  function(message){
                                        util_server.failForbiddenResponse(res, message);
                                    }
                    
                  });
});

module.exports = router;