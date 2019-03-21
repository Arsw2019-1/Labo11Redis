$("#connect").on("click", cine);

var persons = [];
var cinemas = "";
var sillasNum=0;
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
        cine.selecs()
    }
    function selecs() {
        $(document.datCine).ready(function () {
            $('input[type="checkbox"]').change(function () {
                if ($(this).is(':checked')) {
                    $('input[type="checkbox"]').not(this).prop('checked', false);
                    var tr = $(this).closest('tr');
                    var funcion = $(tr).find('td:nth-child(2)').text();
                    var canntidadSillas = $(tr).find('td:nth-child(3)').text();
                    var fecha = $(tr).find('td:nth-child(4)').text();
                    console.log('funcion: ' + funcion + ' - cantidad Sillas: ' + canntidadSillas + ' fecha: ' + fecha +'las sillas'+sillasNum);
                    mostrarSillas();
                }
            })
        })
        
        
        
    }
    
    function mostrarSillas(){
        
        var markup="";
        $("table ").clearQueue();
        $(document.sillas).ready(function(){
        
            for(var y=0; y<7;y++){
                var temp=sillasNum[y];
                markup+="<tr>";
                for(var u=0;u<12;u++){
                    var tem=temp[u];
                   // alert("miremos valor "+tem);
                    markup+="<br>";
                    if(tem==true){
                        
                        markup+="<br>";
                        markup+="<td bgcolor='#00FF00'></td>";                        
                        markup+="<br>";
                    }else{
                        //alert("salimos");
                        
                        markup+="<td bgcolor='#FF0000'></td>";
                        
                    }   
                }
                markup+="</tr>";
            }
            markup+="</tr>";
            $("table ").append(markup);
            
        
        
    });    
        
    }
    
    function getFullName() {
        var fullname = "";
        for (var x = 0; x < persons.length; x++) {
            var t = persons[x].functions;
            for (var i = 0; i < t.length; i++)
            {
                fullname += [t[i].movie.name, t[i].seats.length * 12, t[i].date].join(" ");
                $(document.tabs).ready(function () {
                    var name = t[i].movie.name;
                    sillasNum=t[i].seats;
                    var puestos = t[i].seats.length * 12;
                    var fecha = t[i].date;
                    var markup = "<tr><td><input type='checkbox' name='record'></td><td>" + name + "</td><td>" + puestos + "</td><td>" + fecha + "</td></tr>";
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
        selecs: selecs,
        llenadotabla: llenadotabla,
        mostrarSillas:mostrarSillas
    };
})();