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

function loadStaticPage($rootScope, $http){
     var httpReq = {
         method: 'GET',
         url: 'pages',
         headers: {
           'Content-Type': "application/json"
         }
        };
        
        $http(httpReq).success(function(data, status, headers, config) {
                                                                    if (status == 200) {
                                                                      
                                                                        $rootScope.staticPagesConfig = data;
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

function savePagesConfig($this, $http){
     var httpReq = {
        method: 'POST',
        url: 'pages',
        headers: {
          'Content-Type': "application/json"
        },
        data: $this.staticPagesConfig
       };
       
       $http(httpReq).success(function(data, status, headers, config) {
                                                                   if (status == 200) {
                                                                      alert("El nuevo contenido fue guardada con exito");
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

function setPagesConfigChange($this){
     if ($this.pageConfigSelected) {
         for (var i = 0; i < $this.staticPagesConfig.length; i++){
             var pageConfig = $this.staticPagesConfig[i];
            
             if (pageConfig.page == $this.pageConfigSelected.page) {
                 $this.staticPagesConfig[i].content = $this.currentContent;
                 break;
             }
         }
     }
}