function verFormABM() {
    document.getElementById("formABM").style.display = "block";
    document.getElementById("formLista").style.display = "none";
    limpiarFormABM();
}

function limpiarFormABM() {
    document.getElementById("id").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("atributo1").value = "";
    document.getElementById("atributo2").value = "";
    document.getElementById("atributo3").value = "";

    document.getElementById("lbltipo").style.display = "inline";
    document.getElementById("tipo").style.display = "inline";
    document.getElementById("br").style.display = "inline";
    document.getElementById("aceptar").style.display = "inline";
    document.getElementById("modificar").style.display = "none";
    document.getElementById("eliminar").style.display = "none";
    document.getElementById("lblatributo1").textContent = "Equipo: ";
    document.getElementById("lblatributo2").textContent = "Posicion: ";
    document.getElementById("lblatributo3").textContent = "CantidadGoles: ";
    document.getElementById("tipo").value = "Futbolista";
    document.getElementById("hFormularioABM").textContent = "Formulario Alta";

    document.getElementById("nombre").disabled = false;
    document.getElementById("apellido").disabled = false;
    document.getElementById("edad").disabled = false;
    document.getElementById("atributo1").disabled = false;
    document.getElementById("atributo2").disabled = false;
    document.getElementById("atributo3").disabled = false;
    document.getElementById("tipo").disabled = false;
}

function mostrarCasillasABM() {
    let select = document.getElementById("tipo");
    let lblAtributo1 = document.getElementById("lblatributo1");
    let lblAtributo2 = document.getElementById("lblatributo2");
    let lblAtributo3 = document.getElementById("lblatributo3");

    if (select.value == "Futbolista") {
        lblAtributo1.textContent = "Equipo: ";
        lblAtributo2.textContent = "Posicion: ";
        lblAtributo3.textContent = "CantidadGoles: ";
    }
    else if (select.value == "Profesional") {
        lblAtributo1.textContent = "Titulo: ";
        lblAtributo2.textContent = "Facultad: ";
        lblAtributo3.textContent = "AñoGraduacion: ";
    }
}

function formABMEliminar(id) {
    verFormABM();
    let idTxt = document.getElementById("id");
    let nombreTxt = document.getElementById("nombre");
    let apellidoTxt = document.getElementById("apellido");
    let edadTxt = document.getElementById("edad");
    let atributo1Txt = document.getElementById("atributo1");
    let atributo2Txt = document.getElementById("atributo2");
    let atributo3Txt = document.getElementById("atributo3");
    document.getElementById("aceptar").style.display = "none";
    document.getElementById("modificar").style.display = "inline";

    document.getElementById("hFormularioABM").textContent = "Formulario Baja";
    document.getElementById("nombre").disabled = true;
    document.getElementById("apellido").disabled = true;
    document.getElementById("edad").disabled = true;
    document.getElementById("atributo1").disabled = true;
    document.getElementById("atributo2").disabled = true;
    document.getElementById("atributo3").disabled = true;
    document.getElementById("tipo").disabled = true;
    document.getElementById("aceptar").style.display = "none";
    document.getElementById("eliminar").style.display = "inline";
    document.getElementById("modificar").style.display = "none";

    arrayPersonas.forEach(persona => {
        if (persona.id == id) {
            idTxt.value = persona.id;
            nombreTxt.value = persona.nombre;
            apellidoTxt.value = persona.apellido;
            edadTxt.value = persona.edad;
            if (persona instanceof Futbolista) {
                document.getElementById("tipo").value = "Futbolista";
                atributo1Txt.value = persona.equipo;
                document.getElementById("lblatributo1").textContent = "Equipo: ";
                atributo2Txt.value = persona.posicion;
                document.getElementById("lblatributo2").textContent = "Posicion: ";
                atributo3Txt.value = persona.cantidadGoles;
                document.getElementById("lblatributo3").textContent = "CantidadGoles: ";
            }
            else if (persona instanceof Profesional) {
                document.getElementById("tipo").value = "Profesional";
                atributo1Txt.value = persona.titulo;
                document.getElementById("lblatributo1").textContent = "Titulo: ";
                atributo2Txt.value = persona.facultad;
                document.getElementById("lblatributo2").textContent = "Facultad: ";
                atributo3Txt.value = persona.añoGraduacion;
                document.getElementById("lblatributo3").textContent = "AñoGraduacion: ";
            }
        }
    });

}

