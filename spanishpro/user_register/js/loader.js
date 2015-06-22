(function() {
        document.write('<link rel="stylesheet" type="text/css" href="user_register/css/styles.css">');
        loadUserRegister();
        loadResetPassword();
        loadForgetPassword();
        loadLogin();
 
})();

function loadLogin(){
       var mainElement = document.querySelector('[login]');
         
         if (mainElement) {
            var tempDiv = document.createElement("div");
            mainElement.appendChild(tempDiv);

            var htmlCode = '<div ng-controller="LoginController  as lc">' +
                '<span close ng-click="lc.closeLoginDialog()">X</span>' + 
                    '<div>' +
                        '<h1>Login</h1>' +
                    '</div>' +                            
                    '<div>' +
                        '<label>Username:</label><input name="name" ng-model="lc.user.login" type="text" required/>' +
                        '<img src="user_register/images/x_red.png" error/>' +
                        '<label error_text error></label>' +
                    '</div>' +
                    '<div>' +
                        '<label>Password:</label><input ng-model="lc.user.password" type="password" required confirm/>' +
                        '<img src="user_register/images/x_red.png" error/>' +
                        '<label error_text error></label>' +                                
                    '</div>' +
                    '<div>' +
                        '<div button ng-click="lc.login()"><span>Aceptar</span></div>' +
                         '<div button ng-click="lc.closeLoginDialog()"><span>Cancelar</span></div>' +
                    '</div>' +                    
                '</div>';
                     
                     
             tempDiv.insertAdjacentHTML('afterend', htmlCode); 
         }   
}

function loadForgetPassword(){
       var mainElement = document.querySelector('[forget_password]');
         
         if (mainElement) {
            var tempDiv = document.createElement("div");
            mainElement.appendChild(tempDiv);

            var htmlCode = '<div ng-controller="ForgetController  as fc">' +
                    '<span close ng-click="fc.forgetPasswordDialog()">X</span>' + 
                    '<div>' +
                        '<h1>Olvido de password / Forget password</h1>' +
                    '</div>' +                            
                    '<div>' +
                        '<label>Username</label><input name="name" ng-model="fc.login" type="text" required/>' +
                        '<img src="user_register/images/x_red.png" error/>' +
                        '<label error_text error></label>' +
                    '</div>' +
                    '<div>' +
                        '<div button ng-click="fc.forgetPassword()"><span>Aceptar</span></div>' +
                        '<div button ng-click="fc.forgetPasswordDialog()"><span>Cancelar</span></div>' +
                    '</div>' +
                '</div>'
                     
                     
             tempDiv.insertAdjacentHTML('afterend', htmlCode); 
         }   
}

function loadResetPassword(){
       var mainElement = document.querySelector('[reset_password]');
         
         if (mainElement) {
            var tempDiv = document.createElement("div");
            mainElement.appendChild(tempDiv);

            var htmlCode = '<div ng-controller="PasswordController  as pc">' +
                    '<input ng-model="rc.user.type" type="hidden" user_type/>' +
                    '<div>' +
                        '<h1>Reinicio de password / Reset password</h1>' +
                    '</div>' +                            
                    '<div id="a">' +
                        '<label>Nuevo Password/New Password:</label><input name="name" ng-model="pc.reset.password" type="password" required/>' +
                        '<img src="user_register/images/x_red.png" error/>' +
                        '<label error_text error></label>' +
                    '</div>' +
                    '<div>' +
                        '<label>Cofirmar password/Confirm password</label><input ng-model="pc.reset.confirm" type="password" required confirm/>' +
                        '<img src="user_register/images/x_red.png" error/>' +
                        '<label error_text error></label>' +                                
                    '</div>' +
                    '<div>' +
                        '<div button ng-click="pc.resetPassword()"><span>Aceptar</span></div>' +                       
                    '</div>' +
                '</div>'
                     
                     
             tempDiv.insertAdjacentHTML('afterend', htmlCode); 
         }   
}

function loadUserRegister(){
        var mainElement = document.querySelector('[user_register]');
         
         if (mainElement) {
                var tempDiv = document.createElement("div");
                mainElement.appendChild(tempDiv);

                var htmlCode =  '<span close onClick="closeResgisterUserDialog()">X</span>' +        
                    '<form name="register"  ng-controller="RegisterController  as rc">' +
                        '<input ng-model="rc.user.type" type="hidden" user_type/>' +
                        '<div>' +
                            '<h1>Registro de Usuario/User Registration</h1>' +
                        '</div>' +                            
                        '<div>' +
                            '<label>Nombre/Name:</label><input name="name" ng-model="rc.user.name" type="text" required/>' +
                            '<img src="user_register/images/x_red.png" error/>' +
                            '<label error_text error></label>' +
                        '</div>' +
                        '<div>' +
                            '<label>Username :</label><input ng-model="rc.user.login" type="text" required/>' +
                            '<img src="user_register/images/x_red.png" error/>' +
                            '<label error_text error></label>' +                                
                        '</div>' +
                        '<div>' +
                            '<label>Correo/Email:</label>' +
                            '<input name="email "ng-model="rc.user.email" type="text" ng-pattern="/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/" required/>' +
                            '<img src="user_register/images/x_red.png" error/>' +
                            '<label error_text error></label>' +
                        '</div>' +
                        '<div>' +
                            '<label>Pais/Country:</label>' +
                            '<select ng-change="rc.loadCities()" ng-model="rc.user.country" country required>' +
                                '<option></option>' +
                                '<option value="{{country.iso}}" ng-repeat="country in rc.countries">{{country.country_name}}</option>' +
                            '</select>' +
                            '<img src="user_register/images/x_red.png" error/>' +
                            '<label error_text error></label>' +                                
                        '</div>' +                  
                        '<div>' +
                            '<label>Ciudad/City:</label>' +
                            '<select required cities_register ng-model="rc.user.city">' +
                            '<option value="{{city}}" ng-repeat="city in rc.cities">{{city}}</option> ' +
                            '</select>' +
                            '<img src="user_register/images/x_red.png" error/>' +
                            '<label error_text error></label>' +
                        '</div>' +                  
                        '<div>' +
                            '<label>Skype:</label><input ng-model="rc.user.skype" type="text" required/>' +
                            '<img src="user_register/images/x_red.png" error/>' +
                            '<label error_text error></label>' +                                
                        '</div>' +
                        '<div id="pionner">' +
                            '<label>Referido por:</label><input ng-model="rc.user.pioneer" type="text"/>' +                              
                        '</div>' +                          
                        '<div>' +
                            '<div button ng-click="rc.register()" ng-class=""><span>Aceptar</span></div>' +
                            '<div button ng-click="rc.closeRegisterDialog()"><span>Cancelar</span></div>' +
                        '</div>' +
                    '</form>'
                         
                         
                 tempDiv.insertAdjacentHTML('afterend', htmlCode); 
         }
                
}