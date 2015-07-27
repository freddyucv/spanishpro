var dao = require('../util/db_util.js');
ObjectID = require('mongodb').ObjectID;
var moment = require('moment');
var userService = require('../register_server_service.js');
var email = require('../util/email_util.js');
var config = require('../util/config.js');

finishClasss();

setInterval(function(){
                finishClasss();      
            },
            
            60 * 60 * 1000);

module.exports = {
                    /**
                     * @param opts.userId
                     * @param opts.successCallback
                     * @param opts.errorCallback
                     * 
                     */
                    getClass: function(opts){
                                userService.getUser({
                                                        userId: opts.userId,
                                                        successCallback:  function(user){
                                                                                var q;
                                                                                
                                                                                if (user.type == "Student") {
                                                                                    q = {student: new ObjectID(opts.userId)}    
                                                                                }else{
                                                                                    q = {teacher: new ObjectID(opts.userId)}    
                                                                                }
                                                                                
                                                                                var findOptions = {                                                      
                                                                                        collectionName: 'classs',
                                                                                        query: q,
                                                                                        options: {sort: {date: -1}},
                                                                                        successCallback: function(data){
                                                                                                           opts.successCallback(data);                                                                        
                                                                                                        },
                                                                                        errorCallback: opts.errorCallback
                                                                                    };
                                 
                                                                                 dao.find(findOptions);  
                                                                          },
                                                        errorCallback: opts.errorCallback,
                                                    });
                      
                    },
                    /**
                     * @param opts.data.teacher
                     * @param opts.data.teacherName
                     * @param opts.data.student
                     * @param opts.data.studentName
                     * @param opts.data.date
                     * @param opts.successCallback
                     * @param opts.errorCallback
                     */              
                    bookClass: function (opts){
                       
                       opts.data.status = "book";
                       
                       if (opts.data.student){
                        opts.data.student = new ObjectID(opts.data.student);
                       }else{
                        opts.data.teacher = new ObjectID(opts.data.teacher);
                       }
                       
                       opts.data.date = new Date(opts.data.date);
                       
                       dao.insert(
                                  {
                                    collectionName: 'classs',
                                    object: opts.data,
                                    successCallback: function(classs){
                                    
                                                                opts.successCallback("Hora Agendada exitosamente / Book Successfully");
                                                                     
                                                                if (classs.student) {
                                                                   
                                                                    email.send({                                                                                                 
                                                                                 subject:"Hora publicada exitosamente / Hour published succesfully",
                                                                                 to: opts.data.email,
                                                                                 data: {
                                                                                    name: classs.studentName,
                                                                                    date: moment(classs.date).
                                                                                            utcOffset(classs.studentTime).format('LLL'),
                                                                                    rootPath: config.rootPath
                                                                                 }
                                                                                },
                                                                                "book"
                                                                               );
                                                                    
                                                                    sendTeachersNotification(classs);
                                                                }   
                                                            },
                                    errorCallback: opts.errorCallback
                                  });
                        
                    },
                    /**
                     * @param opts.date
                     * @param opts.type
                     * @param opts.successCallback
                     * @param opts.errorCallback
                     */                                  
                    getCalendar: function(opts){
                                 var q;
                                 
                                 if (opts.filter.type == "My"){
                                    q ={date: {$gt: new Date(opts.filter.date)},
                                        $and: [
                                                {$or: [{student:new ObjectID(opts.filter.userId)}, {teacher:new ObjectID(opts.filter.userId)}]},
                                                {$or: [{status: "book"}, {status: "reserved"}]}
                                              ] 
                                        }
                                 }else{               
                                    q ={date: {$gt: new Date(opts.filter.date)}, owner:opts.filter.type, status : "book"};
                                 }
                                 
                                 var findOptions = {                                                      
                                                     collectionName: 'classs',
                                                     query: q,                                                     
                                                     opts: {sort: "date"},
                                                     options: {},
                                                     successCallback: function(data){
                                                                            var c = {
                                                                                                calendarData: data
                                                                                            };
                                                                             
                                                                            if (opts.filter.type == "Student"){                
                                                                                var aggregateOptions = {                                                      
                                                                                                    collectionName: 'classs',
                                                                                                    query: [ {$match: { $or: [{status: "reserved" }, {status: "done"} ] } } , { $group: { "_id": "$student" } } ],                                                                                                    
                                                                                                    successCallback: function(notFirtsClass){
                                                                                                        console.log("notFirtsClass " + JSON.stringify(notFirtsClass));
                                                                                                                       c.notFirtsClass = notFirtsClass; 
                                                                                                                       opts.successCallback(c);                                                                        
                                                                                                                     },
                                                                                                    errorCallback: opts.errorCallback
                                                                                                 };
                                                                                
                                                                                dao.aggregate(aggregateOptions);                                                                                              
                                                                            }else{
                                                                                opts.successCallback(c);    
                                                                            }                                                                                            
                                                                                                                                               
                                                                      },
                                                     errorCallback: opts.errorCallback
                                                  };
                                 
                                 dao.find(findOptions);                           
                    },
                    
                    /**
                     * @param opts.classId
                     * @param opts.userId
                     * @param opts.idClassBookSameTime
                     * @param opts.successCallback
                     * @param opts.errorCallback
                     */                       
                    reserveClass: function(opts){
                                    console.log("Buscando clase");
                                    var findOptions = {                                                      
                                                     collectionName: 'classs',
                                                     query: {"_id": new ObjectID(opts.classId)},                                                     
                                                     opts: {},
                                                     options: {},
                                                     successCallback: function(classs){
                                                                            if (classs.status == "book") {
                                                                            
                                                                                console.log("Buscando Usuario " );
                                                                                userService.getUser({
                                                                                                        userId: opts.userId,
                                                                                                        successCallback:  function(user){
                                                                                                                            if (user.type == "Student") {
                                                                                                                                checkFirstClass(user, user, classs, opts);
                                                                                                                            }else{
                                                                                                                                userService.getUser({
                                                                                                                                    userId: classs.student,
                                                                                                                                    successCallback:  function(student){
                                                                                                                                                            checkFirstClass(user, student, classs, opts);
                                                                                                                                                      },
                                                                                                                                    errorCallback: opts.errorCallback
                                                                                                                                });
                                                                                                                                                                 
                                                                                                                            }
                                                                                                                            
                                                                                                                          },
                                                                                                        errorCallback: opts.errorCallback
                                                                                                    });
                                                                            }
                                                                      },
                                                     errorCallback: opts.errorCallback
                                                  };
                                 
                                    dao.findOne(findOptions);        
                                },
                                
                                /**
                                 * @param opts.classsId
                                 * @param opts.userId
                                 * @param opts.reverseTokens
                                 * @param opts.fatalWarnning
                                 */
                                cancel: function(opts){
                                   console.log("Buscando clase para cancelar");
                                    var findOptions = {                                                      
                                                     collectionName: 'classs',
                                                     query: {"_id": new ObjectID(opts.classsId)},                                                     
                                                     opts: {},
                                                     options: {},
                                                     successCallback: function(classs){
                                                                                    if (classs.status == "book" || classs.status == "reserved") {
                                                                                                                                                                            
                                                                                        if (opts.reverseTokens) {
                                                                                            
                                                                                            userService.getUser({
                                                                                                                    userId: classs.student,
                                                                                                                    successCallback:  function(user){
                                                                                                                                            
                                                                                                                                            reverseTokens(user, classs);
                                                                                                                                            
                                                                                                                                            cancelClasss(classs, opts); 
                                                                                                                                      },
                                                                                                                    errorCallback: opts.errorCallback,
                                                                                                                });
                                                                                            }else{
                                                                                                cancelClasss(classs, opts);
                                                                                            }
                                                                                    }        

                                                                      },
                                                     errorCallback: opts.errorCallback
                                                  };
                                 
                                    dao.findOne(findOptions);                                          
        
                                },
                                
                                /**
                                 * @param opts.successCallback
                                 * @param opts.errorCallback
                                 */
                                getCancelClass: function(opts){
                                   var findOptions = {                                                      
                                                     collectionName: 'classs',
                                                     query: {"status": "canceled", "oldStatus": "reserved"},                                                     
                                                     options: {sort: {cancelBy: -1, date: 1}},
                                                     successCallback: function(data){
                                                                            opts.successCallback(data);       
                                                                      },
                                                     errorCallback: opts.errorCallback
                                                  };
                                 
                                    dao.find(findOptions);                                      
                                    
                                },
                                
                                /**
                                 * @param opts.payments
                                 * @param opts.successCallback
                                 * @param opts.errorCallback
                                 */
                                payments: function(opts){
                                    var paymentsObjectId = [];
                                    
                                    for (var i = 0; i < opts.payments.length; i++) {
                                        paymentsObjectId.push(new ObjectID(opts.payments[i]));
                                    }
                                    
                                    dao.update({
                                                    collectionName: "classs",
                                                    criteria: { "_id": {$in:  paymentsObjectId}},
                                                    update: { $set: { payment: true } },
                                                    opts: {multi : true},
                                                    successCallback: opts.successCallback, 
                                                    errorCallback: opts.errorCallback
                                               });
                                    
                                },
                                /**
                                 * @param opts.successCallback
                                 * @param opts.errorCallback
                                 */
                                getReservedDoneClass: function(opts){
                                   var findOptions = {                                                      
                                                     collectionName: 'classs',
                                                     query: {$or: [{"status": "reserved"}, {"status": "done"}]},                                                     
                                                     options: {sort: {date: 1}},
                                                     successCallback: function(data){
                                                                            opts.successCallback(data);       
                                                                      },
                                                     errorCallback: opts.errorCallback
                                                  };
                                 
                                    dao.find(findOptions);                                      
                                    
                                },
}

