function initTeacherController($http, $this){
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