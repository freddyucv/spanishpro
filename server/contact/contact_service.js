var email = require('../util/email_util.js');
var config = require('../util/config.js');
var dao = require('../util/db_util.js');
var config = require('../util/config.js');

module.exports = {
                
                /*
                 * opts.email
                 * opts.content
                 * opts.userName
                 * opts.successCallback
                 * opts.errorCallback
                 */
                sendEmailToAdmin: function(opts){
                                if (!opts.userName){
                                    opts.userName = "Usuario no registrado";  
                                }

                                var findOptions = {                                                      
                                        collectionName: 'users',
                                        query: {login: "Admin"},
                                        options: {},
                                        successCallback: function(admin){

                                                        console.log(JSON.stringify(admin));
                                                        console.log(admin.email);
                                                        email.send({                                                                                                 
                                                                     subject:"Consulta al Administrador",
                                                                     to: admin.email,
                                                                     data: {
                                                                        name: opts.userName,
                                                                        email: opts.email,
                                                                        content: opts.content,
                                                                        rootPath: config.rootPath
                                                                     }
                                                                    },
                                                                    "admin_contact"
                                                                   );                                                        
                                                          opts.successCallback("Correo enviado con exito");         
                                                        },
                                        errorCallback: opts.errorCallback
                                    };
    
                                 dao.findOne(findOptions);
                                 
                            }                                   
                } 




