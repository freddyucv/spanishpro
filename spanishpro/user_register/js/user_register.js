(
    
    function () {
        $("[user_register]").hide();
        $("[reset_password]").hide();
        $("[forget_password]").hide();
        $("[login]").hide();
        $("[contact_admin_dialog]").hide();
        
        $("[error]").hide();
        
    }()
)

function initLoginUser($this, $http, $rootScope, $state) {
    $this.login = function (){
                                    login($this, $http, $rootScope, $state);    
                                },
                                
    $this.showLoginDialog = function(type){
        
                                showDialog("[login]");    
                            }
    
    $this.closeLoginDialog = function(){
                                     closeDialog("[login]");  
        
                                }
                                
    $this.logout = function(){
        $rootScope.currentUser = null;
        sessionStorage.removeItem("currentUser");
        $state.go("home");
            
    }
}

function login($this, $http, $rootScope, $state){
    
    var valid = fieldsValid($("[login]"));
     
    if (valid) {
        
        startWaiting("[login]");
        
        var httpReq = {
            method: 'PUT',
            url: 'users/login',
            headers: {
              'Content-Type': "application/json"
            },
            data: {
                    login: $this.user.login,
                    password: window.btoa($this.user.password) 
                  }  
        };
        
        $http(httpReq).success(function(data, status, headers, config) {
            
                                                                    stopWaiting("[login]");
                                                                    if (status == 200) {
                                                                        closeDialog("[login]");
                                                                        sessionStorage.currentUser = JSON.stringify(data);
                                                                        $rootScope.currentUser = JSON.parse(sessionStorage.currentUser);
                                                                        
                                                                        if ($rootScope.currentUser.type == "Admin") {
                                                                            $state.go("admin");
                                                                        }
                                                                    }else{
                                                                        alert(data);
                                                                    }
    
                                                                    
                                                                 })
                .error(function(data, status, headers, config) {
                                                                    stopWaiting("[login]");
                                                                    if (status != 0) {
                                                                        alert(data);
                                                                    }
                                                                    
                                                                    
                                                                });
    }            
}

function initForgetPasswordUser($this, $http) {
    
    $this.forgetPassword = function (){
                                    forgetPassword($this, $http);    
                                },
                                
    $this.showForgetPassword = function(type){
                                showDialog("[forget_password]");    
                            }
    
    $this.forgetPasswordDialog = function(){
                                     closeDialog("[forget_password]");  
        
                                }
}

function initPasswordUser($this, $http) {
    $this.reset = {}
    
    $this.resetPassword = function (){
                                    resetPassword($this, $http);    
                                }
}

function initRegisterUser($this, $http) {            
            
    $this.user = {};
    
    $this.countries = countries;            
        
    $this.register = function(){
                        register($this, $http);
                        
                     }
                     
    $this.showRegister = function(type){
                        $this.user.type = type;
   
                        if (type == 'Student') {
                            $("#pionner").show();
                        }else{
                            $("#pionner").hide();
                        }
                        
                        showUserRegisterDialog(type);
                        
                        
                     }
                     
    $this.showResetPassword = function(){

                        showDialog("[reset_password]");
                     }
                     
    $this.closeRegisterDialog = function(){
                                    closeDialog("[user_register]");
                                }

}

function forgetPassword($this, $http){
    
    var valid = fieldsValid($("[forget_password]"));
     
    if (valid) {
        
        var httpReq = {
            method: 'PUT',
            url: 'users/forget_password',
            headers: {
              'Content-Type': "application/json"
            },
            data: {
                    login: $this.login                
                  }  
        };
        
        $http(httpReq).success(function(data, status, headers, config) {
                                                                    if (status == 200) {
                                                                        alert("Se le ha enviado un correo / We have sent an email");
                                                                        closeDialog("[forget_password]");
                                                                    }else{
                                                                        alert(data);
                                                                    }
    
                                                                 })
                .error(function(data, status, headers, config) {
                                                                    if (status != 0) {
                                                                        alert(data);
                                                                    }    
                                                                });
    }
}

function resetPassword($this, $http) {
   
    if ($this.reset.password == $this.reset.confirm) {

         var valid = fieldsValid($("[reset_password]"));
     
        if (valid) {
           
            var queryStart = window.location.href.indexOf("?");
            var userId = window.location.href.substring(queryStart).split("=")[1];
       
            var httpReq = {
                method: 'PUT',
                url: 'users/reset_password',
                headers: {
                  'Content-Type': "application/json"
                },
                data: {
                        userId: userId,
                        password: window.btoa($this.reset.password)                        
                      }  
            };
            
            $http(httpReq).success(function(data, status, headers, config) {
                                                                        if (status == 200) {
                                                                            alert("Clave asignada correctamente / Password was set succesfully");
                                                                            closeDialog("[reset_password]");
                                                                        }else{
                                                                            alert(data);
                                                                        }
       
                                                                     })
                    .error(function(data, status, headers, config) {
                                                                        if (status != 0) {
                                                                            alert(data);
                                                                        }    
                                                                    }); 
        }
    }else{
        showValidationError($("[confirm]"), "Password no coinciden / Password do not match");
    }
}

