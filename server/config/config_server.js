var express = require('express');
var router = express.Router();
var util_server = require('../util/server_util.js');
var service = require('./config_service.js');

router.get('/config',function(req, res) {
  console.log("Recibiendo peticion para cargar configuracion ");
 
  service.loadConfig({
                    successCallback: function(config){
                                                res.json(config);
                                              }, 
                    errorCallback:  function(message){
                                        util_server.failForbiddenResponse(res, message);
                                    }
                    
                  });
});

router.post('/config',function(req, res) {
  console.log("Recibiendo peticion para guardar configuracion " + JSON.stringify(req.body));
 
  service.saveConfig({
                    config: req.body,
                    successCallback: function(config){
                                                util_server.okResponse(res);
                                              }, 
                    errorCallback:  function(message){
                                        util_server.failForbiddenResponse(res, message);
                                    }
                    
                  });
});

router.get('/combos',function(req, res) {
  console.log("Recibiendo peticion para cargar Combos ");
 
  service.loadCombos({
                    successCallback: function(combos){
                                                res.json(combos);
                                              }, 
                    errorCallback:  function(message){
                                        util_server.failForbiddenResponse(res, message);
                                    }
                    
                  });
});

router.post('/combos',function(req, res) {
  console.log("Recibiendo peticion para guardar Combos " + JSON.stringify(req.body));
 
  service.saveCombos({
                    combos: req.body,
                    successCallback: function(config){
                                                util_server.okResponse(res);
                                              }, 
                    errorCallback:  function(message){
                                        util_server.failForbiddenResponse(res, message);
                                    }
                    
                  });
});


module.exports = router;