function sendTeachersNotification(classs){
    var findOptions = {                                                      
                  collectionName: 'users',
                  query: {"type": "Teacher"},                                                     
                  options: {email:true, name:true,time:true},
                  successCallback: function(teachers){
                                         if (teachers) {
                                            for(var i = 0; i < teachers.length; i++){
                                                var date = moment(classs.date).utcOffset(teachers[i].time);
                                                
                                                email.send({                                                                                                 
                                                             subject:"Nueva Publicacion",
                                                             to: teachers[i].email,
                                                             data: {
                                                                name: teachers[i].name,
                                                                date: moment(date).format('L'),
                                                                time: moment(date).format('h:mm a'),
                                                                studentName: classs.studentName
                                                             }
                                                            },
                                                            "teachers_notify"
                                                           );                                                   
                                            }
                                         }
                                   }
               };

    dao.find(findOptions); 
    
}

function reverseTokens(user, classs){
    var bill = {
                    "orderNumber": "-",
                    date: new Date(),
                    totalTokens: 1,
                    totalPrice: "-",
                    check: true,
                    
                    items: [
                        {
                            name: "Clase cancelada / Cancel class",
                            price: "-",
                            quantity: 1,
                        }
                    ]
               };
               
    user.bills.push(bill);
    
    user.tokens++;
    
    dao.save({
                object: user,
                collectionName: "users"
             }  ); 
}

