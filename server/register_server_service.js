var dao = require('./util/db_util.js');
var email = require('./util/email_util.js');
var config = require('./util/config.js');
ObjectID = require('mongodb').ObjectID;
var countries = require('./countries_server.js');

notifyNewUsers();
setInterval(function(){
                notifyNewUsers();      
            },
            
            24 * 60 * 60 * 1000);

module.exports = {
                  /**
                   *@param newUser.user
                   *@param newUser.successCallback
                   *@param newUser.errorCallback
                   *@param newUser.errorEmailExistsCallback
                   */
                  newUser: function(opts){
                                console.log("Verificando si existe otro usuario con el mismo correo o el mismo login");
                                    
                                 var findOptions = {                                                      
                                                     collectionName: 'users',
                                                     query: {$or: [ {email: opts.user.email}, {login: opts.user.login}]},
                                                     options: {email:true, login:true, _id: false},
                                                     successCallback: function(found){
                                                                        validateUser(opts.user, found, opts.successCallback, opts.errorCallback);                                                                        
                                                                      },
                                                     errorCallback: opts.errorCallback
                                                  };
                                 
                                 dao.findOne(findOptions);

                  },
                  
                  /**
                   * @param opts.userId
                   * @param opts.password
                   * @param opts.successCallback
                   * @param opts.errorCallback
                   */
                  resetpassword: function(opts){
                                console.log("Buscando usuario para el reinicio de password " + opts.userId);
                                
                                 var findOptions = {                                                      
                                                     collectionName: 'users',
                                                     query: {"_id": new ObjectID(opts.userId)},
                                                     options: {},
                                                     successCallback: function(user){
                                                                        console.log("Actualizando password del usuario");
                                                                        user.password = opts.password;
                                                                        updateUser(user, opts);
                                                                      },
                                                     errorCallback: opts.errorCallback
                                                  };
                                 
                                 dao.findOne(findOptions);                    
                  },
                  
                  /**
                   * @param opts.login
                   * @param opts.successCallback
                   * @param opts.errorCallback
                   */
                  forgetPassword: function(opts){
                                console.log("Buscando usuario para el reinicio de password " + opts.login);
                                
                                 var findOptions = {                                                      
                                                     collectionName: 'users',
                                                     query: {"login": opts.login},
                                                     options: {},
                                                     successCallback: function(user){
                                                                        console.log("Se encontro el usuario?" + user);
                                                                        
                                                                        if (!user) {
                                                                            console.log("No existe usuario con ese login ");
                                                                            opts.errorCallback("Usuario no existe / User not exists");
                                                                        }else{
                                                                        
                                                                            email.send({                                                                                                 
                                                                                         subject:"Reinicio de password/Reset password",
                                                                                         to: user.email,
                                                                                         data: {
                                                                                            userId: user["_id"],
                                                                                            rootPath: config.rootPath,
                                                                                            name: user.name
                                                                                         }
                                                                                        },
                                                                                        "reset_password"
                                                                                       );
                                                                            
                                                                                    opts.successCallback();
                                                                          }       
                                                                      },
                                                     errorCallback: opts.errorCallback
                                                  };
                                 
                                 dao.findOne(findOptions);                    
                  },
                  
                  /**
                   * @param opts.login
                   * @param opts.password
                   * @param opts.successCallback
                   * @param opts.errorCallback
                   */
                  login: function(opts){
                        var findOptions = {                                                      
                                        collectionName: 'users',
                                        query: {"login": opts.login},
                                        options: {},
                                        successCallback: function(user){
                                                           console.log("Se encontro el usuario?" + user);
                                                           
                                                           if (!user) {
                                                               console.log("No existe usuario con ese login ");
                                                               opts.errorCallback("Login incorrecto / Incorrect login");
                                                           }else{
                                                                if (opts.password == user.password) {
                                                                    opts.successCallback(user);
                                                                }else{
                                                                    opts.errorCallback("Login incorrecto / Incorrect login");
                                                                }
                                                            }       
                                                         },
                                        errorCallback: opts.errorCallback
                                     };
                    
                    dao.findOne(findOptions);                       
                  },
                  
                  update: function(opts){
                        updateUser(opts.user, opts);    
                  },
                  
                  /**
                   * @param opts.userId
                   * @param opts.successCallback
                   * @param opts.errorCallback
                   */
                  getUser: function(opts){
                                console.log("Buscando usuario  " + opts.userId);
                                
                                 var findOptions = {                                                      
                                                     collectionName: 'users',
                                                     query: {"_id": new ObjectID(opts.userId)},
                                                     options: {},
                                                     successCallback: function(user){
                                                                        opts.successCallback(user);
                                                                      },
                                                     errorCallback: opts.errorCallback
                                                  };
                                 
                                 dao.findOne(findOptions);                      
                    
                  },
                  updateUser: function(opts){
                                opts.user["_id"] = new ObjectID(opts.userId);
                                updateUser(opts.user, opts);  
                  }
};

