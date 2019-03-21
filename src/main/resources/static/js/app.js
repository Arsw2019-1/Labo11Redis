$("#connect").on("click", cine);

var persons = [];
var cinemas = "";
var cine = (function () {

    function getAllCinemas() {

        cinemas = apimock.getByNamesCinemas();

        $("#listacinemas").append("<tr><td>" + cinemas + "</td></tr>");

    }

    function selectCinema() {
        for (var x = 0; x < cinemas.length; x++) {
            document.getElementById("cine").innerHTML += ("<option>" + cinemas[x] + "</option>");
        }

    }
    function selec() {
        var texto = "";
        texto = "El numero de opciones del select: " + document.form2.cine.length
        var indice = document.form2.form2.selectedIndex
        texto += "nIndice de la opcion escogida: " + indice
        var valor = document.form2.form2.options[indice].value
        texto += "nValor de la opcion escogida: " + valor
        alert("putos es este" + valor);
        var textoEscogido = document.form2.form2.options[indice].text
        texto += "nTexto de la opcion escogida: " + textoEscogido
        alert(texto)


        myFunction(apimock.getByNamesCine(valor));

    }


    function getFullName() {
        var fullname = "";
        for (var x = 0; x < persons.length; x++) {
            alert(persons[x].name);
            alert(persons[x].functions[x].movie.name);
            alert(persons[x].functions[x].seats.length * 12);
            alert(persons[x].functions[x].date);
            fullname = [persons[x].name, persons[x].functions[x].movie.name, persons[x].functions[x].seats.length * 12, persons[x].functions[x].date].join(" ");
        }
        return fullname;
    }

    function myFunction(ter) {
        persons[0]=ter;
        document.getElementById("infoCinema").innerHTML = persons.map(getFullName);
    }

    return {
        getAllCinemas: getAllCinemas,
        selectCinema: selectCinema,
        selec: selec
    };
})();