function cancelClasss(classs, opts){
        console.log("Cancelando clase");
        
        var oldStatus = classs.status;
        classs.status = "canceled";
        classs.cancelBy = new ObjectID(opts.userId);
        classs.oldStatus = oldStatus;
        
        
        if (opts.fatalWarnning) {
            classs.fatalWarnning = true;
        }
        
        if (opts.reverseTokens) {
            classs.reverseTokens = opts.reverseTokens;
        }
        
        dao.save({
                    object: classs,
                    collectionName: "classs",
                    successCallback: function(){
                                        console.log("Clase cancelada");
                                        
                                        cancelSuccess(classs, opts, oldStatus);    
                                        opts.successCallback();
                                    },
                    errorCallback: opts.errorCallback
                 }  );
        
        
}

function cancelSuccess(classs, opts, oldStatus){
              
        userService.getUser({
                    userId: classs.teacher,
                    successCallback:  function(teacher){
                                            if (oldStatus == "reserved"){
                                                if (classs.cancelBy.equals(classs.teacher)) {

                                                    if (classs.fatalWarnning){
                                                        teacherCancelSendFatalWarnningMessage(classs, teacher);
                                                    }else{
                                                        teacherCancelSendFatalSlightMessage(classs, teacher);
                                                    }
                                                }else{

                                                    if (!opts.reverseTokens){
                                                        studentCancelSendClassPaidMessage(classs, teacher);
                                                    }else{
                                                        studentCancelSendClassNotPaidMessage(classs, teacher);
                                                    }
                                                }
                                            }    
                                        },
                    errorCallback: opts.errorCallback,
                });
        
        userService.getUser({
                    userId: classs.student,
                    successCallback:  function(student){
                                            
                                            if (oldStatus == "reserved"){
                                                console.log("classs.cancelBy " + classs.cancelBy);
                                                console.log("classs.cancelBy " + classs.student);
                                                
                                                if (classs.cancelBy.equals(classs.student)) {
                                                    if (opts.reverseTokens){
                                                        studentCancelSendReverseTokendMessage(classs, student);
                                                    }else{
                                                        studentCancelSendNotReverseTokendMessage(classs, student);
                                                    }
                                                }else{
                                                    console.log("No cancelada por el estudiante");
                                                    classCanceled(classs, student);
                                                    
                                                    if (classs.fatalWarnning){
                                                        console.log("Fatal warnnings");
                                                        teacherCancelSendStudentGainTokens(classs, student);
                                                    } 
                                                }
                                            }
                                      },
                    errorCallback: opts.errorCallback,
                });          
        
        
        if (oldStatus == "reserved" &&
            classs.owner == "Teacher" &&
            classs.cancelBy.equals(classs.student)) {
            
            var newClass = JSON.parse(JSON.stringify(classs));
            
            //Publicando nuevamente la hora del profesor
            newClass["_id"] = null;
            newClass.status = "book";
            newClass.student = null;
            newClass.studentName = null;
            newClass.studentPicture = null;
            
            dao.save({
                    object: newClass,
                    collectionName: "classs"
                 }  );            
        }
        
}

