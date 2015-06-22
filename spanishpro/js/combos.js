function loadCombos($http, $rootScope) {
     var httpReq = {
         method: 'GET',
         url: 'combos',
         headers: {
           'Content-Type': "application/json"
         }
        };
        
        $http(httpReq).success(function(data, status, headers, config) {
                                                                    if (status == 200) {
                                                                        
                                                                           $rootScope.combos = data;
                                                                        
                                                                           for (var i = 0; i < $rootScope.combos.length; i++) {
                                                                               $rootScope.combos[i].quantity = 0;
                                                                           }                                                                        
                                                                        //$this.loadCombos(data);
  
                                                                    }else{
                                                                        alert(data);
                                                                    }
   
                                                                 })
                .error(function(data, status, headers, config, statusText) {
                                                                      if (status != 0) {
                                                                           alert(data);
                                                                      }
                                                                    
                                                                }); 
}

function saveCombos($this, $http, $rootScope) {
     var httpReq = {
         method: 'POST',
         url: 'combos',
         headers: {
           'Content-Type': "application/json"
         },
         data: $this.combos
        };
        
        $http(httpReq).success(function(data, status, headers, config) {
                                                                    if (status == 200) {
                                                                        $rootScope.combos = data;
                                                                        
                                                                        
                                                                        alert("Los combos fueron guardados con exito");
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

function addCombo($this){
     
     var valid = fieldsValid($("[combos_config_data]"));

     if (valid) {    
          $this.combos.push({comboName: $this.comboName, nTokens: $this.nTokens, price: $this.price});
          $this.price = "";
          $this.nTokens = "";
          $this.comboName = "";
     }     
}