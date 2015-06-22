var express = require('express');
var router = express.Router();
var util_server = require('../util/server_util.js');
var service = require('./classs_service.js');

router.get('/classs/:userId',function(req, res) {
  console.log("Recibiendo peticion para consultar las clases del usuario " + req.params.userId);
 
  service.getClass({
                    userId: req.params.userId,
                    successCallback: function(data){
                                                res.json(data);
                                              }, 
                    errorCallback:  function(message){
                                        util_server.failForbiddenResponse(res, message);
                                    }
                    
                  });
});

router.post('/class',function(req, res) {
  console.log("Agendar Clase " + JSON.stringify(req.body));
 
  service.bookClass({
                    data: req.body,
                    successCallback: function(config){
                                                util_server.okResponse(res);
                                              }, 
                    errorCallback:  function(message){
                                        util_server.failRegisterResponse(res, message);
                                    }
                    
                  });
});

router.put('/classs/:classsId/cancel', function(req, res){
  console.log("cancelar clase: " + req.params.classsId + " Cancelada por: " + req.body.userId);  

  service.cancel({
                    classsId: req.params.classsId,
                    userId: req.body.userId,
                    reverseTokens: req.body.reverseTokens,
                    fatalWarnning: req.body.fatalWarnning,
                    successCallback: function(config){
                                                util_server.okResponse(res);
                                              }, 
                    errorCallback:  function(message){
                                        util_server.failRegisterResponse(res, message);
                                    }
                 });  
});

router.put('/:userId/class/reserve/:classId',function(req, res) {
  console.log("Reserva de  Clase " + req.params.classId);
  console.log("req.body.userTime " + req.body.userTime);
 
  service.reserveClass({
                    classId: req.params.classId,
                    userId: req.params.userId,
                    idClassBookSameTime: req.body.idClassBookSameTime,
                    userTime: req.body.userTime,
                    successCallback: function(config){
                                                util_server.okResponse(res);
                                              }, 
                    errorCallback:  function(message){
                                        util_server.failRegisterResponse(res, message);
                                    }
                    
                  });
});

router.post('/calendar',function(req, res) {
  console.log("Obtener calendario " + JSON.stringify(req.body));
 
  service.getCalendar({
                    filter: req.body,
                    successCallback: function(calendar){
                                                res.json(calendar);
                                              }, 
                    errorCallback:  function(message){
                                        util_server.failForbiddenResponse(res, message);
                                    }
                    
                  });
});

router.get('/classs_canceled',function(req, res) {
  console.log("Recibiendo peticion para consultar las clases canceladas");
 
  service.getCancelClass({
                    successCallback: function(data){
                                                res.json(data);
                                              }, 
                    errorCallback:  function(message){
                                        util_server.failForbiddenResponse(res, message);
                                    }
                    
                  });
});

router.put('/classs/payment',function(req, res) {
  console.log("Pago de clases " + JSON.stringify(req.body.payments));
 
  service.payments({
                    payments: req.body.payments,
                    successCallback: function(config){
                                                util_server.okResponse(res);
                                              }, 
                    errorCallback:  function(message){
                                        util_server.failForbiddenResponse(res, message);
                                    }
                    
                  });
});

router.get('/classs_reserved_done',function(req, res) {
  console.log("Recibiendo peticion para consultar las clases Reservadas y terminadas");
 
  service.getReservedDoneClass({
                    successCallback: function(data){
                                                res.json(data);
                                              }, 
                    errorCallback:  function(message){
                                        util_server.failForbiddenResponse(res, message);
                                    }
                    
                  });
});
module.exports = router;