function classCanceled(classs, student) {
         email.send({                                                                                                 
               subject:"Clase cancelada / Class canceled",
               to: student.email,
               data: {
                   name: classs.studentName,
                   date: moment(classs.date)
                   .utcOffset(classs.studentTime).format('LLL'),
                   rootPath: config.rootPath
               }
              },
              "teacher_cancel"
             );      
}

function teacherCancelSendStudentGainTokens(classs, student){
        email.send({                                                                                                 
               subject:"Clase cancelada / Class canceled",
               to: student.email,
               data: {
                   name: classs.studentName,
                   date: moment(classs.date)
                   .utcOffset(classs.studentTime).format('LLL'),
                   rootPath: config.rootPath
               }
              },
              "teacher_cancel_student_gain_tokens"
             );    
}

function studentCancelSendClassPaidMessage(classs, teacher) {
        email.send({                                                                                                 
                subject:"Clase cancelada / Class canceled",
                to: teacher.email,
                data: {
                    name: classs.teacherName,
                    date: moment(classs.date).
                        utcOffset(classs.teacherTime).format('LLL'),
                    rootPath: config.rootPath
                }
               },
               "student_cancel_class_paid"
              );    
}

function studentCancelSendClassNotPaidMessage(classs, teacher) {
        email.send({                                                                                                 
                subject:"Clase cancelada / Class canceled",
                to: teacher.email,
                data: {
                    name: classs.teacherName,
                    date: moment(classs.date).
                        utcOffset(classs.teacherTime).format('LLL'),
                    rootPath: config.rootPath
                }
               },
               "student_cancel_class_not_paid"
              );    
}

