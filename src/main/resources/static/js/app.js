

$("#connect").on("click", cine);

var cine = (function () {

    function getAllCinemas() {
        alert("miremos como llega solito"+apimock.getByNamesCinemas());
        var cinemas = apimock.getByNamesCinemas();
        alert("mremos los cinemas: " + cinemas);
        
 
    

        $("#listacinemas").append("<tr><td>" + cinemas + "</td></tr>");


    }


    return {
        getAllCinemas: getAllCinemas

    };
})();


