var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://spanishpro:spanishpro@dbh04.mongolab.com:27047/spanishprodb";

var count = 0;

MongoClient.connect(uri,
        function(error, db){    
               
               if (error) {
                 throw error;  
               }
               
               var collection = db.collection("users");
  
                            
               for (var i = 0; i < 50 ; i++){
                    var object = {
                          
                            "name": "Eitan Toro",
                            "login": "Eitan Toro",
                            "email": "toroeitan@yahoo.com",
                            "country": "AG",
                            "skype": "sisisi",
                            "tokens": 1,
                            "type": "Teacher",
                            "time": -300,
                            "newUser": false,
                            "password": "Y2FyYWJhbGxv",
                            "dayofBirth": "0708",
                            "picture": "https://spanishpro.s3.amazonaws.com/5599c3abdd61e71100c7f050.06.03.jpg",
                            "hobbies": "Me gusta leer y escribir mucho.",
                            "expertice": "Hola quiero aprender francés.",
                            "bills" : [
                                         {
                                            "orderNumber": "-",
                                            date: new Date(),
                                            totalTokens: -1,
                                            totalPrice: "-",
                                            check: true,
                                            
                                            items: [
                                                {
                                                    name: "Reservacion / Reserved",
                                                    price: "-",
                                                    quantity: 1,
                                                }
                                            ]
                                       },
                                         {
                                            "orderNumber": "-",
                                            date: new Date(),
                                            totalTokens: -1,
                                            totalPrice: "-",
                                            check: true,
                                            
                                            items: [
                                                {
                                                    name: "Reservacion / Reserved",
                                                    price: "-",
                                                    quantity: 1,
                                                }
                                            ]
                                       },
                                         {
                                            "orderNumber": "-",
                                            date: new Date(),
                                            totalTokens: -1,
                                            totalPrice: "-",
                                            check: true,
                                            
                                            items: [
                                                {
                                                    name: "Reservacion / Reserved",
                                                    price: "-",
                                                    quantity: 1,
                                                }
                                            ]
                                       },
                                         {
                                            "orderNumber": "-",
                                            date: new Date(),
                                            totalTokens: -1,
                                            totalPrice: "-",
                                            check: true,
                                            
                                            items: [
                                                {
                                                    name: "Reservacion / Reserved",
                                                    price: "-",
                                                    quantity: 1,
                                                }
                                            ]
                                       },
                                         {
                                            "orderNumber": "-",
                                            date: new Date(),
                                            totalTokens: -1,
                                            totalPrice: "-",
                                            check: true,
                                            
                                            items: [
                                                {
                                                    name: "Reservacion / Reserved",
                                                    price: "-",
                                                    quantity: 1,
                                                }
                                            ]
                                       },
                                         {
                                            "orderNumber": "-",
                                            date: new Date(),
                                            totalTokens: -1,
                                            totalPrice: "-",
                                            check: true,
                                            
                                            items: [
                                                {
                                                    name: "Reservacion / Reserved",
                                                    price: "-",
                                                    quantity: 1,
                                                }
                                            ]
                                       },
                                         {
                                            "orderNumber": "-",
                                            date: new Date(),
                                            totalTokens: -1,
                                            totalPrice: "-",
                                            check: true,
                                            
                                            items: [
                                                {
                                                    name: "Reservacion / Reserved",
                                                    price: "-",
                                                    quantity: 1,
                                                }
                                            ]
                                       },
                                         {
                                            "orderNumber": "-",
                                            date: new Date(),
                                            totalTokens: -1,
                                            totalPrice: "-",
                                            check: true,
                                            
                                            items: [
                                                {
                                                    name: "Reservacion / Reserved",
                                                    price: "-",
                                                    quantity: 1,
                                                }
                                            ]
                                       },
                                         {
                                            "orderNumber": "-",
                                            date: new Date(),
                                            totalTokens: -1,
                                            totalPrice: "-",
                                            check: true,
                                            
                                            items: [
                                                {
                                                    name: "Reservacion / Reserved",
                                                    price: "-",
                                                    quantity: 1,
                                                }
                                            ]
                                       },
                                         {
                                            "orderNumber": "-",
                                            date: new Date(),
                                            totalTokens: -1,
                                            totalPrice: "-",
                                            check: true,
                                            
                                            items: [
                                                {
                                                    name: "Reservacion / Reserved",
                                                    price: "-",
                                                    quantity: 1,
                                                }
                                            ]
                                       },
                                        {
                                            "orderNumber": "-",
                                            date: new Date(),
                                            totalTokens: -1,
                                            totalPrice: "-",
                                            check: true,
                                            
                                            items: [
                                                {
                                                    name: "Reservacion / Reserved",
                                                    price: "-",
                                                    quantity: 1,
                                                }
                                            ]
                                       },
                                         {
                                            "orderNumber": "-",
                                            date: new Date(),
                                            totalTokens: -1,
                                            totalPrice: "-",
                                            check: true,
                                            
                                            items: [
                                                {
                                                    name: "Reservacion / Reserved",
                                                    price: "-",
                                                    quantity: 1,
                                                }
                                            ]
                                       },
                                         {
                                            "orderNumber": "-",
                                            date: new Date(),
                                            totalTokens: -1,
                                            totalPrice: "-",
                                            check: true,
                                            
                                            items: [
                                                {
                                                    name: "Reservacion / Reserved",
                                                    price: "-",
                                                    quantity: 1,
                                                }
                                            ]
                                       },
                                         {
                                            "orderNumber": "-",
                                            date: new Date(),
                                            totalTokens: -1,
                                            totalPrice: "-",
                                            check: true,
                                            
                                            items: [
                                                {
                                                    name: "Reservacion / Reserved",
                                                    price: "-",
                                                    quantity: 1,
                                                }
                                            ]
                                       },
                                         {
                                            "orderNumber": "-",
                                            date: new Date(),
                                            totalTokens: -1,
                                            totalPrice: "-",
                                            check: true,
                                            
                                            items: [
                                                {
                                                    name: "Reservacion / Reserved",
                                                    price: "-",
                                                    quantity: 1,
                                                }
                                            ]
                                       },
                                         {
                                            "orderNumber": "-",
                                            date: new Date(),
                                            totalTokens: -1,
                                            totalPrice: "-",
                                            check: true,
                                            
                                            items: [
                                                {
                                                    name: "Reservacion / Reserved",
                                                    price: "-",
                                                    quantity: 1,
                                                }
                                            ]
                                       },
                                         {
                                            "orderNumber": "-",
                                            date: new Date(),
                                            totalTokens: -1,
                                            totalPrice: "-",
                                            check: true,
                                            
                                            items: [
                                                {
                                                    name: "Reservacion / Reserved",
                                                    price: "-",
                                                    quantity: 1,
                                                }
                                            ]
                                       },
                                         {
                                            "orderNumber": "-",
                                            date: new Date(),
                                            totalTokens: -1,
                                            totalPrice: "-",
                                            check: true,
                                            
                                            items: [
                                                {
                                                    name: "Reservacion / Reserved",
                                                    price: "-",
                                                    quantity: 1,
                                                }
                                            ]
                                       },
                                         {
                                            "orderNumber": "-",
                                            date: new Date(),
                                            totalTokens: -1,
                                            totalPrice: "-",
                                            check: true,
                                            
                                            items: [
                                                {
                                                    name: "Reservacion / Reserved",
                                                    price: "-",
                                                    quantity: 1,
                                                }
                                            ]
                                       },
                                         {
                                            "orderNumber": "-",
                                            date: new Date(),
                                            totalTokens: -1,
                                            totalPrice: "-",
                                            check: true,
                                            
                                            items: [
                                                {
                                                    name: "Reservacion / Reserved",
                                                    price: "-",
                                                    quantity: 1,
                                                }
                                            ]
                                       }                                         
                                       ]
                            };
                            
                    collection.insert(object, {w: 1}, function (err, records){
                                                            if (!err){     
                                                             console.log("Insertado exitosamente " + (count++));
                                                            }else{
                                                             console.log("ERROR " + err);                                                        
                                                            }
                                                         });
                    
               }               
        });
