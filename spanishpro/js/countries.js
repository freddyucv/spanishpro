var countries = [
                    {iso: "AD", country_name: "Andorra"},
                    {iso: "AE", country_name: "Emiratos Arabes Unidos"},
                    {iso: "AF", country_name: "Afganistan"},
                    {iso: "AG", country_name: "Antigua y Barbuda"},
                    {iso: "AI", country_name: "Anguila"},	
                    {iso: "AL", country_name: "Albania"},	
                    {iso: "AM", country_name: "Armenia"},	
                    {iso: "AN", country_name: "Antillas Neerlandesas"},
                    {iso: "AO", country_name: "Angola"},	
                    {iso: "AQ", country_name: "Antartida"},	
                    {iso: "AR", country_name: "Argentina"},	
                    {iso: "AS", country_name: "Samoa Americana"},	
                    {iso: "AT", country_name: "Austria"},
                    {iso: "AU", country_name: "Australia"},	
                    {iso: "AW", country_name: "Aruba"},
                    {iso: "AX", country_name: "Islas Aland"},
                    {iso: "AZ", country_name: "Azerbaiyan"},
                    {iso: "BA", country_name: "Bosnia y Herzegovina"},
                    {iso: "BB", country_name: "Barbados"},
                    {iso: "BD", country_name: "Bangladesh"},	
                    {iso: "BE", country_name: "Belgica"},
                    {iso: "BF", country_name: "Burkina Faso"	},
                    {iso: "BG", country_name: "Bulgaria"},
                    {iso: "BH", country_name: "Bahrein"},
                    {iso: "BI", country_name: "Burundi"},	
                    {iso: "BJ", country_name: "Benin"},
                    {iso: "BL", country_name: "San Bartolome"},
                    {iso: "BM", country_name: "Bermudas"},
                    {iso: "BN", country_name: "Brunei"},
                    {iso: "BO", country_name: "Bolivia"},	
                    {iso: "BR", country_name: "Brasil"},	
                    {iso: "BS", country_name: "Bahamas"},	
                    {iso: "BT", country_name: "Bhutan"},	
                    {iso: "BV", country_name: "Isla Bouvet"},
                    {iso: "BW", country_name: "Botsuana"},
                    {iso: "BY", country_name: "Belarus"},
                    {iso: "BZ", country_name: "Belice"},
                    {iso: "CA", country_name: "Canada"},
                    {iso: "CC", country_name: "Islas Cocos"},
                    {iso: "CF", country_name: "Republica Centro-Africana"},
                    {iso: "CG", country_name: "Congo"},
                    {iso: "CH", country_name: "Suiza"},
                    {iso: "CI", country_name: "Costa de Marfil"},
                    {iso: "CK", country_name: "Islas Cook"},
                    {iso: "CL", country_name: "Chile"},
                    {iso: "CM", country_name: "Camerun"},
                    {iso: "CN", country_name: "China"},
                    {iso: "CO", country_name: "Colombia"},
                    {iso: "CR", country_name: "Costa Rica"},
                    {iso: "CU", country_name: "Cuba"},
                    {iso: "CV", country_name: "Cabo Verde"},
                    {iso: "CX", country_name: "Islas Christmas"},
                    {iso: "CY", country_name: "Chipre"},
                    {iso: "CZ", country_name: "Republica Checa"},
                    {iso: "DE", country_name: "Alemania"},
                    {iso: "DJ", country_name: "Yibuti"},
                    {iso: "DK", country_name: "Dinamarca"},
                    {iso: "DM", country_name: "Dominica"},
                    {iso: "DO", country_name: "Republica Dominicana"},
                    {iso: "DZ", country_name: "Argel"},	
                    {iso: "EC", country_name: "Ecuador"},
                    {iso: "EE", country_name: "Estonia"},
                    {iso: "EG", country_name: "Egipto"},
                    {iso: "EH", country_name: "Sahara Occidental"},
                    {iso: "ES", country_name: "España"},
                    {iso: "ET", country_name: "Etiopia"},	
                    {iso: "FI", country_name: "Finlandia"},	
                    {iso: "FK", country_name: "Islas Malvinas"},
                    {iso: "FR", country_name: "Francia"},	
                    {iso: "GA", country_name: "Gabon"},
                    {iso: "GB", country_name: "Reino Unido"},
                    {iso: "GD", country_name: "Granada"},
                    {iso: "GE", country_name: "Georgia"},	
                    {iso: "GF", country_name: "Guayana Francesa"},
                    {iso: "GG", country_name: "Guernsey"},	
                    {iso: "GH", country_name: "Ghana"},
                    {iso: "GI", country_name: "Gibraltar"},
                    {iso: "GL", country_name: "Groenlandia"},	
                    {iso: "GM", country_name: "Gambia"},
                    {iso: "GN", country_name: "Guinea"},	
                    {iso: "GP", country_name: "Guadalupe"},	
                    {iso: "GQ", country_name: "Guinea Ecuatorial"},
                    {iso: "GR", country_name: "Grecia"},
                    {iso: "GT", country_name: "Guatemala"},	
                    {iso: "HK", country_name: "Hong Kong"},
                    {iso: "HN", country_name: "Honduras"},
                    {iso: "HR", country_name: "Croacia"},
                    {iso: "HT", country_name: "Haiti"},
                    {iso: "HU", country_name: "Hungria"},	
                    {iso: "ID", country_name: "Indonesia"},	
                    {iso: "IE", country_name: "Irlanda"},
                    {iso: "IL", country_name: "Israel"},	
                    {iso: "IN", country_name: "India"},	
                    {iso: "IQ", country_name: "Irak"},
                    {iso: "IR", country_name: "Iran"},	
                    {iso: "IS", country_name: "Islandia"},
                    {iso: "IT", country_name: "Italia"},
                    {iso: "JM", country_name: "Jamaica"},	
                    {iso: "JO", country_name: "Jordania"},	
                    {iso: "JP", country_name: "Japon"},
                    {iso: "KE", country_name: "Kenia"},	
                    {iso: "KG", country_name: "Kirguistan"},	
                    {iso: "KH", country_name: "Camboya"},
                    {iso: "KP", country_name: "Corea del Norte"},	
                    {iso: "KR", country_name: "Corea del Sur"},
                    {iso: "KW", country_name: "Kuwait"},	
                    {iso: "KY", country_name: "Islas Caiman"},
                    {iso: "LB", country_name: "Libano"},
                    {iso: "LC", country_name: "Santa Lucia"},	
                    {iso: "LT", country_name: "Lituania"},	
                    {iso: "MA", country_name: "Marruecos"},	
                    {iso: "MK", country_name: "Macedonia"},	
                    {iso: "MN", country_name: "Mongolia"},	
                    {iso: "MQ", country_name: "Martinica"},	
                    {iso: "MX", country_name: "Mexico"},	
                    {iso: "NG", country_name: "Nigeria"},	
                    {iso: "NI", country_name: "Nicaragua"},	
                    {iso: "NL",country_name: "Paises Bajos"},	
                    {iso: "NO",country_name: "Noruega"},	
                    {iso: "NP",country_name: "Nepal"},	
                    {iso: "NZ",country_name: "Nueva Zelanda"},	
                    {iso: "PA",country_name: "Panama"},	
                    {iso: "PE",country_name: "Peru"},	
                    {iso: "PF",country_name: "Polinesia Francesa"},
                    {iso: "PH",country_name: "Filipinas"},
                    {iso: "PK",country_name: "Pakistan"},
                    {iso: "PL",country_name: "Polonia"},	
                    {iso: "PR",country_name: "Puerto Rico"},	
                    {iso: "PS",country_name: "Palestina"},	
                    {iso: "PT",country_name: "Portugal"},	
                    {iso: "PY",country_name: "Paraguay"},	
                    {iso: "QA",country_name: "Qatar"},
                    {iso: "RO",country_name: "Rumania"},	
                    {iso: "RS",country_name: "Serbia y Montenegro"},
                    {iso: "RU",country_name: "Rusia"},	
                    {iso: "SA",country_name: "Arabia Saudita"},
                    {iso: "SE",country_name: "Suecia"},
                    {iso: "SG",country_name: "Singapur"},	
                    {iso: "SI",country_name: "Eslovenia"},	
                    {iso: "SN",country_name: "Senegal"},
                    {iso: "SV",country_name: "El Salvador"},
                    {iso: "SY",country_name: "Siria"},	
                    {iso: "TG",country_name: "Togo"},	
                    {iso: "TH",country_name: "Tailandia"},	
                    {iso: "TH",country_name: "Tanzania"},	
                    {iso: "TN",country_name: "Tunez"},	
                    {iso: "TR",country_name: "Turquia"},	
                    {iso: "TT",country_name: "Trinidad y Tobago"},
                    {iso: "TW",country_name: "Taiwan"},
                    {iso: "UA",country_name: "Ucrania"},	
                    {iso: "US",country_name: "Estados Unidos de America"},
                    {iso: "UY",country_name: "Uruguay"},
                    {iso: "VA",country_name: "Ciudad del Vaticano"},
                    {iso: "VE",country_name: "Venezuela"},
                    {iso: "VG",country_name: "Islas Virgenes Britanicas"},
                    {iso: "VI",country_name: "Islas Virgenes de los Estados Unidos de America"},
                    {iso: "VN",country_name: "Vietnam"},	
                    {iso: "ZA",country_name: "Sudafrica"}
                ];

