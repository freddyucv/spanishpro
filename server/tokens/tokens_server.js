var express = require('express');
var router = express.Router();
var util_server = require('../util/server_util.js');
var service = require('./tokens_service.js');

router.get('/co_return',function(req, res) {
    console.log("Compra de tokens: Usuario " + req.query.userid);

    var totalItems = req.query.total_items; 
    
    var optsBuyProccess = {                    
                            items: [],
                            totalTokens: parseFloat(req.query.total_tokens),
                            totalPrice:parseFloat(req.query.total_price),
                            orderNumber: req.query.order_number,
                            check: false
                          }
                          
    for (var i = 0; i < totalItems; i++){
        var name = req.query["li_" + i + "_name"];
        var price = parseFloat(req.query["li_" + i + "_price"]);
        var quantity = parseFloat(req.query["li_" + i + "_quantity"]);
        
        optsBuyProccess.items.push({
                                        name: name,
                                        price: price,
                                        quantity: quantity
                                   });
    }
    
    console.log(JSON.stringify(optsBuyProccess));
    
    service.addBill({
                        idUser: req.query.userid,                        
                        valid: false,
                        bill: optsBuyProccess,
                        successCallback: function(config){
                                                    res.redirect("index.html#/tokens?reload_user");
                                                  }, 
                        errorCallback:  function(message){
                                            util_server.failForbiddenResponse(res, message);
                                        }                        
                    });
});

router.get('/unvalid_tokens',function(req, res) {
    console.log("Recibiendo");

   service.getUnvalidTokens({
                                successCallback: function(data){
                                                    res.json(data);
                                },
                                errorCallback:  function(message){
                                    util_server.failForbiddenResponse(res, message);
                                }    
                            });
});

router.post('/validate_tokens',function(req, res) {
    console.log("Validando tokens " + JSON.stringify(req.body));

   service.validateTokens({
                            validate: req.body
                            });
   
   util_server.okResponse(res);
});

router.get('/students/tokens',function(req, res) {
    console.log("Recibiendo peticion para obtener conteo de tokens general");

   service.getStudentsTokens({
                                successCallback: function(data){
                                                    res.json(data);
                                },
                                errorCallback:  function(message){
                                    util_server.failForbiddenResponse(res, message);
                                }    
                            });
});

router.post('/students/tokens',function(req, res) {
    console.log("Modificando tokens: " + JSON.stringify(req.body));

   service.incrementStudentsTokens({
                                data: req.body,
                                successCallback: function(data){
                                                    res.json(data);
                                },
                                errorCallback:  function(message){
                                    util_server.failForbiddenResponse(res, message);
                                }    
                            });
});

module.exports = router;

