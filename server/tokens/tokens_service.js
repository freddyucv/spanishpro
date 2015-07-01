var dao = require('../util/db_util.js');
ObjectID = require('mongodb').ObjectID;
var userService = require('../register_server_service.js');
var email = require('../util/email_util.js');
var config = require('../util/config.js');

module.exports = {
    
    /**
     * @param opts.idUser
     * @param opts.bill
     * @param opts.errorCallback
     * @param opts.successCallback
     */
    addBill: function(opts){
        console.log("Buscando usuario");
        
        var findOptions = {                                                      
                        collectionName: 'users',
                        query: {"_id": new ObjectID(opts.idUser)},
                        options: {},
                        successCallback: function(user){
                                           console.log("Se encontro el usuario?" + user);
                                            addBillToUser(user, opts.bill, opts.successCallback, opts.errorCallback);    
                                         },
                        errorCallback: opts.errorCallback
                     };
    
        dao.findOne(findOptions);          
        
    },
    
    /**
     * @param opts.errorCallback
     * @param opts.successCallback
     */    
    getUnvalidTokens: function(opts){
        var agregateOpts = {                                                      
                        collectionName: 'users',
                        query: [
                                {$unwind:"$bills"},
                                {$match:{"bills.check": false}},
                                {$group:{
                                            _id:'$_id',
                                             name:{$first:'$name'},
                                             nTokens:{$sum:'$bills.totalTokens'},
                                             totalPrice:{$sum:'$bills.totalPrice'},
                                             bills: {$push: '$bills'}
                                         }
                                }],
                        successCallback: function(data){
                                           opts.successCallback(data);   
                                         },
                        errorCallback: opts.errorCallback
                     };
    
        dao.aggregate(agregateOpts);                   
    },
    
    /**
     * @param opts.validate
     * @param opts.successCallback
     * @param opts.errorCallback
     */
    validateTokens: function(opts){
        for (var i = 0; i < opts.validate.length; i++){
            dao.update({
                            criteria: {"bills.orderNumber" : opts.validate[i]},
                            update:{$set:{"bills.$.check": true}},
                            collectionName: "users"
                            
                      });
        }
    },
    
    /**
     * @param opts.errorCallback
     * @param opts.successCallback
     */        
    getStudentsTokens: function(opts){
        console.log("Buscando tokens");
        
        var findOptions = {                                                      
                        collectionName: 'users',
                        query: {type:"Student"},
                        options: {tokens: 1, specialTokens: 1,name: 1,email: 1},
                        successCallback: function(data){
                                           opts.successCallback(data);  
                                         },
                        errorCallback: opts.errorCallback
                     };
    
        dao.find(findOptions);         
    },
    
    /**
     *  @param opts.data.increment
     *  @param opts.data.student
     *  @param opts.data.teacher
     * @param opts.successCallback
     * @param opts.errorCallback
     */
    incrementStudentsTokens: function(opts){
                                incrementStudentsTokens(opts);    
                            }
}

function incrementStudentsTokens(opts) {
        var findOptions = {                                                      
                        collectionName: 'users',
                        query: {"_id":new ObjectID(opts.data.student)},
                        options: {},
                        successCallback: function(user){
                                           if (user) {
                                                console.log("opts.data.teacherId " + !opts.data.teacherId);
                                                console.log("opts.data.teacherId " + opts.data.teacherId == "undefined");
                                                if (!opts.data.teacherId){
                                                    if (!user.tokens) {
                                                        user.tokens = 0;
                                                        user.bills = [];
                                                    }
                                                    
                                                    user.tokens = parseInt(user.tokens) + parseInt(opts.data.increment);
                                                    
                                                    var bill = {
                                                                    "orderNumber": "-",
                                                                    date: new Date(),
                                                                    totalTokens: opts.data.increment,
                                                                    totalPrice: "-",
                                                                    check: true,
                                                                    
                                                                    items: [
                                                                        {
                                                                            name: "Cortesia del Administrador / Admin gift",
                                                                            price: "-",
                                                                            quantity: opts.data.increment,
                                                                        }
                                                                    ]
                                                               };
                                                               
                                                    user.bills.push(bill);           
                                                }else{
                                                    if (!user.specialTokens){
                                                        user.specialTokens = [];   
                                                    }
    
                                                    
                                                    var specialTokens = {
                                                                                teacherId: opts.data.teacherId,
                                                                                teacherName: opts.data.teacherName
                                                                            };
                                                    
                                                    var allSpecialTokens = [];
                                                    var notChanged = false;
                                                    
                                                    for(var i = 0; i < user.specialTokens.length; i++){
                                                        var special = user.specialTokens[i];
                                                        
                                                        if (special.teacherId == opts.data.teacherId) {
                                                            specialTokens.nTokens = opts.data.increment + special.nTokens;
                                                            allSpecialTokens.push(specialTokens);
                                                            notChanged = true;
                                                        }else{
                                                            allSpecialTokens.push(special);
                                                        }
                                                    }
                                                    
                                                    if (!notChanged) {
                                                        specialTokens.nTokens = opts.data.increment;
                                                        allSpecialTokens.push(specialTokens);
                                                    }
                                                    
                                                    console.log(JSON.stringify(allSpecialTokens));
                                                    user.specialTokens = allSpecialTokens;
                                                    
                                                }
                                                
                                                userService.update({
                                                    user: user,
                                                    successCallback: opts.successCallback,
                                                    errorCallback: opts.errorCallback
                                               });                                                
                                           }else{
                                                opts.errorCallback();
                                           }
                                         },
                        errorCallback: opts.errorCallback
                     };
    
        dao.findOne(findOptions);  
}

function addBillToUser(user, bill, cb, ecb){
    
    if (!user.tokens) {
        user.tokens = 0;
    }
    
    var oldTokensUser = user.tokens;
    
    user.tokens += parseFloat(bill.totalTokens);
    
    if (!user.bills) {
        user.bills = [];
    }
    
    bill.date = new Date();
    
    user.bills.push(bill);
    
    userService.update({
                            user: user,
                            successCallback: cb,
                            errorCallback: ecb
                       });

    var combos = "";
    
    for(var i = 0; i < bill.items.length; i++){
        
        if (i != 0) {
            combos += ", ";
        }
        
        combos +=  bill.items[i].name;
    }
    
    email.send({                                                                                                 
                 subject:"Confirmacion de compra / Purchase confirmation",
                 to: user.email,
                 data: {
                    name: user.name,
                    rootPath: config.rootPath,
                    totalTokens: bill.totalTokens,
                    oldUserTokens: oldTokensUser,
                    newUserTokens: user.tokens,
                    combos: combos
                 }
                },
                "buy"
               );    
}

