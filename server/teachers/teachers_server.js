var express = require('express');
var router = express.Router();
var util_server = require('../util/server_util.js');
var service = require('./teachers_service.js');

router.get('/teachers',function(req, res) {
    console.log("Recibiendo");

   service.getTeachers({
                                successCallback: function(data){
                                                    res.json(data);
                                },
                                errorCallback:  function(message){
                                    util_server.failForbiddenResponse(res, message);
                                }    
                            });
});

router.get('/teachers_payment',function(req, res) {
    console.log("Recibiendo peticion por los pagos de los profesores");

   service.getTeachersPayment({
                                successCallback: function(data){
                                                    res.json(data);
                                },
                                errorCallback:  function(message){
                                    util_server.failForbiddenResponse(res, message);
                                }    
                            });
});

module.exports = router;