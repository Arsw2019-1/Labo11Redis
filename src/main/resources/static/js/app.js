$("#connect").on("click", cine);

var persons = [];
var cinemas = "";

var tabla = "";
var cine = (function () {

    function getAllCinemas() {

        cinemas = apimock.getByNamesCinemas();

        $("#listacinemas").append("<tr><td>" + cinemas + "</td></tr>");
        selectCinema();
    }

    function selectCinema() {
        for (var x = 0; x < cinemas.length; x++) {
            document.getElementById("cine").innerHTML += ("<option>" + cinemas[x] + "</option>");
        }

    }

    function llenadotabla() {
        $(document).ready(function () {
            $(".add-row").click(function () {
                var name = $("#name").val();
                var email = $("#email").val();
                var markup = "<tr><td><input type='checkbox' name='record'></td><td>" + name + "</td><td>" + email + "</td></tr>";
                $("table tbody").append(markup);
            });


        });



    }

    function selec() {
        var texto = "";
        texto = "El numero de opciones del select: " + document.form2.cine.length;
        var indice = document.form2.form2.selectedIndex;
        texto += "nIndice de la opcion escogida: " + indice;
        var valor = document.form2.form2.options[indice].value;
        texto += "nValor de la opcion escogida: " + valor;
        var textoEscogido = document.form2.form2.options[indice].text;
        myFunction(apimock.getByNamesCine(valor));
    }

    function getFullName() {
        var fullname = "";
        for (var x = 0; x < persons.length; x++) {
            var t = persons[x].functions;
            for (var i = 0; i < t.length; i++)
            {
                fullname += [t[i].movie.name, t[i].seats.length * 12, t[i].date].join(" ");


                $(document).ready(function () {
                    
                        var name = t[i].movie.name;
                        var puestos = t[i].seats.length * 12;
                        var fecha=t[i].date;
                        var markup = "<tr><td><input type='checkbox' name='record'></td><td>" + name + "</td><td>" + puestos + "</td><td>"+fecha + "</td></tr>";
                        $("table tbody").append(markup);
                });

            }
        }

        return fullname;
    }

    function myFunction(ter) {
        persons[0] = ter;
        document.getElementById("infoCinema").innerHTML = persons.map(getFullName);
    }

    return {
        getAllCinemas: getAllCinemas,
        selectCinema: selectCinema,
        selec: selec,
        llenadotabla: llenadotabla
    };
})();