function teacherCancelSendFatalWarnningMessage(classs, teacher) {
        email.send({                                                                                                 
                subject:"Clase cancelada / Class canceled",
                to: teacher.email,
                data: {
                    name: classs.teacherName,
                    date: moment(classs.date).
                        utcOffset(classs.teacherTime).format('LLL'),
                    rootPath: config.rootPath
                }
               },
               "teacher_cancel_fatal_warnning"
              );    
}

function teacherCancelSendFatalSlightMessage(classs, teacher) {
        email.send({                                                                                                 
                subject:"Clase cancelada / Class canceled",
                to: teacher.email,
                data: {
                    name: classs.teacherName,
                    date: moment(classs.date).
                        utcOffset(classs.teacherTime).format('LLL'),
                    rootPath: config.rootPath
                }
               },
               "teacher_cancel_slight_warnning"
              );    
}



function studentCancelSendReverseTokendMessage(classs, student) {
        email.send({                                                                                                 
                subject:"Clase cancelada / Class canceled",
                to: student.email,
                data: {
                    name: classs.studentName,
                    date: moment(classs.date)
                        .utcOffset(classs.studentTime).format('LLL'),
                    rootPath: config.rootPath
                }
               },
               "student_cancel_reverse_token"
              );    
}


function studentCancelSendNotReverseTokendMessage(classs, student) {
        email.send({                                                                                                 
                subject:"Clase cancelada / Class canceled",
                to: student.email,
                data: {
                    name: classs.studentName,
                    date: moment(classs.date)
                    .utcOffset(classs.studentTime).format('LLL'),
                    rootPath: config.rootPath
                }
               },
               "student_cancel_not_reverse_token"
              );    
}

function checkFirstClass(user, student, classs, opts){
    
    var findOptions = {                                                      
                      collectionName: 'classs',
                      query: {$or: [{"status": "reserved"}, {"status": "done"}], student: student["_id"]},                                                     
                      options: {},
                      successCallback: function(data){
                                              if (!data || data.length == 0){
                                                classs.firstClass = true;
                                              }
                                              
                                             reserve(user, student, classs, opts);      
                                       },
                      errorCallback: opts.errorCallback
                   };
  
     dao.find(findOptions);

    
}

function checkBeforeReserve(student, classs, opts) {
    
    console.log("checkBeforeReserve " + student.tokens);
    if (student.tokens == 0) {
        opts.errorCallback("El usuario no tiene tokens");
        return false;
    }
    
    if (classs.status == "reserved") {
        opts.errorCallback("La clase ya fue reservada por otro profesor");
        return false;
    }
    
    if (classs.status == "canceled") {
        opts.errorCallback("La clase fue cancelada");
        return false;
    }
    
    return true;
}

