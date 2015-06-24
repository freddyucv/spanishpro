function loadClasss($http, $this, $rootScope) {
    var httpReq = {
     method: 'GET',
     url: 'classs/' + $rootScope.currentUser["_id"],

    };
    
    $http(httpReq).success(function(data, status, headers, config) {
                                                                $this.loadClasss(data);
                                                             })
            .error(function(data, status, headers, config) {
                                                                if (status != 0) {
                                                                    alert(data);
                                                                }    
                                                            }); 
}

function checkHourToBook($this) {
    
    if (!checkHour($this, $this.currentDate.d)){
        return true;
    }else{
        return false;
    }
}

function getDateToReserve($this) {
    for (var i = 0; i < $this.data.length; i++){
        if($this.maybeReserve == $this.data[i]["_id"]){
            classs = $this.data[i];
            break;
        }    
    }
    
    var timeZone = moment().utcOffset();
                                           
    return moment(classs.date).utcOffset(timeZone);
    
}
function checkHourToReserve($this) {
    var classs;
    
    var date = getDateToReserve($this);
    console.log("classs.date " + moment(date).format("DD/MM/yyyy HH:mm"));    
    return checkHour($this, date);
    

}


function checkHour($this, date) {
    
    if ($this.Mydata) {
        console.log("date " + date.date() + " " + date.hour()); 
        for(var i = 0; i < $this.Mydata.length; i++){
            var calendarHour = $this.Mydata[i];
            var calendarHourDate = moment(calendarHour.date);
            console.log("calendarHour " + calendarHourDate.date() + " " + calendarHourDate.hour());
            if (date.date() == calendarHourDate.date()){
                
                if (calendarHourDate.hour() == date.hour()) {
                    console.log("calendarHour " + JSON.stringify(calendarHour));
                    return calendarHour;
                }
            }
        }
    }
    
    return null;
}

function checkLimitReserveBookTime($this, $rootScope, date){
    var selectDate = date.date();
    var today = moment();
    var todayDate = today.date();
    
    console.log("selectDate " + selectDate);
    console.log("todayDate " + todayDate);
    
    
    if (selectDate == todayDate) {
        var minutesFromNow = getMinutesFromNow(date);
    
        if (minutesFromNow < 0) {
            alert("Hora no valida / not valid hour");
            return false;
        }else if (minutesFromNow <= $rootScope.config.reserveTime){
            var message1 = "Se debe publicar/reservar con al menos " + $rootScope.config.reserveTime + " minutos de anticipación";
            var message2 = "You must publish or reserve with at least  " + $rootScope.config.reserveTime + " minutes in advance";
            
            alert(message1 + "/" + message2);
            return false;
        } 
    }
    
    return true;
}

function book($this, $http, $rootScope){
    $this.waiting = true;
    
    if ($rootScope.currentUser.type == "Student") {
        if ($rootScope.currentUser.tokens == 0){
            alert("No tiene tokens para publicar / dont have tokens to publish");
            return;
        }
        
        if (!checkLimitForDay($this, $rootScope)){
            return;
        }
    }
        
    if (!checkLimitReserveBookTime($this, $rootScope, $this.currentDate.d)) {        
        return;
    }
    
    var date = moment($this.selectedDay.d);
    var key = moment(date).format('YYYYMMDD');
    
    var valid =  checkHourToBook($this);
       
    if (valid) {
        var book = {};
        
        var hour = $this.currentDate.d.hour();
    
        date.hour(hour);
        date.minutes(0);
        
        var user = $rootScope.currentUser;
        book.email = user.email;    
        
        if (user.type == "Teacher") {
            book.teacherName = user.name;
            book.teacher = user["_id"];
            book.teacherPicture = user.picture;
            book.owner = "Teacher";
            book.teacherTime = moment().utcOffset();
        }else{
            book.studentName = user.name;
            book.student = user["_id"];
            book.studentPicture = user.picture;
            book.owner = "Student";
            book.studentTime = moment().utcOffset();
        }
        
        book.status = "book"
        var data = book;
        
        data.date = moment(date).utcOffset(0);
    
        var httpReq = {
            method: 'POST',
            url: 'class/',
            data: book  
        };
        
        $http(httpReq).success(function(data, status, headers, config) {
                                                                    alert("Publicada/Published");
                                                                    $this.waiting = false;
                                                                 })
                .error(function(data, status, headers, config) {
                                                                    if (status != 0) {
                                                                        alert(data);
                                                                    }    
                                                                    $this.waiting = false;
                                                                });
        
        book.date = date;

        if ($this.filter == "Teacher" && user.type == "Teacher") {
            $this.data.push(book);
            $this.data.sort(sortBook);
        }
        
        $this.Mydata.push(book);
        
        $this.Mydata.sort(sortBook);
        
        $this.getCalendar();
    }else{
        alert("Ya tienes una clase publicada o reservada a esa hora / You already have a published class or reserved at this time");
    }        
    
}

