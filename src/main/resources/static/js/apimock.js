//@author dsaavedra
var elec = "";
        var apimock = (function(){

        var mockdata = [];
                var mockdata = new Array();
                mockdata.push({name:"Cine80", functions:[{movie:{"name":"Titanic Movie", "genre":"Action"}, seats:[[true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true]], date:"2018-12-18 15:30"}, {movie:{name:"The Purge", genre:"Horror"}, seats:[[true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true]], date:"2018-12-18 15:30"}]});
                mockdata.push({name:"Cine112", functions:[{movie:{"name":"mision imposible", "genre":"Fiction"}, seats:[[true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true]], date:"2018-12-18 15:31"}]});
                var names = new Array();
                mockdata["Cine80"] = [{name:"Cine80", functions:[{movie:{"name":"Titanic Movie", "genre":"Action"}, seats:[[true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true]], date:"2018-12-18 15:30"}, {movie:{name:"The Purge", genre:"Horror"}, seats:[[true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true]], date:"2018-12-18 15:30"}]}];
                mockdata["Cine112"] = [{name:"Cine112", functions:[{movie:{"name":"mision imposible", "genre":"Fiction"}, seats:[[true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true]], date:"2018-12-18 15:31"}]}];
                for (var i = 0; i < mockdata.length; i++){
        names.push(mockdata[i].name);
        }
        return {
        getCinemaByName:function(name, callback){
        callback(
           
                
                mockdata[name]
                );
        },
                getByNamesCinemas:function(){
                return names;
                },
                getByNamesCine:function(name){
                    var resp="";
                    for(var i = 0; i < mockdata.length; i++){
                        if(mockdata[i].name==name){
                            alert("urra"+mockdata[i].name);
                            resp=mockdata[i];
                            alert(resp.name);
                            break;
                            
                            
                        }
                        
                        
                    }
                    
                return resp;
                }




        }
        })();