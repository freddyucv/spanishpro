function loadConfig($rootScope, $http){
     var httpReq = {
         method: 'GET',
         url: 'config',
         headers: {
           'Content-Type': "application/json"
         }
        };
      
        $http(httpReq).success(function(data, status, headers, config) {
          
                                                                    if (status == 200) {
                                                                        $rootScope.config = data;
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

function saveConfig($this, $http){
    var httpReq = {
        method: 'POST',
        url: 'config',
        headers: {
          'Content-Type': "application/json"
        },
        data: $this.config
       };
       
       $http(httpReq).success(function(data, status, headers, config) {
                                                                   if (status == 200) {
                                                                      alert("La nueva configuracion fue guardada con exito");
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
