var dao = require('../util/db_util.js');


module.exports = {
                    /**
                     * @param opts.successCallback
                     * @param opts.errorCallback
                     */
                    getPages: function(opts){
                                
                                 var findOptions = {                                                      
                                                     collectionName: 'pages',
                                                     query: {},
                                                     options: {},
                                                     successCallback: function(pages){
                                                                        opts.successCallback(pages);                                                                        
                                                                      },
                                                     errorCallback: opts.errorCallback
                                                  };
                                 
                                 dao.find(findOptions);                        
                    },
                    /**
                     * opts.pageConfig
                     * opts.successCallback
                     * opts.errorCallback
                     */
                    savePages  : function (opts){
                                            dao.removeAll({
                                                collectionName: "pages",
                                                successCallback: function(){
                                                                    console.log("Insertando configuracion de paginas");
                                                                    console.log("opts.pagesConfig.length " + opts.pagesConfig.length);
                                                                    for (var i = 0; i < opts.pagesConfig.length; i++){
                                                                        var pageConfig = opts.pagesConfig[i];
                                                                        pageConfig["_id"] = null;
                                                                        
                                                                        dao.insert(
                                                                                 {
                                                                                    object: pageConfig,
                                                                                    collectionName: "pages",
                                                                                    successCallback: opts.successCallback,
                                                                                    errorCallback: opts.errorCallback
                                                                                 }   
                                                                                );
                                                                    }
                                                                    
                                                                    opts.successCallback();
                                                            },
                                                 errorCallback: opts.errorCallback           
                                            });         
                                  }                    
}