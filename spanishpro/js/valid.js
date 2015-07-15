function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function fieldsValid($this) {
        var result = true;

       $($this).find("[required]").each(function(){                                
                                if ($(this).val() == ""){                                    
                                    showValidationError(this, "Requerido / Requested");                                    
                                    result = false;
                                }
                             }
                            );
       
       $($this).find("[numeric]").each(function(){                                
                                if (!isNumber($(this).val())){                                    
                                    showValidationError(this, "Debe ser numero / Must be numeric");                                    
                                    result = false;
                                }
                             }
                            );
       
       return result;
       
}

function showValidationError ($this, message){
        
        var parent = $($this).parent().get(0);
        $(parent).children("[error]").show();
          $(parent).children("[error_text]").text(message);
          $(parent).children("[error_text]").css({color: 'red', 'font-size': '10px'});
          $($this).addClass('error_field');
          
          
          $($this).keyup(function(){
                      $($this).removeClass('error_field');                                                                                            
                      $(parent).children("[error]").hide();
              });        
}

function dateFormat(date){        
        return moment(date).format('MMMM Do YYYY, h:mm a');
}