function reserve(user, student, classs, opts){
    
    var c = checkBeforeReserve(student, classs, opts);
    
    if (!c) {
        return;
    }
    
    console.log("Reservando");
    classs.status = "reserved";
    
    if (user.type == "Student") {
        classs.student = user["_id"];
        classs.studentName = user.name;
        classs.studentPicture = user.picture;
        classs.studentTime = opts.userTime;    
    }else{
        classs.teacher = user["_id"];
        classs.teacherName = user.name;
        classs.teacherPicture = user.picture;
        classs.teacherTime = opts.userTime;    
    }
    
    var bill = {
                    "orderNumber": "-",
                    date: new Date(),
                    totalTokens: -1,
                    totalPrice: "-",
                    check: true,
                    
                    items: [
                        {
                            name: "Reservacion / Reserved",
                            price: "-",
                            quantity: 1,
                        }
                    ]
               };
    
           
    if (student.specialTokens){
        
        var discounted = false;
          
        for (var i = 0; i < student.specialTokens.length; i++) {
            console.log(student.specialTokens[i].teacherId + " " + classs.teacher);  
            if (student.specialTokens[i].teacherId == classs.teacher) {
                student.specialTokens[i].nTokens--;
                discounted = true;
                break;
            }
        }
        
        if (!discounted) {
            student.tokens = student.tokens - 1;
        }
    }else{
        student.tokens = student.tokens - 1;
    }
    
    if (!student.bills) {
        student.bills = [];
    }
    
    student.bills.push(bill);
    
    console.log("Guardando todo " + JSON.stringify(classs));
    
    var okRes = 0;
    var failRes = 0;
    
    dao.save({
                object: classs,
                collectionName: "classs",
                errorCallback: function(err){
                                    console.log(err);
                                    failRes++;
                                    sendResponse(okRes, failRes, classs, user, student,opts);
                               },
                successCallback: function(){
                                    okRes++;
                                    sendResponse(okRes, failRes, classs, user, student,opts);
                               }
             });
    
    dao.save({
                object: student,
                collectionName: "users",
                errorCallback: function(err){
                                    console.log(err);
                                    failRes++;
                                    sendResponse(okRes, failRes, classs, user, student,opts);
                               },
                successCallback: function(){
                                    okRes++;
                                    sendResponse(okRes, failRes,classs, user, student, opts);
                               }            
             });
    
    console.log("opts.idClassBookSameTime " + opts.idClassBookSameTime);
    if (opts.idClassBookSameTime) {
        changeStatusToUnbook(opts.idClassBookSameTime);    
    }
}

function changeStatusToUnbook(idClassBookSameTime){
    var findOptions = {                                                      
         collectionName: 'classs',
         query: {"_id": new ObjectID(idClassBookSameTime)},
         options: {},
         successCallback: function(classs){
                            console.log("Clase Encontrada");    
                            classs.status = "unbook";
                            dao.save({
                                object: classs,
                                collectionName: "classs"
                             }); 
                         }
     };

  dao.findOne(findOptions);  
}

function sendResponse(okRes, failRes, classs, user, student,opts){
    var response = okRes + failRes;
    
    if (response == 2) {
        if (failRes > 0) {
            opts.errorCallback();
        }else{
            opts.successCallback();
            
            userService.getUser({
                        userId: classs.teacher,
                        successCallback:  function(teacher){
                            
                                                console.log("Correo del profesor para informarle de la reserva " + teacher.email);
                                                
                                                if (user.type == "Student") {
                                                    sendEmailReserveStudentToStudent(classs, student, teacher);
                                                    sendEmailReserveStudentToTeacher(classs, student, teacher);
                                                }else{
                                                    sendEmailReserveTeacherToStudent(classs, student, teacher);
                                                    sendEmailReserveTeacherToTeacher(classs, student, teacher);                                                    
                                                }
                                          },
                        errorCallback: opts.errorCallback,
                    });              
        }
    }
    
    
  
      
}


function getReserveEmailSubject(){           
    //return "=?ISO-8859-1?B?" + new Buffer("Reservación de clase / Class reservation").toString('base64') + "=?=";
    return "Reservacion de clase / Class reservation";
}

function sendEmailReserveStudentToStudent(classs, student, teacher){
        var subject = getReserveEmailSubject();
        
        email.send({                                                                                                 
                subject:subject,
                to: student.email,
                data: {
                    studentName: classs.studentName,
                    date: moment(classs.date).
                    utcOffset(classs.studentTime).format('LLL'),
                    teacherName: classs.teacherName,
                    teacherSkype:teacher.skype,
                    oldTokens: student.tokens + 1,
                    newTokens: student.tokens,
                    rootPath: config.rootPath
                }
               },
               "reserve_student_to_student"
              );
}