function sortBook(bookA, bookB) {
    return new Date(bookA.date).getTime() - new Date(bookB.date).getTime();
}

function checkLimitForDay($this, $rootScope){
    var date = moment($this.selectedDay.d);
    var key = moment(date).format('YYYYMMDD');
    var limitDate = $this.limit.get(key);    
    
    if (limitDate && limitDate >= $rootScope.config.limitClassToReserveToDay) {
        alert("Ya ha sobrepasado el limite de clases para reservar y publicar para este dia / It has already exceeded the limit classes to book and publish for this day");
        return false;
    }
    
    return true;
}

function reserve($this, $http, $rootScope) {    
    
    var date = getDateToReserve($this);
    
    if (!checkLimitReserveBookTime($this, $rootScope, date)) {        
        return;
    }
    
    var classsSameHour = checkHourToReserve($this);
    
    if ($rootScope.currentUser.type == 'Student') {
        if (!checkLimitForDay($this, $rootScope)){
            return;
        }
    }
    
    if (!classsSameHour || classsSameHour.status == "book") {
        
        var r = confirm("¿Seguro que desea reservar esta clase? / Are you sure you want to reserve this class?");
        
        if (r) {
            this.waiting = true;
            var classToReserve = $this.maybeReserve;
            
            var data = {};
            
            if (classsSameHour) {
                data.idClassBookSameTime= classsSameHour["_id"];
            }
            
            data.userTime = moment().utcOffset();    
            
            var httpReq = {
                method: 'PUT',
                url: $rootScope.currentUser["_id"] + '/class/reserve/' + $this.maybeReserve,
                data: data
            };
            
            $http(httpReq).success(function(data, status, headers, config) {
                                                                        alert("Clase reservada / Class was reserved");                                                                
                                                                        
                                                                        for (var i = 0; i < $this.data.length; i++){
                                                                            
                                                                            if(classToReserve == $this.data[i]["_id"]){
                                                                                if (!$this.Mydata) {
                                                                                    $this.Mydata = [];
                                                                                }
                                                                                $this.data[i].status = "reserved";
                                                                                $this.Mydata.push($this.data[i]);
                                                                               
                                                                                $this.data.splice(i, 1);
                                                                                
                                                                                break;
                                                                            }    
                                                                        }
                                                                        
                                                                        reloadUser($rootScope, $http);
                                                                        $this.getCalendar();
                                                                        this.waiting = false;
                                                                         
                                                                        
                                                                     })
                    .error(function(data, status, headers, config) {
                                                                        if (status != 0) {
                                                                            alert(data);
                                                                        }    
                                                                        this.waiting = false;
                                                                    });
        }                        
    }else{
        alert("Ya tienes una clase publicada o reservada a esa hora / You already have a published class or reserved at this time");
    }    
}                                                           
    


