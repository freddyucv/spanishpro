var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

//var db = new mongodb.Db('spanishproDB', new mongodb.Server('localhost', 27017));
//var db = new mongodb.Db('spanishprodb', new mongodb.Server('dbh04.mongolab.com', 27047));

var uri = "mongodb://localhost:27017/spanishproDB";
//var uri = "mongodb://spanishpro:spanishpro@dbh04.mongolab.com:27047/spanishprodb";
//var uri = "mongodb://spanishpro:spanishpro@apollo.modulusmongo.net:27017/ururYq7u";
                     
module.exports = {
                  /**
                   * @param insert.collectionName
                   * @param insert.object
                   * @param insert.successCallback
                   * @param insert.errorCallback
                   */                  
                  insert: function(insert){
                     console.log("Guardando en BD");
                     
                     MongoClient.connect(uri,
                            function(error, db){    
                                   
                                   if (error) {
                                     throw error;  
                                   }
                                   
                                   var collection = db.collection(insert.collectionName);
                                   
                                   collection.insert(insert.object, {w: 1}, function (err, records){
                                                                            if (err && insert.errorCallback) {
                                                                              insert.errorCallback(err);  
                                                                            }else if (insert.successCallback){                                                              
                                                                              insert.successCallback(insert.object);
                                                                            }
                                                                        });   
                       });
                     },
                     
                     /**
                      * @param find.collectionName
                      * @param find.query
                      * @param find.options
                      * @param find.successCallback
                      * @param find.errorCallback
                      */                          
                     findOne: function(find){
                        console.log("Buscando en BD");
                        
                        MongoClient.connect(uri,
                            function(error, db){
                                           console.log("open");
                                           if (error) {
                                             throw error;  
                                           }
                                           
                                           var collection = db.collection(find.collectionName);
                
                                           collection.findOne(find.query, find.options, function (err, records){
                                                                               //console.log("records " + JSON.stringify(records));
                                                                                 if (err && find.errorCallback) {
                                                                                   find.errorCallback(err);  
                                                                                 }else if (find.successCallback){                                                              
                                                                                   find.successCallback(records);
                                                                                 }
                                        });              
                          });                        
                     },
                     
                     /**
                      * @param opts.object
                      * @param opts.collectionName
                      */
                     save: function(opts){
                        console.log("Guardando en BD");
                        
                        MongoClient.connect(uri,
                            function(error, db){
                                               if (error) {
                                                 throw error;  
                                               }
                                               
                                               var collection = db.collection(opts.collectionName);
                     
                                               collection.save(opts.object, function (err, records){
                                                                                   
                                                                                     if (err && opts.errorCallback) {
                                                                                       opts.errorCallback(err);  
                                                                                     }else if (opts.successCallback){                                                              
                                                                                       opts.successCallback(records);
                                                                                     }
                                                                                   } );
                                            
                          });     
                     },
                     
                     /**
                      * @param collectionName
                      */
                     removeAll: function(opts){
                        console.log("Eliminando todo : " + opts.collectionName);
                        
                        MongoClient.connect(uri,
                            function(error, db){
                               
                                        if (error) {
                                          throw error;  
                                        }
                                        
                                        var collection = db.collection(opts.collectionName);
              
                                        collection.remove({}, function (err){
                                                                            console.log("Combos eliminados : " );
                                                                              if (err && opts.errorCallback) {
                                                                                opts.errorCallback(err);  
                                                                              }else if (opts.successCallback){                                                              
                                                                                opts.successCallback();
                                                                              }
                                                                            } 
                                        );
                          });     
                     },
                     
                    /**
                      * @param find.collectionName
                      * @param find.query
                      * @param find.options
                      * @param find.successCallback
                      * @param find.errorCallback
                      */                          
                     find: function(find){
                        console.log("Buscando en BD");
                        
                        MongoClient.connect(uri,
                            function(error, db){
                                               if (error) {
                                                 throw error;  
                                               }
                                               
                                               var collection = db.collection(find.collectionName);
                    
                                               if (find.opts){
                                                  collection.find(find.query, find.options, find.opts).toArray(function (err, records){
                                                                                                                console.log("records " + records);
                                                                                                                  if (err && find.errorCallback) {
                                                                                                                    find.errorCallback(err);  
                                                                                                                  }else if (find.successCallback){                                                              
                                                                                                                    find.successCallback(records);
                                                                                                                  }
                                                                                                                }                            
                                                    );                            
                                                }else{ 
                                                    collection.find(find.query, find.options).toArray(function (err, records){
                                                                                        console.log("records " + records);
                                                                                          if (err && find.errorCallback) {
                                                                                            find.errorCallback(err);  
                                                                                          }else if (find.successCallback){                                                              
                                                                                            find.successCallback(records);
                                                                                          }
                                                                                        }                            
                                                    );
                                                }
                          });                        
                     },
                     
                     /**
                      * @param opts.collectionName
                      * @param opts.query
                      * @param opts.successCallback
                      * @param opts.errorCallback
                      */
                     aggregate: function(opts){
                        console.log("Buscando en BD (collection)");
                        
                        MongoClient.connect(uri,
                            function(error, db){
                                            if (error) {
                                              throw error;  
                                            }
                                            
                                            var collection = db.collection(opts.collectionName);                           
                                            
                                            collection.aggregate(opts.query)                            
                                            .toArray(function (err, records){
                                                         console.log("records " + records);
                                                           if (err && opts.errorCallback) {
                                                             opts.errorCallback(err);  
                                                           }else if (opts.successCallback){                                                              
                                                             opts.successCallback(records);
                                                           }
                                                         } 
                                            );
                      });                        
                     },
                     
                      /**
                      * @param opts.collectionName
                      * @param opts.criteria
                      * @param opts.update
                      * @param opts.opts
                      * @param opts.successCallback
                      * @param opts.errorCallback
                      */                          
                     update: function(opts){
                        console.log("Actualizando en BD");
                        
                        MongoClient.connect(uri,
                            function(error, db){
                                   
                                   if (error) {
                                     throw error;  
                                   }
                                   
                                   var collection = db.collection(opts.collectionName);
        
                                   if (!opts.opts) {
                                        opts.opts = {
                                                        multi : true,
                                                        upsert : false
                                                    };
                                   }
                                                
                                   collection.update(opts.criteria,
                                                     opts.update,
                                                     opts.opts,
                                                     function (err, records){
                                                                    
                                                                        if (err && opts.errorCallback) {
                                                                          opts.errorCallback(err);  
                                                                        }else if (opts.successCallback){                                                              
                                                                          opts.successCallback(records);
                                                                        }
                                                                      } 
                                   );
                          });                        
                     }                     
                  };  