function sendEmailReserveStudentToTeacher(classs, student, teacher){
        var subject = getReserveEmailSubject();
    
        email.send({                                                                                                 
                subject:subject,
                to: teacher.email,
                data: {
                    teacherName: classs.teacherName,
                    date: moment(classs.date)
                    .utcOffset(classs.teacherTime).format('LLL'),
                    studentName: classs.studentName,
                    occupation:student.occupation,
                    dayofBirth:student.dayofBirth,
                    hobbies:student.hobbies,
                    expertice:student.expertice,
                    skype: student.skype,
                    rootPath: config.rootPath,
                    email: student.email,
                    firstClass: classs.firstClass ? "Es la primera clase del alumno" : ""
                }
               },
               "reserve_student_to_teacher"
              );
}

function sendEmailReserveTeacherToStudent(classs, student, teacher){
        var subject = getReserveEmailSubject();
        
        email.send({                                                                                                 
                subject:subject,
                to: student.email,
                data: {
                    studentName: classs.studentName,
                    date: moment(classs.date).
                    utcOffset(classs.studentTime).format('LLL'),
                    teacherName: classs.teacherName,
                    teacherSkype:teacher.skype,
                    oldTokens: student.tokens + 1,
                    newTokens: student.tokens,
                    rootPath: config.rootPath
                }
               },
               "reserve_teacher_to_student"
              );
}

function sendEmailReserveTeacherToTeacher(classs, student, teacher){
        var subject = getReserveEmailSubject();
        
        email.send({                                                                                                 
                subject:subject,
                to: teacher.email,
                data: {
                    teacherName: classs.teacherName,
                    date: moment(classs.date)
                    .utcOffset(classs.teacherTime).format('LLL'),
                    studentName: classs.studentName,
                    occupation:student.occupation,
                    dayofBirth:student.dayofBirth,
                    hobbies:student.hobbies,
                    expertice:student.expertice,
                    skype: student.skype,
                    rootPath: config.rootPath,
                    email: student.email,
                    firstClass: classs.firstClass ? "Es la primera clase del alumno" : ""
                }
               },
               "reserve_teacher_to_teacher"
              );
}


function finishClasss(){
    var findOptions = {                                                      
            collectionName: 'classs',
            query: {date: { $lt: new Date() }, $or: [ {status: "book" }, { status :"reserved" }]},
            options: {},
            successCallback: function(records){
                                for (var i = 0; i < records.length; i++){
                                    var classs = records[i];
                                    
                                    if (classs.status == "book") {
                                        classs.status = "unbook";
                                    }else{
                                        classs.status = "done";
                                        classDone(classs);
                                    }
                                    
                                    dao.save({
                                                object: classs,
                                                collectionName: "classs"
                                             }  ); 
                                }                                                                       
                            }
        };

     dao.find(findOptions);      
    
}
   
function classDone(classs){
    console.log("Clase terminada " + JSON.stringify(classs));
    userService.getUser({
        userId: classs.student,
        successCallback:  function(user){
                                console.log("Enviando correo al estudiante " + user.email);
                                sendFeedbackEmailStudent(user, classs)  
                    }
    });

    userService.getUser({
        userId: classs.teacher,
        successCallback:  function(user){
                                console.log("Enviando correo al profesor " + user.email);
                                sendFeedbackEmailTeacher(user, classs)  
                    }
    });
   
   
}

function sendFeedbackEmailStudent(user, classs){
    email.send({                                                                                                 
                subject:"Retroalimentacion  / Feedback",
                to: user.email,
                data: {
                   name: user.name,
                   date: moment(classs.date).
                   utcOffset(classs.studentTime).format('LLL'),
                   rootPath: config.rootPath
                }
               },
               "feedback_student"
              );     
}

function sendFeedbackEmailTeacher(user, classs){
    email.send({                                                                                                 
                subject:"Retroalimentación  / Feedback",
                to: user.email,
                data: {
                   name: user.name,
                   date: moment(classs.date).
                   utcOffset(classs.studentTime).format('LLL'),
                   rootPath: config.rootPath
                }
               },
               "feedback_teacher"
              );     
}