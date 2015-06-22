var nodemailer = require('nodemailer');
var emailTemplates = require('email-templates');
var path = require('path');
var dao = require('./db_util.js');

var transporter;

console.log("Configurando servidor de correo");

dao.findOne({
                collectionName: "config",
                query: {},
                options: {email: true},
                successCallback: loadTransporter,
                errorCallback: function(){
                                throw "No es posible configurar el servidor de correo";
                    
                            }
            }  
            );

function loadTransporter(data){
    console.log("Servidor de correo configurado: " + JSON.stringify(data));
    transporter = nodemailer.createTransport(data.email);
    
}

var templatesDir = path.resolve(__dirname, '.', "./templates");

module.exports = {
                    /**
                     * @mailOptions.text
                     * @mailOptions.html
                     * @mailOptions.subject
                     * @mailOptions.to
                     */
                    send: function(mailOptions, templateName){
                                        emailTemplates(templatesDir, function(err, template){
                                                                                                resolveTemplate(template, {                                                                                                                
                                                                                                                templateName: templateName,
                                                                                                                mailOptions: mailOptions
                                                                                                              }
                                                                                                              )});
                                                       
                                    }    
                };
                
function resolveTemplate (template, options) {
    if (options.err) {
      console.log(options.err);  
      return;
    }
    
    template(options.templateName, options.mailOptions.data, function (err, html, text) {
        if (err) {
          console.log("1 " + err);
          return;
        }
        
        options.mailOptions.from = 'Spanishpro <Spanishpro@Spanishpro.com>';
        options.mailOptions.html = html;
        options.mailOptions.text = text;
        
        transporter.sendMail(options.mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Message sent: ' + info.response);
            }
        });        
    });
}        