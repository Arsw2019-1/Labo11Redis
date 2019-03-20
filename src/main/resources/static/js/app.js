

$("#connect").on("click", cine);
var cinemas ="";
var cine = (function () {

    function getAllCinemas() {

        cinemas = apimock.getByNamesCinemas();
        
        $("#listacinemas").append("<tr><td>" + cinemas + "</td></tr>");

    }

    function selectCinema(){
        alert("hola mundo");
        for(var x=0; x<cinemas.length;x++){
            alert(cinemas[x]);
            document.getElementById("cine").innerHTML += ("<option>"+cinemas[x]+"</option>");
            
        }



    }


    return {
        getAllCinemas: getAllCinemas,
        selectCinema:selectCinema

    };
})();


