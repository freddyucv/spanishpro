function initTokensController($http, $rootScope, $this) {
    
    $this.toBuy = 0;
    $this.toPay = 0;
    
    if (!$this.tokens) {
       $this.tokens = 0; 
    }
    
    var isReload = window.location.href.indexOf("reload_user") != -1;
    
    if (isReload) {
        reloadUser($rootScope, $http);
                    
    }else if (!$rootScope.currentUser.tokens){
        $rootScope.currentUser.tokens = 0;
        $rootScope.currentUser.bills = [];
    }
    
    if ($rootScope.currentUser.bills) {
        $rootScope.currentUser.bills =  $rootScope.currentUser.bills.sort(function(a, b){
                                                                                                return  new Date(b.date).getTime() - new Date(a.date).getTime();
                                                                                            });
    }
    
    if (!$rootScope.currentUser.tokens) {
        $rootScope.currentUser.tokens = 0;
    }
    
    if (!$rootScope.combos) {
        loadCombos($http, $rootScope, $this, function(data){init($http, $rootScope, $this)});
    }
  
}

function init($http, $rootScope, $this, data){

    $this.combos = data;
    
    for(var i = 0; i < $this.combos.length; i++){
        $this.combos[i].quantity = 0;
    }    

}

function calculatePay($this, $rootScope){
    $this.toPay =  $this.toBuy * $rootScope.config.tokensPrice;
    
    for(var i = 0; i < $rootScope.combos.length; i++){
        if ($rootScope.combos[i].selected) {
            $this.toPay += ($rootScope.combos[i].quantity * $rootScope.combos[i].price);
        }
    }
}

function buy($this, $rootScope) {
    
    if($this.accept){    
        var valid = fieldsValid($("[buy_tokens_dialog]"));
        
        if (valid) {
            
            if ($this.toPay > 0) {
                var totalTokens = $this.toBuy;
                   
                   var clientElements = "<input type='hidden' name='card_holder_name' value='" + $rootScope.currentUser.name + "' >" +
                                        "<input type='hidden' name='city' value='" + $rootScope.currentUser.city + "' >" +
                                        "<input type='hidden' name='country' value='" + $rootScope.currentUser.country + "' >" +
                                        "<input type='hidden' name='email' value='" + $rootScope.currentUser.email + "' >" +
                                        "<input type='hidden' name='userId' value='" + $rootScope.currentUser["_id"] + "' >";
                   
                    
                    var nitems = 0;
                    
                    if ($this.toBuy > 0) {
                        addProduct($this.toBuy, $rootScope.config.tokensPrice, "Tokens", 0);
                        nitems++;
                    }
                   
                   for(var i = 0; i < $rootScope.combos.length; i++){
                       if ($rootScope.combos[i].selected) {
                           addProduct($rootScope.combos[i].quantity, $rootScope.combos[i].price, $rootScope.combos[i].comboName, (i + 1));
                           totalTokens = parseInt(totalTokens) + parseInt(($rootScope.combos[i].quantity * $rootScope.combos[i].nTokens));
                         
                           nitems++;
                       }
                   }
               
           
                   clientElements += "<input type='hidden' name='total_items' value='" + nitems + "' >" +    
                                    "<input type='hidden' name='total_tokens' value='" + totalTokens + "' >" +
                                    "<input type='hidden' name='total_price' value='" + $this.toPay + "' >";
                    
                   $("#2co").append(clientElements);
                   $("#2co").submit();
               
            }else{
                alert("Debe selecionar una compra / must to select to buy");
            }
        }
    }else{
        alert("Debe aceptar los terminos y condiciones antes de comprar / You must accept the terms and conditions before buying");
    }    
}

function addProduct(quantity, price, name, index) {
    var productElements = "<input type='hidden' name='li_" + index + "_type' value='product'/>" +
                          "<input type='hidden' name='li_" + index + "_name' value='" + name + "'/>" +
                          "<input type='hidden' name='li_" + index + "_price' value='" + price + "' >" +
                          "<input type='hidden' name='li_" + index + "_quantity' value='" + quantity + "' >";

    $("#2co").append(productElements);
}




function initValidateTokensController($http, $this){
    
    var httpReq = {
        method: 'GET',
        url: 'unvalid_tokens'
    }
    
    $http(httpReq).success(function(data, status, headers, config) {
                                                                $this.load(data);
                                                             })
            .error(function(data, status, headers, config) {
                                                                if (status != 0) {
                                                                    alert(data);
                                                                }    
                                                            });    

}


