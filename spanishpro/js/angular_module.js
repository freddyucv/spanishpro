(
    
    function () {
        
        angular.module('spanishpro', ['ui.router', 'ngFileUpload','ui.date'])
          .config(function ($stateProvider, $urlRouterProvider) {
                
                $urlRouterProvider.otherwise("home");
                
                $stateProvider.state('home', {
                      url: '/home'             
                    })
                    .state('modo', {
                      url: '/modo',
                      templateUrl: 'additional_service.html'
                    })                
                    .state('reset_password', {                             
                      url: '/reset_password',
                      onEnter: function(){
                        showResetPasswordDialog("Setear password / Set Password");
                      }
                    })
                    .state('tokens_admin', {
                      url: '/tokens_admin',                     
                      templateUrl: 'tokens_admin.html'
                    })                    
                    .state('perfil', {
                      url: '/Perfil',
                      templateUrl: 'perfil.html'
                    })
                    .state('como_funciona', {
                      url: '/como_funciona',
                       templateUrl: 'how_work.html',
                      data:{
                            title: "¿Como Funciona? / How it Work?",
                            pageName:"Como Funciona",
                            showDialog: false
                      }
                    })
                    .state('clases', {
                      url: '/clases',                     
                      templateUrl: 'calendario.html'
                    })
                    .state('profesores', {
                      url: '/profesores',                     
                      templateUrl: 'teachers.html'
                    })
                    .state('tokens', {
                      url: '/tokens',                      
                      templateUrl: 'tokens.html'
                    })
                    .state('admin', {
                      url: '/admin',                       
                      templateUrl: 'Admin.html',
                      data:{
                            title: "¿Como Funciona? / How it Work?"
                      }
                    })
                    .state('static_pages', {
                      url: '/static_pages',                       
                      templateUrl: 'static_pages.html'
                    });
                    
                    
                
          })
          .run(function ($rootScope, $http) {
                
                $rootScope.currentPicture = 0;
                
                if (!$rootScope.config) {                    
                    loadConfig($rootScope, $http);
                }

                if (!$rootScope.staticPagesConfig){
                    loadStaticPage($rootScope, $http);    
                }
                
                if (!$rootScope.combos) {
                    loadCombos($http, $rootScope);
                }
          })
          .controller('StateCtrl', ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {
                        $scope.$state = $state;
                        $rootScope.currentPicture = ($rootScope.currentPicture + 1) % 2;
                        

                
                        if (sessionStorage.currentUser){
                            $rootScope.currentUser = JSON.parse(sessionStorage.currentUser);
                        }
                        
                        this.load = function(){
                            if (!$rootScope.config) {                    
                                loadConfig($rootScope, $http);
                            }
                            
                            if (!$rootScope.combos) {
                                loadCombos($http, $rootScope);
                            }                            
                        }
                    }])
            .controller('RegisterController', ['$http',  function($http) {
                initRegisterUser(this, $http);
    
                this.loadCitiesCombo = function(cities){
                    
                    this.cities = [];
                    this.cities = cities;
                    
                    if (cities.length > 0) {
                        this.city = cities[0];
                    }else{
                        this.city = null;
                    }
                    
                }
                
                this.loadCities = function (country){
                    loadCities('country', 'cities_register', $http, this, country);
                    

                }                
            }])
            .controller('PasswordController', ['$http',  function($http) {
                initPasswordUser(this, $http);
    
            }])
            .controller('ForgetController', ['$http', function($http, $rootScope) {
                initForgetPasswordUser(this, $http);
    
            }])
            .controller('LoginController', ['$http', '$rootScope', '$state',  function($http, $rootScope, $state) {
                initLoginUser(this, $http, $rootScope, $state);
    
            }])
            .controller('ConfigController', ['$http', '$rootScope',  function($http, $rootScope) {
                this.config = $rootScope.config;
                
                this.save = function(){
                                                saveConfig(this, $http);
                                                $rootScope.config = this.config;
                                  }    
            }])
            .controller('CombosController', ['$http', '$rootScope',  function($http, $rootScope) {
                 $("[error]").hide();                                                
                                 
                if (!$rootScope.combos) {
                    loadCombos($http, $rootScope, this);
                }else{
                    this.combos = $rootScope.combos;
                }
                
                this.loadCombos = function (data){                    
                                        this.combos = data;                    
                                 }
                                 
                this.saveCombos = function(){
                                           saveCombos(this, $http, $rootScope);
                                  }
                                  
                this.addCombo = function(){
                                            addCombo(this);

                 
                                  }                                      
            }])
            .controller('TokenController', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {
                this.bills = $rootScope.currentUser.bills;
                
                if ($rootScope.currentUser) {
                    initTokensController($http, $rootScope, this);
                                                                    
                    this.showBuyTokensDialog = function(){
                                        for(var i = 0; i < $rootScope.combos.length; i++){
                                            $rootScope.combos[i].selected = false;
                                            $rootScope.combos[i].quantity = 0;
                                        }
    
                                        showDialog('[buy_tokens_dialog]');
                                    }
                                    
                                 
                    this.calculatePay = function (){
                                                        calculatePay(this, $rootScope);
                                                    }
                                                    
                    this.buy = function(){
                                                buy(this, $rootScope);

                                            
                                         }
                                         
                    this.dateFormat = function(date){
                                            return dateFormat(date);
                                      }
                    this.initCombos = function(combos){
                                        this.combos = combos;
                        
                    }
                
                    
                                      
                }else{
                    alert("Debe estar logeado / you must to logged");
                    $state.go("home");
                }
   
            }])
            .controller('ValidateTokensController', ['$http',  function($http) {
                initValidateTokensController($http, this);    
            
                this.load = function(data){                
                    this.studensTokens = data;
                }
                
                this.validateTokens = function(){
                                            validateTokens(this, $http);                    
                                    }
                                    
                this.dateFormat = function(date){
                                     return dateFormat(date);
                               }
            }])
            .controller('TokensManagmentController', ['$http',  function($http) {
                initTokensManagmentController($http, this);    
            
                this.load = function(data){
                    this.studensTokens = data;
                    
                    
                }
                
                this.notFound = function(){
                                    return  !this.found || this.found.length == 0   
                    
                                }
                                
                this.incrementTokens = function (){
                                            incrementTokens($http, this);
                                        }

                this.loadTeachers = function(data){
                                        this.teachers = data;
                                    }
                

                
                this.search = function(){
                             this.found = [];
                             
                             for (var i = 0; i < this.studensTokens.length; i++){
                                var name = this.studensTokens[i].name;
                                
                                if (name && name.toUpperCase().indexOf(this.searchCriteria.toUpperCase()) != -1) {                                    
                                    this.found.push(this.studensTokens[i]);
                                }
                                
                             }
                        }
            }])
            .controller('PerfilController',[ '$http', '$rootScope', 'Upload','$state', function($http, $rootScope, Upload,$state) {
                
                this.dateOptions = {
                    changeYear: true,
                    changeMonth: true,
                };
                
                if(!$rootScope.currentUser){
                    alert("Debe estar logeado / you must to logged");
                    $state.go("home");
                }
                
                $("[error]").hide();  
                this.edit = false;
                this.countries = countries;
                                
                loadClasss($http, this, $rootScope);
                
                this.loadCities = function (country){
                    loadCities('country_perfil', 'cities_perfil', $http, this, country);
                    

                }
                
                this.loadCitiesCombo = function(cities){
                    
                    this.cities = [];
                    this.cities = cities;
                    
                    if (cities.length > 0) {
                        this.city = cities[0];
                    }else{
                        this.city = null;
                    }
                    
                }
                
                this.loadCities($rootScope.currentUser.country);
                
                this.loadClasss = function (data){
                    
                                    this.classs = data;
                                 }
                                 
                this.changeStatus = function(){
                                                                  
                                                if (this.edit) {
                                                    var valid = fieldsValid($("[perfil_page]"));

                                                    if (valid) {                                                    
                                                        sessionStorage.currentUser = JSON.stringify($rootScope.currentUser);
                                                        
                                                        updateUser(this, $http, $rootScope.currentUser, Upload);
                                                        
                                                    }    
                                                }else{                                                
                                                    this.edit = !this.edit;
                                                }
                                    }
                                    
                this.dateFormat = function(date){
                                            var timeZone = moment().utcOffset();
                                            return dateFormat(moment(date).utcOffset(timeZone));
                                      }
                                      
                this.getStatus = function (statusCode){
                                    if (statusCode == "book"){
                                        return "Publicado/Published";    
                                    }else if (statusCode == "reserved"){
                                        return "Reservada/Reserved";
                                    }else if (statusCode == "canceled"){
                                        return "Cancelada/Canceled";
                                    }else {
                                        return "Realizada/Done";
                                    }
                                }
                                
                this.cancel = function (classs){
                                    if (!this.waiting) {
                                        cancelClass(classs, $rootScope, $http
                                                    );
                                    }    
                                }
                                
                this.isFilter = function(classs){
                                
                                    return (classs.status != 'unbook'  && classs.status != 'canceled') || (classs.status == 'canceled' && classs.oldStatus == "reserved");
                    
                                }
            }])
            .controller('ListTeacherController', ['$http',  function($http) {
                initTeacherController($http, this);    
            
                this.loadTeachers = function(data){
                                        this.teachers = data;

                                    }
     
            }])
            .controller('StaticPageConfigController', ['$http', '$rootScope', function($http, $rootScope) {

                                      
            }])
            .controller('HowWorkPageController', ['$state', '$rootScope', function($state, $rootScope) {
                
                this.title = $state.current.data.title;
                this.showDialog = $state.current.showDialog;
                this.staticPagesConfig = $rootScope.staticPagesConfig;
                
                for (var i = 0; i < this.staticPagesConfig.length; i++){
                        var pageConfig = this.staticPagesConfig[i];
                       
                        if (pageConfig.page == $state.current.data.pageName) {
                            this.content = pageConfig.content;
                            break;
                        }
                    }                
                
            }])
            .controller('StaticPageController', ['$rootScope', function($rootScope) {
                this.showDialog = false;                 
                
                this.loadDialog = function(screen){
                                            this.staticPagesConfig = $rootScope.staticPagesConfig;
                                            
                                            for (var i = 0; i < this.staticPagesConfig.length; i++){
                                                    var pageConfig = this.staticPagesConfig[i];
                                                   
                                                    if (pageConfig.page == screen) {
                                                        this.content = pageConfig.content;
                                                        this.title = pageConfig.title;
                                                        
                                                        break;
                                                    }
                                                }                                      
                                 }
            }])
            .controller('WallCalendarController', ['$rootScope','$http', function($rootScope, $http) {
                
               var date  = moment();
               
               this.filter = "Teacher";
               
               var months = ["Enero/January",
                            "Febrero/February",
                            "Marzo/March",
                            "Abril/April",
                            "Mayo/May",
                            "Junio/June",
                            "Julio/July",
                            "Agosto/August",
                            "Septiembre/September",
                            "Octubre/October",
                            "Noviembre/November",
                            "Diciembre/December"];
               
                var weekday = new Array(7);
                weekday[0]=  "Domingo/Sunday";
                weekday[1] = "Lunes/Monday";
                weekday[2] = "Martes/Tuesday";
                weekday[3] = "Miercoles/Wednesday";
                weekday[4] = "Jueves/Thursday";
                weekday[5] = "Viernes/Friday";
                weekday[6] = "Sabado/Saturday";                                   
                
                if ($rootScope.config) {
                    var d = moment(date).date();
                    
                    date = moment(date).add($rootScope.config.reserveTime, 'm');                
                    date.add(1, "h");
                    date.set("m", 0);
                    date.set("date", d);
                }
                
                this.currentDate = {
                        d: date,
                        date: date.date(),
                        AMPM: moment(date).format("a").toUpperCase(),
                        currentTime: moment(date).format("h")
                    };
                
                this.days = [];
                
                for(var i = 0; i < 8; i++){                    
                    
                    var d = {
                            id:i,
                            month: months[date.month()],
                            monthIndex: date.month(),
                            date: date.date(),
                            day: weekday[date.day()],
                            d: date
                        };
                        
                    this.days.push(d);
                    
                    if (i == 0) {
                        this.selectedDay = d;
                    }
                    
                    date = moment(date).add(1, 'days'); 
                }
                
                if ($rootScope.currentUser) {
                    getCalendar(this, $http, $rootScope, "My");
                }
                
                getCalendar(this, $http, $rootScope);
                
                this.getCalendar = function(filter){
                    
                                       if (!filter) {
                                            filter = this.filter;
                                        }
                                        
                                        if (filter == "My") {
                                            this.loadCalendar(this.Mydata, filter); 
                                        }else if (this.dataFilter != filter) {
                                            getCalendar(this, $http, $rootScope, filter);  
                                        }else{
                                           this.loadCalendar(this.data, filter); 
                                        }
                                        
                                   }            
                
                this.loadCalendar = function(data, filter){                                           
                                        loadCalendar(this, $rootScope, filter, data);
                                    }

                this.loadNotFirsClass = function(notFirstClassData){
                    
                                            this.notFirstClass = new Map();
                                            
                                            for (var i = 0; i < notFirstClassData.length; i++){
                                                this.notFirstClass.set(notFirstClassData[i]["_id"], true);
                                            }
                                            
                                            
                }
                
                this.reserve = function(){
                                    if (!this.waiting) {
                                        if($rootScope.currentUser &&
                                           $rootScope.currentUser.type != this.filter &&                                        
                                           this.filter != 'My'){
                                            
                                             if ($rootScope.currentUser.type == "Student" && $rootScope.currentUser.tokens> 0) {
                                                reserve(this, $http, $rootScope);
                                             }else if ($rootScope.currentUser.type == "Teacher") {
                                                reserve(this, $http, $rootScope);
                                             }else if ($rootScope.currentUser.tokens == 0){
                                                alert("No tiene suficientes tokens / You dont have tokens");
                                             }
                                             
                                        
                                        }
                                    }    
                                }
                               
                this.book = function(){
                            book(this, $http, $rootScope);
                         }
                         
                this.dateChange = function(){
                    this.currentDate.date = this.selectedDay.date;
                    this.currentDate.d.date(this.currentDate.date);
  
                }
                
                var inavlidHourMessage = "Hora invalida para agendar / Invalid time to schedule";
                
                this.downHour = function(){
                                    moment(this.currentDate.d.subtract(1, "h"));
                                    this.currentDate.d.date(this.currentDate.date);
                                    
                                    var stringTime = moment(this.currentDate.d).format('h a');
                                    var slipt = stringTime.split(" ");
                                    
                                    this.currentDate.currentTime = slipt[0];
                                    this.currentDate.AMPM = slipt[1].toUpperCase();

                                    
                                }
                                
                this.upHour = function(){
                                    moment(this.currentDate.d.add(1, "h"));
                                    this.currentDate.d.date(this.currentDate.date);
                                    
                                    var stringTime = moment(this.currentDate.d).format('h a');
                                    var slipt = stringTime.split(" ");
                                    
                                    this.currentDate.currentTime = slipt[0];
                                    this.currentDate.AMPM = slipt[1].toUpperCase();
                                }
                                
                this.validHour = function(currentTime){
    
                                    if (this.currentDate.date == moment().date()){
                                        var ct = currentTime;
                                        
                                        if (this.currentDate.AMPM == "PM") {
                                            ct = ct + 12;
                                        }
 
                                        return ct > moment().hour();     
                                    }
                                    
                                    return true;
                                }
                          
            }])
            .controller('CancelClassController', ['$http', function($http) {
                    this.resumes =[];
                    this.filter = {};
                    this.filter.typeUser = 'Teacher'
                    
                    loadCancelClass(this, $http);
                    
                    this.loadCancelClass = function(cancelClass){
                                                this.resumesAux = [];
                                                
                                                
                                                if (cancelClass) {
                                                    
                                                    
                                                    for (var i = 0; i < cancelClass.length; i++){
                                                        console.log(cancelClass[i].cancelBy);
                                                        
                                                    }
                                                                                                       
                                                   var oldCancelBy = cancelClass[0].cancelBy;
                                                   var resume = this.loadCanceledClass(cancelClass[0]);
                                                                                                        
                                                   for (var i = 0; i < cancelClass.length; i++){                                                        
                                                                                                            
                                                        
                                                        if (oldCancelBy != cancelClass[i].cancelBy) {
                                                         
                                                            resume = this.loadCanceledClass(cancelClass[i]);
                                                            oldCancelBy = cancelClass[i].cancelBy;
                                                        }
                                                                                                            
                                                        if (cancelClass[i].fatalWarnning){
                                                            resume.nFatalWarnnings++;
                                                        }                                                        
                                                        
                                                        if (!cancelClass[i].reverseTokens){
                                                            resume.reverseTokens++;
                                                        }
                                                                                                                
                                                        resume.nCanceledClass++;
                                                        
                                                        resume.classs.push(cancelClass[i]);    
                                                   }
                                                }
                                                
                                                this.resumes = [];
                                                this.resumes = this.resumesAux;                                                
                    }
                                        
                    this.dateFormat = function(date){
                                            return dateFormat(date);
                                      }
                                      
                    this.loadCanceledClass = function(cancelClass){

                                                
                                                var resume = {
                                                            nCanceledClass: 0,
                                                            nFatalWarnnings: 0,
                                                            reverseTokens: 0,
                                                            classs: []
                                                         };
                                                         
                                                 if (cancelClass.cancelBy == cancelClass.student) {
                                                    resume.name = cancelClass.studentName;
                                                    resume.typeUser = 'Student';
                                                    
                                                 }else{
                                                    resume.name = cancelClass.teacherName;
                                                    resume.typeUser = 'Teacher';

                                                }
                                                
                                                
                                                this.resumesAux.push(resume);
                                                
                                                return resume; 
                    }
    
                    
            }])
            .controller('ReservedDoneClassController', ['$http', function($http) {
                    this.resumes =[];
                    this.filter = {};
                    this.filter.typeUser = 'Teacher'
                    
                    loadReservedDoneClass(this, $http);
                    
                    this.loadReservedDoneClass = function(reservedDoneClass){
                                                console.log("reservedDoneClass " + reservedDoneClass);
                                                console.log("reservedDoneClass.length " + reservedDoneClass.length);
                                                
                                                if (reservedDoneClass && reservedDoneClass.length > 0) {
                                                    this.resumesAux = new Map();                                                                                                                                                              
                                                                                                        
                                                    for (var i = 0; i < reservedDoneClass.length; i++){                                                        
                                                        this.createResume(reservedDoneClass[i]);
                                                    }
                                                    
                                                    this.resumes = [];
                                                    var values = this.resumesAux.values();
                                                    for (var i = 0; i < values.length; i++) {
                                                        var value = values[i]; 
                                                        this.resumes.push(value);
                                                    }
                                                    
                                                }
                                                                                               
                    }
                                        
                    this.dateFormat = function(date){
                                            return dateFormat(date);
                                      }
                                      
                    this.count = function(resume, loadReservedDoneClass){
                        if (loadReservedDoneClass.status == "reserved"){
                            resume.nReservedClass++;
                        }else{
                            resume.nDoneClass++;
                        }    
                    }
                    
                    this.createResume = function(loadReservedDoneClass){

                                                var exitsStundet = this.resumesAux.has(loadReservedDoneClass.student);
                                                console.log("exitsStundet " + exitsStundet);
                                                
                                                if (!exitsStundet) {
                                                    var resume = {
                                                                nReservedClass: 0,
                                                                nDoneClass: 0,
                                                                classs: [loadReservedDoneClass],
                                                                name: loadReservedDoneClass.studentName,
                                                                typeUser: 'Student'                                                               
                                                             };
                                                             
                                                    this.resumesAux.set(loadReservedDoneClass.student, resume);
                                                    this.count(resume, loadReservedDoneClass);
                                                }else{
                                                   var resume = this.resumesAux.get(loadReservedDoneClass.student);
                                                   this.count(resume, loadReservedDoneClass);
                                                   resume.classs.push(loadReservedDoneClass);
                                                }

                                                var exitsTeacher = this.resumesAux.has(loadReservedDoneClass.teacher);
                                                console.log("exitsTeacher " + exitsTeacher);
                                                
                                                if (!exitsTeacher) {
                                                    var resume = {
                                                                nReservedClass: 0,
                                                                nDoneClass: 0,
                                                                classs: [loadReservedDoneClass],
                                                                name: loadReservedDoneClass.teacherName,
                                                                typeUser: 'Teacher'                                                                
                                                             };
                                                             
                                                    this.resumesAux.set(loadReservedDoneClass.teacher, resume);
                                                    this.count(resume, loadReservedDoneClass);
                                                }else{
                                                    var resume = this.resumesAux.get(loadReservedDoneClass.teacher);
                                                    this.count(resume, loadReservedDoneClass);
                                                    resume.classs.push(loadReservedDoneClass);
                                                }
                                            }    
                                                
                                                
            }])            
            .controller('TeacherPaymentController', ['$http',  function($http) {
                initTeachersPayments($http, this);    
            
                this.dateFormat = function(date){
                                            return dateFormat(date);
                                      }
                                      
                this.loadTeacherPayment = function(data){
                    
                        if (data.length > 0) {
                            
                            this.classsCancel = [];
                            var currentTeacher = data[0].teacher;
                            
                            for (var i = 0; i < data.length; i++){
                                var c;
                                
                                for (var k = 0; k < this.classsCancel.length; k++){
                                    if (data[i].teacher == this.classsCancel[k].teacherId) {
                                        c = this.classsCancel[k];
                                        break;
                                    }
                                }
                                
                                if (k == this.classsCancel.length) {
                                    c = {
                                          name: data[i].teacherName,  
                                          teacherId: data[i].teacher,
                                          nClasss : 0,
                                          nFirstClasss: 0 ,
                                          detail: []
                                    }
                                    
                                    this.classsCancel.push(c);
                                }
                                c.nClasss++;
                                
                                if (data[i].firstClass) {
                                    c.nFirstClasss++;
                                }
                                
                                c.detail.push(data[i]);    
                            }
                        }    
                }
                
                    
                this.paymentAll = function(classs){
                    
                                        for (var i = 0; i < classs.detail.length; i++){
                                            classs.detail[i].payment = classs.paymentAll; 
                                        }
                                        
                    }
                    
                this.payment = function(){                    
                    paymentClass(this, $http);
                }
                
                this.load = function(data){
                    this.classsCancel = data;
                }
            }])
            .controller('AdminContactController',  ['$http',  '$rootScope', function($http, $rootScope) {

                this.closeDialog = function(){
                    closeDialog('[contact_admin_dialog]');
                    this.content = "";
                    this.email = "";                    
                    
                }
                
                this.contact = function(){
                                var data = {
                                                content: this.content
                                           };
                                
                                if($rootScope.currentUser){
                                    data.email = $rootScope.currentUser.email;
                                    data.userName = $rootScope.currentUser.name;
                                }else{
                                    data.email = this.email;
                                }
                                
                                var httpReq = {
                                    method: 'POST',
                                    url: 'contact_admin',
                                    data: data
                                }
                                
                                $http(httpReq).success(function(data, status, headers, config) {
                                                                                            alert("Correo enviado con exito");
                                                                                            this.closeDialog();

                                                                                         }.bind(this))
                                        .error(function(data, status, headers, config) {
                                                                                            if (status != 0) {
                                                                                                alert(data);
                                                                                            }    
                                                                                        });
                }
    
            }]);
    }()
);