function getCalendar($this, $http, $rootScope, calendarFilter){
    var filter = {};

    if (!calendarFilter) {
        calendarFilter = $this.filter;
    }
    
    console.log("utcOffset " + moment().utcOffset());
    
    filter.date = moment(); 
    filter.type = calendarFilter ;

    var today = moment();
    

    if (filter.date.date == today.date()) {
        filter.date.add($rootScope.config.reserveTime, "m");
    }
    
    filter.date = moment(filter.date ).utcOffset(0);

    if (filter.date.date != today.date()) {
        filter.date.hour(0);
    }
    
    if (calendarFilter == "My") {
        filter.userId = $rootScope.currentUser["_id"];
    }
    
    var httpReq = {
        method: 'POST',
        url: 'calendar/',
        data: filter  
    };
    
    $http(httpReq).success(function(data, status, headers, config) {                                                                            
                                                                
                                                                if (data.notFirtsClass) {
                                                                    
                                                                    $this.loadNotFirsClass(data.notFirtsClass);
                                                                }
                                                                
                                                                $this.loadCalendar(data.calendarData, calendarFilter);
                                                             })
            .error(function(data, status, headers, config) {
                                                                if (status != 0) {
                                                                    alert(data);
                                                                }    
                                                            });       
}

function countReserveAndBook($this, c){    
    
    var dateKey = moment(c.date);
    var key = moment(dateKey).format('YYYYMMDD');
    
    var limitDate = $this.limit.get(key);
    
    if (!limitDate) {
        limitDate = 0;
    }
    
    limitDate++;
    $this.limit.set(key, limitDate);
}

function loadCalendar($this, $rootScope, filter, data) {
    var currentDate = $this.selectedDay.date;
                                            
    if (filter == "My") {                                            
        $this.Mydata = data;
        $this.limit = new Map();
    }else{                                        
        $this.data = data;
        $this.dataFilter = $this.filter;
    }
                            
    if (filter == $this.filter){                
        var calendar = new Map();
        $this.calendar = [];
    }
    
    
    for (var i = 0; i < data.length; i++) {
        
        var c = data[i];
        var timeZone = moment().utcOffset();
                                           
        var date = moment(c.date).utcOffset(timeZone);
        
        if (filter == "My") {                                            
            countReserveAndBook($this, c);
        }
        
        if (currentDate == date.date() && c.status == "book" && filter == $this.filter) {
            
            var hourLabel = date.format("hh:mm a");
            
            var user = {};
            user.classId = c["_id"];
            
            if ($this.filter == "Teacher" || ($this.filter == "My" && $rootScope.currentUser.type == "Teacher")){
                user.name = c.teacherName;
                user.id = c.teacher;
                user.picture = c.teacherPicture;                
            }else if ($this.filter == "Student" || ($this.filter == "My"  && $rootScope.currentUser.type == "Student")) {
                user.name = c.studentName;
                user.id = c.student;
                user.picture = c.studentPicture;
                
                if ($this.filter == "Student"){
                    var notFirstClass = $this.notFirstClass.get(user.id);
                    
                    if (!notFirstClass) {
                        user.firstClass = true;
                    }
                }
            }                                            
            

            var index = calendar.get(hourLabel);
            var hour;
            
            if (index != undefined) {
                hour = $this.calendar[index];
                
            }else{
                hour = {};
                hour.users = []
                hour.hourLabel = hourLabel;
                
                calendar.set(hourLabel, $this.calendar.length);
                $this.calendar.push(hour);
            }
            
            hour.users.push(user);

        }                                        
    }    
}

function cancelClass(classs, $rootScope, $http){
    var data =  {
                userId: $rootScope.currentUser["_id"]
              };
              
    var today = moment();
    var classsMoment = moment(classs.date);
    
    if (classs.status == "reserved"){
        data.reverseTokens = true;
        
        if (today.date() == classsMoment.date() && today.month() == classsMoment.month()) {
        
            if (today.hour() > classsMoment.hour()) {
                alert("Ya esta clase paso, no puede ser cancelada / This class is done, it cant be calceled");
            }else{
               
                var minutesFromNow = getMinutesFromNow(classsMoment);

                if ($rootScope.currentUser.type == "Student") {
                    if (minutesFromNow <= $rootScope.config.cancelTime) {
                        data.reverseTokens = false;
                    }
                }else{
                    
                    if (minutesFromNow <= $rootScope.config.teacherCancelTime) {
                        data.fatalWarnning = true;
                    }
                                    
                }
            }
        }    
    } 

    var r = confirm("¿Seguro que desea cancelar esta clase? / Are you sure you want to cancel this class?");
            
    if (r) {    
        console.log("Cancelar " + JSON.stringify(data));
        
        var httpReq = {
             method: 'PUT',
             url: 'classs/' + classs["_id"] + "/cancel",
             data: data
         };
         
         $http(httpReq).success(function(data, status, headers, config) {
                                                                     classs.status = "canceled";
                                                                     reloadUser($rootScope, $http);
                                                                  })
                 .error(function(data, status, headers, config) {
                                                                    if (status != 0) {
                                                                         alert(data);
                                                                    }     
                                                                 });
    }
}