module.exports = {countries: countries};

function loadCities(country, citiesSelect, $http, $this, countryCode) {
    
    if (!country) {
        country = "country";
        citiesSelect = "cities";
        
    }
    
    //var applicationAccount = "spanishpro.net";
    $("[" + citiesSelect + "]").attr("disabled", "disabled");
    
    var applicationAccount = "freddyucv";
    
    if (!countryCode) {
        countryCode = $("[" + country + "]").val();
    }        
                
    var httpReq = {
         method: 'GET',
         url: "http://api.geonames.org/search?country=" + countryCode + "&maxRows=10&username=" + applicationAccount + "&type=json&cities=cities1000",

        };
        
        $http(httpReq).success(function(data, status, headers, config) {
                                                         
                                                                        var aux = data.geonames;
                                                                        var cities = [];
                                                                        
                                                                        for (var i = 0; i < aux.length; i++){
                                                                            var cityName = aux[i].toponymName;
                                                                            cities.push(cityName);
                                                                        }
                                                                        
                                                                        $("[" + citiesSelect + "]").removeAttr("disabled", "false");
                                                                        $this.loadCitiesCombo(cities);
                                  
   
                                                                 })
                .error(function(data, status, headers, config) {
                                                                    if (status != 0) {
                                                                        alert(data);
                                                                    }    
                                                                });
                
                
                
                
    /*var xmlhttp = new XMLHttpRequest();
    var path = "http://api.geonames.org/search?country=" + countryCode + "&maxRows=10&username=" + applicationAccount + "&type=json&cities=cities1000";
    xmlhttp.open("GET", path, true);
    xmlhttp.send();
    
    return new Promise(function(resolve){
                                    xmlhttp.onreadystatechange=function()
                                        {
                                            if (xmlhttp.readyState==4 && xmlhttp.status==200){
                                                var aux = JSON.parse(xmlhttp.responseText).geonames;
                                                var cities = [];
                                                
                                                for (var i = 0; i < aux.length; i++){
                                                    var cityName = aux[i].toponymName;
                                                    cities.push(cityName);
                                                }
                                                
                                                $("[" + citiesSelect + "]").removeAttr("disabled", "false");
                                                $this.loadCitiesCombo(cities);
                                            }
                                        }    
                                });    */                             
}