function register($this, $http) {
    
    var valid = fieldsValid($("[user_register]"));

    if (valid) {
        startWaiting("[user_register]");
        $this.user.tokens= 0;
        $this.user.type = $("[user_register] [user_type]").val();
        $this.user.time =  moment().utcOffset();
        
        var httpReq = {
         method: 'POST',
         url: 'users',
         headers: {
           'Content-Type': "application/json"
         },
         data: $this.user
        };
        
        $http(httpReq).success(function(data, status, headers, config) {
                                                                    stopWaiting("[user_register]");
                                                                    if (status == 200) {
                                                                        alert("Usuario registrado exitosamente, se le envio un correo para continuar con el proceso / User was registered succesfully. An email was sent to you in order to continue with the process");
                                                                        closeResgisterUserDialog();
                                                                    }else{
                                                                        alert(data);
                                                                    }
   
                                                                 })
                .error(function(data, status, headers, config) {
                                                                    stopWaiting("[user_register]");
                                                                    if (status != 0) {
                                                                        alert(data);
                                                                    }    
                                                                }); 
    }
}                               

function uploadFile(s3, $this, $http, user, Upload){
    /*Upload.upload({
            url: s3.signed_request,
            fields: {
                'username': user.name
            },
            file: $this.files[0],
            method: "PUT",
            headers: {'x-amz-acl': 'public-read'}
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $this.log = 'progress: ' + progressPercentage + '% ' +
                        evt.config.file.name;
        }).success(function (data, status, headers, config) {
            $this.log = 'cargada/uploaded';
            
            user.picture = s3.url;
            sessionStorage.currentUser = JSON.stringify(user);
            sendData($this, $http, user);
            
        });*/
    
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", s3.signed_request);
        xhr.setRequestHeader('x-amz-acl', 'public-read');
        xhr.onload = function() {
            $this.log = 'cargada/uploaded';
            
            user.picture = s3.url;
            sessionStorage.currentUser = JSON.stringify(user);
            sendData($this, $http, user);
        };
        xhr.onerror = function() {
            stopWaiting("[panel] [data]");

            alert("Could not upload file.");
        };
        xhr.send($this.files[0]);
}

function updateUser($this, $http, user, Upload) {
    
    startWaiting("[panel] [data]");
    
    if ($this.files) {
        var extStart = $this.files[0].name.indexOf(".") + 1;
        var ext = $this.files[0].name.substring(extStart);
        
        
       var httpReq = {
         method: 'GET',
         url: "sign_s3?file_name=" + user["_id"] + "." + ext + "&file_type=" + $this.files[0].type,
        };
        
        $http(httpReq).success(function(s3, status, headers, config) {
            
                                                                    uploadFile(s3, $this, $http, user, Upload);
                                                                    
                                                                 })
                .error(function(data, status, headers, config) {
                                                                    stopWaiting("[panel] [data]");
                                                                    if (status != 0) {
                                                                        alert(atatus + " " + data);
                                                                    }
                                                                }); 
    }else{
        sendData($this, $http, user);
    }
    
   
        
}

function sendData($this, $http, user){

        var httpReq = {
         method: 'POST',
         url: 'users/' + user["_id"],
         headers: {
           'Content-Type': "application/json"
         },
         data: user
        };
        
        $http(httpReq).success(function(data, status, headers, config) {
                                                                    stopWaiting("[panel] [data]");
                                                                    if (status == 200) {
                                                                        alert("Actualizacion exitosa / Succesfully updated");
                                                                        $this.edit = !$this.edit;
                                                                    }else{
                                                                        alert(data);
                                                                    }
   
                                                                 })
                .error(function(data, status, headers, config) {
                                                                    stopWaiting("[panel] [data]");
                                                                    if (status != 0) {
                                                                        alert(data);
                                                                    }
                                                                });             
                                 
}
    
function calculateAge() {
    var date = $("[datepicker]").val();    
    var dateSplit = date.split("/");
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    
    var age = yyyy - dateSplit[2];

    if (mm < dateSplit[1]){
        age--;
    }else if (mm == dateSplit[1]) {
        if (dd == dateSplit[0]) {
            age--;
        }
    }
    
    $("[age]").text(age + " Años");
}

function showUserRegisterDialog(type) {   
    $("[user_register] [user_type]").val(type);
    showDialog("[user_register]"); 
}

function showResetPasswordDialog(title){
    $("[reset_password] h1").html(title);
    showDialog("[reset_password]");
}

function showDialog(query) {
    var containerName = $(query).attr("for");
    $("#" + containerName).css({opacity: "0.5"});    
    $(query).show();    
}

function closeResgisterUserDialog(){
    closeDialog("[user_register]");
    
}
function closeDialog(query){
    
    $(query).hide();
    
    var containerName = $(query).attr("for");
    $("#" + containerName).css({opacity: "1"});    
}

function reloadUser($rootScope, $http) {
        var httpReq = {
            method: 'GET',
            url: 'users/' + JSON.parse(sessionStorage.currentUser)["_id"]
        }
        
        $http(httpReq).success(function(data, status, headers, config) {
                                                                        sessionStorage.currentUser = JSON.stringify(data);
                                                                        $rootScope.currentUser = data;
                                                                        
                                                                        
                                                                        if (!$rootScope.currentUser.tokens == "undefined"){
                                                                         
                                                                             $rootScope.currentUser.tokens = 0;
                                                                             $rootScope.currentUser.bills = [];
                                                                         }else{
                                                                            if ($rootScope.currentUser.bills) {
                                                                                $rootScope.currentUser.bills =  $rootScope.currentUser.bills.sort(
                                                                                                                    function(a, b){
                                                                                                                                          return  new Date(b.date).getTime() - new Date(a.date).getTime();
                                                                                                                                      });
                                                                            }
                                                                            
                                                                          
                                                                         }
                                                                 })
                .error(function(data, status, headers, config) {
                                                                    if (status != 0) {
                                                                        alert(data);
                                                                    }    
                                                                });
}