async function eliminarPersona() {
    idBorrar = document.getElementById("id").value;
    idBorrarObj = { id: idBorrar };
    verFormSpinner();
    try {
        const response = await fetch(url,
            {
                method: 'DELETE',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(idBorrarObj)
            });
        let resultado = await response.text();
        if (!response.ok) {
            throw new Error(resultado);
        }
        else {
            arrayPersonas = arrayPersonas.filter(persona => persona.id != idBorrar);
            alert(resultado);
        }

    }
    catch (error) {
        console.error("Error en la solicitud:", error);
        alert(error);
    }


    verFormSpinner();
    verFormDatos();
}

function formABMModificar(id) {
    verFormABM();
    let idTxt = document.getElementById("id");
    let nombreTxt = document.getElementById("nombre");
    let apellidoTxt = document.getElementById("apellido");
    let edadTxt = document.getElementById("edad");
    let atributo1Txt = document.getElementById("atributo1");
    let atributo2Txt = document.getElementById("atributo2");
    let atributo3Txt = document.getElementById("atributo3");
    document.getElementById("aceptar").style.display = "none";
    document.getElementById("modificar").style.display = "inline";
    document.getElementById("tipo").disabled = true;


    document.getElementById("hFormularioABM").textContent = "Formulario Modificacion";
    arrayPersonas.forEach(persona => {
        if (persona.id == id) {
            idTxt.value = persona.id;
            nombreTxt.value = persona.nombre;
            apellidoTxt.value = persona.apellido;
            edadTxt.value = persona.edad;
            if (persona instanceof Futbolista) {
                document.getElementById("tipo").value = "Futbolista";
                atributo1Txt.value = persona.equipo;
                document.getElementById("lblatributo1").textContent = "Equipo: ";
                atributo2Txt.value = persona.posicion;
                document.getElementById("lblatributo2").textContent = "Posicion: ";
                atributo3Txt.value = persona.cantidadGoles;
                document.getElementById("lblatributo3").textContent = "CantidadGoles: ";
            }
            else if (persona instanceof Profesional) {
                document.getElementById("tipo").value = "Profesional";
                atributo1Txt.value = persona.titulo;
                document.getElementById("lblatributo1").textContent = "Titulo: ";
                atributo2Txt.value = persona.facultad;
                document.getElementById("lblatributo2").textContent = "Facultad: ";
                atributo3Txt.value = persona.añoGraduacion;
                document.getElementById("lblatributo3").textContent = "AñoGraduacion: ";
            }
        }
    });


}

function modificarPersona() {
    let idTxt = document.getElementById("id");
    let nombreTxt = document.getElementById("nombre");
    let apellidoTxt = document.getElementById("apellido");
    let edadTxt = document.getElementById("edad");
    let atributo1Txt = document.getElementById("atributo1");
    let atributo2Txt = document.getElementById("atributo2");
    let atributo3Txt = document.getElementById("atributo3");
    let opcionSeleccionada = document.getElementById("tipo").value;

    if (opcionSeleccionada == "Futbolista") {
        instancia = Futbolista;
    }
    else if (opcionSeleccionada == "Profesional") {
        instancia = Profesional;
    }

    if (instancia == Futbolista) {
        data = {
            id: idTxt.value,
            nombre: nombreTxt.value,
            apellido: apellidoTxt.value,
            edad: edadTxt.value,
            equipo: atributo1Txt.value,
            posicion: atributo2Txt.value,
            cantidadGoles: atributo3Txt.value
        }
    }
    else if (instancia == Profesional) {
        data = {
            id: idTxt.value,
            nombre: nombreTxt.value,
            apellido: apellidoTxt.value,
            edad: edadTxt.value,
            titulo: atributo1Txt.value,
            facultad: atributo2Txt.value,
            añoGraduacion: atributo3Txt.value
        }
    }

    verFormSpinner();
    fetch(url,
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        }).then(response => {
            if (!response.ok) {
                return response.text().then(mensajeError => {
                    throw new Error(mensajeError);
                });
            }
            else {
                if (validarPersona(nombreTxt, apellidoTxt, edadTxt, atributo1Txt, atributo2Txt, atributo3Txt, instancia)) {
                    response.text().then(mensajeExito => {
                        arrayPersonas.map(persona => {
                            if (persona.id == idTxt.value) {

                                persona.nombre = nombreTxt.value;
                                persona.apellido = apellidoTxt.value;
                                persona.edad = edadTxt.value;

                                if (persona instanceof Futbolista) {
                                    persona.equipo = atributo1Txt.value;
                                    persona.posicion = atributo2Txt.value;
                                    persona.cantidadGoles = atributo3Txt.value;
                                }
                                else if (persona instanceof Profesional) {
                                    persona.titulo = atributo1Txt.value;
                                    persona.facultad = atributo2Txt.value;
                                    persona.añoGraduacion = atributo3Txt.value
                                }
                            }
                        });
                        alert(mensajeExito);
                    })

                }
                else {
                    alert("No se pudo modificar la persona, no paso la validacion");
                }
            }
        }).catch(error => {
            console.error("Error en la solicitud:", error);
            alert(error);
        }).then(() => {
            verFormSpinner();
            verFormDatos();
        })
}