function validateTokens($this, $http){
   var orderToValidate = [];
   var toDelete = [];
   
  
   for (var i = 0; i < $this.studensTokens.length; i++) {
       var bills = $this.studensTokens[i].bills;
       var billsDelete = [];
      
       for (var k = 0; k < bills.length; k++){
       
           if (bills[k].valid){
               orderToValidate.push(bills[k].orderNumber);
               billsDelete.push(k);
           }
       }
       
       toDelete.push(billsDelete);
    }
       

    var httpReq = {
        method: 'POST',
        url: 'validate_tokens',
        data: orderToValidate
    }
    
    $http(httpReq).success(function(data, status, headers, config) {
        
                                                                for (var i = (toDelete.length - 1); i >= 0; i--) {
                                                                    var billsDelete = toDelete[i];
                                                                    
                                                                    for (var k = billsDelete.length - 1; k >= 0; k--){                                                                        
                                                                        $this.studensTokens[i].bills.splice(billsDelete[k], 1);    
                                                                    }
                                                                    
                                                                    if ($this.studensTokens[i].bills.length == 0){
                                                                        $this.studensTokens.splice(i, 1);    
                                                                    }
                                                                 }
                                                                 
                                                                 $this.load ($this.studensTokens);
                                                             })
            .error(function(data, status, headers, config) {
                                                                if (status != 0) {
                                                                    alert(data);
                                                                }    
                                                            });         
}

function initTokensManagmentController($http, $this){
    
   $("[error]").hide();
   
   var httpReq = {
        method: 'GET',
        url: 'students/tokens'
    }
    
    $http(httpReq).success(function(data, status, headers, config) {
                                                                $this.load(data);
                                                             })
            .error(function(data, status, headers, config) {
                                                                if (status != 0) {
                                                                    alert(data);
                                                                }    
                                                            });    
    
   var httpReq = {
        method: 'GET',
        url: 'teachers'
    }
    
    $http(httpReq).success(function(data, status, headers, config) {

                                                                $this.loadTeachers(data);
                                                             })
            .error(function(data, status, headers, config) {
                                                                if (status != 0) {
                                                                    alert(data);
                                                                }           
                                                            });               
}

function incrementTokens($http, $this) {
    var valid = fieldsValid($("[history_tokens]"));

    if (valid) {
        var data = {
                        increment: $this.increment,
                        student: $this.selectedStudent["_id"]
                   };
                   
        var teacherName;

        if (parseInt($this.selectedTeacher) != -1) {
            for(var i = 0; i < $this.teachers.length; i++){
                var teacher = $this.teachers[i];
                
                if ($this.selectedTeacher == teacher["_id"]) {
                    teacherName = teacher.name;
                    break;
                }
            }
            
            data.teacherName = teacherName;
           data.teacherId = $this.selectedTeacher;
        }

        
        var httpReq = {
             method: 'POST',
             url: 'students/tokens',
             data: data  
         }

         $http(httpReq).success(function(data, status, headers, config) {
                                                                     alert("Incremento de tokens exitoso");
                                                                     
                                                                     if (parseInt($this.selectedTeacher) == -1) {
                                                                        $this.selectedStudent.tokens = parseInt($this.selectedStudent.tokens) + parseInt($this.increment);
                                                                     }else{
                                                                        
                                                                        if (!$this.selectedStudent.specialTokens) {
                                                                            $this.selectedStudent.specialTokens = [];
                                                                        }
                                                                         
                                                                        var changed = false;
                                                                        
                                                                        for(var i = 0; i < $this.selectedStudent.specialTokens.length; i++){
                                                                            var special = $this.selectedStudent.specialTokens[i];
                                                                            
                                                                            if (special.teacherId == $this.selectedTeacher) {
                                                                                special.nTokens = $this.increment + special.nTokens;
                                                                                changed = true;
                                                                                break;
                                                                            }
                                                                        }
                                                    
                                                                        if (!changed) {
                                                                            $this.selectedStudent.specialTokens.push({
                                                                                                                       teacherId: $this.selectedTeacher,
                                                                                                                       teacherName: teacherName,
                                                                                                                       nTokens: $this.increment
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
}
