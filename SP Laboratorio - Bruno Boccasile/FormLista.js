window.onload = cargarPersonas();

function cargarPersonas() {
    var xhttp = new XMLHttpRequest();
    verFormSpinner();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            if(xhttp.status == 200)
            {
                let arrayPersonasObj = JSON.parse(xhttp.responseText);
                console.log(arrayPersonasObj);
                crearArrayPersonas(arrayPersonasObj);
                hacerTablaPersona();
                verFormSpinner();
            }
            else 
            {
                alert("Error: No se pudo hacer la carga de personas");
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function limpiarBody() {
    let tbodyExistente = document.getElementById("tbodyPersonas");

    while (tbodyExistente.firstChild) {
        tbodyExistente.removeChild(tbodyExistente.firstChild);
    }
}

function limpiarHead() {
    let theadExistente = document.getElementById("theadPersonas");

    while (theadExistente.firstChild) {
        theadExistente.removeChild(theadExistente.firstChild);
    }
}



function hacerTablaPersona() {



    let tabla = document.getElementById("tablaPersonas");
    let thead;

    if (document.getElementById("theadPersonas") == null) {
        thead = document.createElement("thead");
        thead.id = "theadPersonas";
        tabla.appendChild(thead);
    }
    else {
        limpiarHead();
    }

    thead = document.getElementById("theadPersonas");

    let trHead = document.createElement("tr");
    thead.appendChild(trHead);


    let arrayEncabezado = [
        "ID",
        "Nombre",
        "Apellido",
        "Edad",
        "Equipo",
        "Posicion",
        "CantidadGoles",
        "Titulo",
        "Facultad",
        "AñoGraduacion",
        "Modificar",
        "Eliminar"
    ];

    for (let i = 0; i < arrayEncabezado.length; i++) {
        let th = document.createElement("th");
        let thTexto = document.createTextNode(arrayEncabezado[i]);
        th.appendChild(thTexto);
        trHead.appendChild(th);
    }


    tabla.appendChild(thead);

    let tbody

    if (document.getElementById("tbodyPersonas") == null) {
        tbody = document.createElement("tbody");
        tbody.id = "tbodyPersonas";
        tabla.appendChild(tbody);
    }
    else {
        limpiarBody();
    }

    tbody = document.getElementById("tbodyPersonas");

    let contador = 0;
    arrayPersonas.forEach(function (persona) {
        if (persona instanceof Persona) {
            let tr = document.createElement("tr");
            tr.id = "tr" + contador;
            contador++;
            tbody.appendChild(tr);

            for (let i = 0; i < arrayEncabezado.length - 2; i++) {

                let td = document.createElement("td");
                let tdTexto = document.createTextNode("N/A");
                switch (i) {
                    case 0:
                        tdTexto = document.createTextNode(persona.id);
                        break;
                    case 1:
                        tdTexto = document.createTextNode(persona.nombre);
                        break;
                    case 2:
                        tdTexto = document.createTextNode(persona.apellido);
                        break;
                    case 3:
                        tdTexto = document.createTextNode(persona.edad);
                        break;
                    case 4:
                        if (persona instanceof Futbolista) {
                            tdTexto = document.createTextNode(persona.equipo);
                        }
                        break;
                    case 5:
                        if (persona instanceof Futbolista) {
                            tdTexto = document.createTextNode(persona.posicion);
                        }
                        break;
                    case 6:
                        if (persona instanceof Futbolista) {
                            tdTexto = document.createTextNode(persona.cantidadGoles);
                        }
                        break;
                    case 7:
                        if (persona instanceof Profesional) {
                            tdTexto = document.createTextNode(persona.titulo);
                        }
                        break;
                    case 8:
                        if (persona instanceof Profesional) {
                            tdTexto = document.createTextNode(persona.facultad);
                        }
                        break;
                    case 9:
                        if (persona instanceof Profesional) {
                            tdTexto = document.createTextNode(persona.añoGraduacion);
                        }
                        break;
                }
                td.appendChild(tdTexto);
                tr.appendChild(td);


            }
            let tdModificar = document.createElement("td");
            let botonModificar = document.createElement("input");
            botonModificar.type = "button";
            botonModificar.value = "Modificar";
            botonModificar.addEventListener("click", () => { formABMModificar(persona.id) });
            tdModificar.appendChild(botonModificar);
            tr.appendChild(tdModificar);

            let tdEliminar = document.createElement("td");
            let botonEliminar = document.createElement("input");
            botonEliminar.type = "button";
            botonEliminar.value = "Eliminar";
            tdEliminar.appendChild(botonEliminar);
            botonEliminar.addEventListener("click", () => { formABMEliminar(persona.id) });
            tr.appendChild(tdEliminar);
        }


    });

}



function verFormDatos() {
    document.getElementById("formABM").style.display = "none";
    document.getElementById("formLista").style.display = "block";
    hacerTablaPersona();
}

function verFormSpinner()
{
    if(document.getElementById("spinner").style.display == "flex")
    {
        document.getElementById("spinner").style.display = "none";
    }
    else
    {
        document.getElementById("spinner").style.display = "flex"
    }
}