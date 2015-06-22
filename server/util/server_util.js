
module.exports = {
    failRegisterResponse: function (res, message) {
        console.log("Ocurrio un error inesperado en el servidor");
        
        res.status(412);
        res.send(message);  
    },
    
    okResponse: function (res) {
        res.send();  
    },
    
    errorResponse: function (res) {
        res.status(500);
        res.send();  
    },
    
    failForbiddenResponse: function(res, message){
                            res.status(403);
                            res.send(message); 
        
                        }
};