function updateUser(user, opts){
    
    dao.save(
             {
                object: user,
                collectionName: "users",
                successCallback: opts.successCallback,
                errorCallback: opts.errorCallback
             }   
            );
}

function validateUser(user, found, cb, ecb){
    
    if (!found) {
      user.newUser = true;  
      console.log("Registrando Usuario " + JSON.stringify(user));
      
       user.tokens = 1;
       dao.insert(
                  {
                    collectionName: 'users',
                    object: user,
                    successCallback: function(newUser){
  
                                                cb("Registrado exitosamente / Successfully registered");
                                                
                                                if (newUser.type == "Student"){
                                                    email.send({                                                                                                 
                                                                 subject:"Registro exitoso / Succesfull registration",
                                                                 to: user.email,
                                                                 data: {
                                                                    userId: newUser["_id"],
                                                                    name: newUser.name,
                                                                    rootPath: config.rootPath
                                                                 }
                                                                }, 
                                                                "register"
                                                               );
                                                }else{
                                                    email.send({                                                                                                 
                                                                 subject:"Registro exitoso / Succesfull registration",
                                                                 to: user.email,
                                                                 data: {
                                                                    userId: newUser["_id"],
                                                                    name: newUser.name,
                                                                    rootPath: config.rootPath
                                                                 }
                                                                }, 
                                                                "new_teacher"
                                                               );                                                    
                                                }    
                                            },
                    errorCallback: ecb
                  });
       

       
       
    }else if(found.email == user.email){
        console.log("Correo ya existe");  
        ecb( "El correo ya esta registrado / Mail already registered");
    } else if(found.login == user.login){
        console.log("Login ya existe");  
        ecb( "El login ya esta registrado / Login already registered");
    }           
}

function notifyNewUsers() {
    
    var findOptions = {                                                      
                    collectionName: 'users',
                    query: {newUser: true, password: {$exists: true}},
                    options: {},
                    successCallback: function(newUsers){
                        console.log("newUsers.length " + newUsers.length);
                                       if (newUsers.length > 0){  
                                            var html =   "<table>" +
                                                         "<tr>" +
                                                             "<th>Usuario</th>" +
                                                             "<th>Pais</th>" +
                                                             "<th>Correo</th>" +
                                                             "<th>skype</th>" +
                                                             "<th>Referido por</th>" +
                                                         "</tr>";
                                                         
                                            
                                            
                                            for(var i = 0; i < newUsers.length; i++){
                                                 var countryName;
                                                 
                                                 for(var k = 0; k < countries.countries.length; k++){
                                                     if (countries.countries[k].iso == newUsers[i].country){
                                                         
                                                         countryName = countries.countries[k].country_name;
                                                         break;
                                                     }    
                                                 }
                                                 
                                                 var newUserHTML =   "<tr>" +
                                                                         "<td>" + newUsers[i].name + "</td>" +
                                                                         "<td>" + countryName + "</td>" +
                                                                         "<td>" + newUsers[i].email + "</td>" +
                                                                         "<td>" + newUsers[i].skype + "</td>" +
                                                                         "<td>" + newUsers[i].pioneer + "</td>" +
                                                                     "</tr>";           
                                             
                                                 html += newUserHTML;  
                                            }
                                            
                                            html += "</table>";
                                       }else{
                                            html = "<h1>No se han registrado nuevos usuarios</h1>";    
                                            
                                        }
                                        console.log("html " + html);
                                        var findOptions = {                                                      
                                                            collectionName: 'users',
                                                            query: {type: "Admin"},
                                                            options: {email:true},
                                                            successCallback: function(user){
                                                                            console.log("userEmail " + user.email);
                                                                            email.send({                                                                                                 
                                                                                         subject:"Nuevos Usuarios",
                                                                                         to: user.email,
                                                                                         data: {
                                                                                            newusers: html
                                                                                         }
                                                                                        },
                                                                                        "new_users"
                                                                                       );                                                                                
                                                                             }
                                                         };
                                        
                                        dao.findOne(findOptions);
                                        
                                        dao.update({
                                                        collectionName: "users",
                                                        criteria: {newUser: true, password: {$exists: true}},
                                                        update: { $set: {newUser: false} },
                                                        opts: {multi : true}
                                                   });                                            
                                     }
                 };

    dao.find(findOptions);
    

}