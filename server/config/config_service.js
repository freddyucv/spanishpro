var dao = require('../util/db_util.js');
ObjectID = require('mongodb').ObjectID;
var moment = require('moment');
var email = require('../util/email_util.js');

module.exports = {
    
    /**
     * opts.successCallback
     * opts.errorCallback
     */
    loadConfig  : function (opts){
                                
                                 var findOptions = {                                                      
                                                     collectionName: 'config',
                                                     query: {},
                                                     options: {},
                                                     successCallback: function(config){
                                                                        opts.successCallback(config);                                                                        
                                                                      },
                                                     errorCallback: opts.errorCallback
                                                  };
                                 
                                 dao.findOne(findOptions);
                  },
                  
    /**
     * opts.config
     * opts.successCallback
     * opts.errorCallback
     */
    saveConfig  : function (opts){
                                opts.config["_id"] = new ObjectID(opts.config["_id"]);
                                
                                dao.save(
                                         {
                                            object: opts.config,
                                            collectionName: "config",
                                            successCallback: opts.successCallback,
                                            errorCallback: opts.errorCallback
                                         }   
                                        );
                  },
                  
    /**
     * opts.successCallback
     * opts.errorCallback
     */
    loadCombos  : function (opts){
                                
                                 var findOptions = {                                                      
                                                     collectionName: 'combos',
                                                     query: {},
                                                     options: {},
                                                     successCallback: function(combos){
                                                                        opts.successCallback(combos);                                                                        
                                                                      },
                                                     errorCallback: opts.errorCallback
                                                  };
                                 
                                 dao.find(findOptions);
                  },
                  
    /**
     * opts.combos
     * opts.successCallback
     * opts.errorCallback
     */
    saveCombos  : function (opts){
        
                                dao.removeAll({
                                                collectionName: "combos",
                                                successCallback: function(){
                                                                    console.log("Insertando nuevos combos " + JSON.stringify(opts.combos));
                                                                    for (var i = 0; i < opts.combos.length; i++){
                                                                        opts.combos["_id"] = null;
                                                                        
                                                                        dao.insert(
                                                                                 {
                                                                                    object: opts.combos[i],
                                                                                    collectionName: "combos",
                                                                                    successCallback: opts.successCallback,
                                                                                    errorCallback: opts.errorCallback
                                                                                 }   
                                                                                );
                                                                    }
                                                                    
                                                                    opts.successCallback();
                                                            },
                                                 errorCallback: opts.errorCallback           
                                                }             
                                            );                
                  }
}