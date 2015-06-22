var express = require('express');
var router = express.Router();
var util_server = require('../util/server_util.js');
var service = require('./pages_service.js');

router.get('/pages',function(req, res) {
  console.log("Recibiendo peticion para cargar paginas estaticas ");
 
  service.getPages({
                    successCallback: function(pagesConfig){
                                                res.json(pagesConfig);
                                              }, 
                    errorCallback:  function(message){
                                        util_server.failForbiddenResponse(res, message);
                                    }
                    
                  });
});

router.post('/pages',function(req, res) {
  console.log("Recibiendo peticion para guardar contenidos de paginas estaticas");
 
  service.savePages({
                    pagesConfig: req.body,
                    successCallback: function(){
                                                util_server.okResponse(res);
                                              }, 
                    errorCallback:  function(message){
                                        util_server.failForbiddenResponse(res, message);
                                    }
                    
                  });
});

module.exports = router;