function getMinutesFromNow(classsMoment) {
    var today = moment();
    
    var hourFromNow =  (classsMoment.hour() - today.hour()) * 60;
    return hourFromNow + (classsMoment.minute() - today.minute());
}

function loadCancelClass($this, $http ) {
    
   var httpReq = {
        method: 'GET',
        url: 'classs_canceled'
    };
    
    $http(httpReq).success(function(data, status, headers, config) {
        
                                                                $this.loadCancelClass(data);
                                                             })
            .error(function(data, status, headers, config) {
                                                                if (status != 0) {
                                                                    alert(data);
                                                                }    
                                                            });          
}

function loadReservedDoneClass($this, $http ) {
    
   var httpReq = {
        method: 'GET',
        url: 'classs_reserved_done'
    };
    
    $http(httpReq).success(function(data, status, headers, config) {
        
                                                                $this.loadReservedDoneClass(data);
                                                             })
            .error(function(data, status, headers, config) {
                                                                if (status != 0) {
                                                                    alert(data);
                                                                }    
                                                            });          
}

function initTeachersPayments($http, $this){
        
    var httpReq = {
        method: 'GET',
        url: 'teachers_payment'
    }
    
    $http(httpReq).success(function(data, status, headers, config) {
                                                                $this.loadTeacherPayment(data);
                                                             })
            .error(function(data, status, headers, config) {
                                                                if (status != 0) {
                                                                    alert(data);
                                                                }    
                                                            }); 
}

function paymentClass($this, $http) {
    var payments = [];
    var toDelete = [];
    
    for (var i = 0; i < $this.classsCancel.length; i++){
        var billsDelete = [];
        
        for (var k = 0; k < $this.classsCancel[i].detail.length; k++){
            var classDetail =  $this.classsCancel[i].detail[k];
            
            if ($this.classsCancel[i].detail[k].payment){                
                payments.push($this.classsCancel[i].detail[k]["_id"]);
                
                
                billsDelete.push(k);
            }             
            
        }
        
        toDelete.push(billsDelete);

    }
    
   var httpReq = {
        method: 'PUT',
        url: 'classs/payment',
        data: {payments: payments}
    };
    
    $http(httpReq).success(function(data, status, headers, config) {
        
                                                                alert("Los pagos fueron registrados con exito");
                                                                
                                                                for (var i = (toDelete.length - 1); i >= 0; i--) {
                                                                    var billsDelete = toDelete[i];
                                                                    var nFirstClass = 0;

                                                                    for (var k = billsDelete.length - 1; k >= 0; k--){                                                                        
                                                                        $this.classsCancel[i].detail.splice(billsDelete[k], 1);
                                                                        
                                                                        
                                                                        if ($this.classsCancel[i].detail.firstClass){
                                                                            nFirstClass++;   
                                                                        }
                                                                    }
                                                                    
                                                                    if ($this.classsCancel[i].detail.length == 0){
                                                                        $this.classsCancel.splice(i, 1);    
                                                                    }else{
                                                                       $this.classsCancel[i].nClasss -= billsDelete.length;
                                                                       $this.classsCancel[i].nFirstClasss -= nFirstClass;
                                                                    }
                                                                 }
                                                                 
                                                                 $this.load ($this.classsCancel);
                                                             })
            .error(function(data, status, headers, config) {
                                                                if (status != 0) {
                                                                    alert(data);
                                                                }    
                                                            });       

}