async function agregarPersona() {
    let nombreTxt = document.getElementById("nombre");
    let apellidoTxt = document.getElementById("apellido");
    let edadTxt = document.getElementById("edad");
    let opcionSeleccionada = document.getElementById("tipo").value;
    let atributo1Txt = document.getElementById("atributo1");
    let atributo2Txt = document.getElementById("atributo2");
    let atributo3Txt = document.getElementById("atributo3");
    let instancia;

    if (opcionSeleccionada == "Futbolista") {
        instancia = Futbolista;
    }
    else if (opcionSeleccionada == "Profesional") {
        instancia = Profesional;
    }
    if (instancia == Futbolista) {
        data = {
            nombre: nombreTxt.value,
            apellido: apellidoTxt.value,
            edad: edadTxt.value,
            equipo: atributo1Txt.value,
            posicion: atributo2Txt.value,
            cantidadGoles: atributo3Txt.value
        }
    }
    else if (instancia == Profesional) {
        data = {
            nombre: nombreTxt.value,
            apellido: apellidoTxt.value,
            edad: edadTxt.value,
            titulo: atributo1Txt.value,
            facultad: atributo2Txt.value,
            añoGraduacion: atributo3Txt.value
        }
    }





    console.log(data);
    verFormSpinner();
    try {
        const response = await fetch(url,
            {
                method: 'PUT',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(data)
            });
        if (response.ok) {
            response.json().then(resultado => {
                if (resultado.id != null && !isNaN(resultado.id)) {
                    if (validarPersona(nombreTxt, apellidoTxt, edadTxt, atributo1Txt, atributo2Txt, atributo3Txt, instancia)) {
                        let nuevaPersona;
                        if (instancia == Futbolista) {
                            nuevaPersona = new Futbolista(resultado.id, nombreTxt.value, apellidoTxt.value, edadTxt.value, atributo1Txt.value, atributo2Txt.value, atributo3Txt.value);
                        }
                        else if (instancia == Profesional) {
                            nuevaPersona = new Profesional(resultado.id, nombreTxt.value, apellidoTxt.value, edadTxt.value, atributo1Txt.value, atributo2Txt.value, atributo3Txt.value);
                        }
                        arrayPersonas.push(nuevaPersona);
                        alert("Persona con id " + resultado.id + " ingresada con exito");
                    }
                    else {
                        alert("No se pudo crear la persona, no paso la validacion");
                    }
                }
    
                else {
                    alert("El id no puede ser null y debe ser un numero");
                }
                verFormSpinner();
                limpiarFormABM();
                verFormDatos();
            });
        }
        else {
            let resultado = await response.text();
            throw new Error(resultado);

        }
    }
    catch (error) 
    {
        console.error("Error en la solicitud:", error);
        alert(error);
        verFormSpinner();
        limpiarFormABM();
        verFormDatos();
    }

}



function validarPersona(nombre, apellido, edad, atributo1, atributo2, atributo3, instancia) {
    let retorno = true;

    if (
        (!isNaN(nombre.value) || nombre.value == null) ||
        (!isNaN(apellido.value) || apellido.value == null) ||
        (isNaN(edad.value) || edad.value < 15)
    ) {
        retorno = false;
    }
    else {
        if (instancia == Futbolista) {
            if
                (
                (!isNaN(atributo1.value) || atributo1.value == null) ||
                (!isNaN(atributo2.value) || atributo2.value == null) ||
                (isNaN(atributo3.value) || atributo3.value <= -1)
            ) {
                retorno = false;
            }
        }
        else if (instancia == Profesional) {
            if
                (
                (!isNaN(atributo1.value) || atributo1.value == null) ||
                (!isNaN(atributo2.value) || atributo2.value == null) ||
                (isNaN(atributo3.value) || atributo3.value <= 1950)
            ) {
                retorno = false;
            }
        }
    }
    return retorno;
}