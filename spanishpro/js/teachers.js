function initTeacherController($http, $this){
   
   
   
   var httpReq = {
        method: 'GET',
        url: 'teachers'
    }
    startWaiting("[teacher_list_page] [list_container]");
    
    $http(httpReq).success(function(data, status, headers, config) {

                                                                $this.loadTeachers(data);
                                                                stopWaiting("[teacher_list_page] [list_container]");
                                                             })
            .error(function(data, status, headers, config) {
                                                               stopWaiting("[teacher_list_page] [list_container]");
                                                               if (status != 0) {
                                                                   alert(data);
                                                               }    
                                                            });      
}