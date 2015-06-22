
var dao = require('../util/db_util.js');

module.exports = {
                    /**
                     * @param successCallback
                     * @param errorCallback
                     */
                    getTeachers: function(opts){
                                 var findOptions = {                                                      
                                                     collectionName: 'users',
                                                     query: {type: "Teacher"},
                                                     options: {},
                                                     successCallback: function(teachers){
                                                                        opts.successCallback(teachers);                                                                        
                                                                      },
                                                     errorCallback: opts.errorCallback
                                                  };
                                 
                                 dao.find(findOptions);                            
                    },
                    
                    getTeachersPayment: function(opts){
                                 var findOptions = {                                                      
                                                     collectionName: 'classs',
                                                     query: {status: "done", teacher: {$exists: true}, payment: { $exists:false }},
                                                     options: {sort: {teacher: 1, date: 1}},
                                                     successCallback: function(teachers){
                                                                        opts.successCallback(teachers);                                                                        
                                                                      },
                                                     errorCallback: opts.errorCallback
                                                  };
                                 
                                 dao.find(findOptions);
                    }
};