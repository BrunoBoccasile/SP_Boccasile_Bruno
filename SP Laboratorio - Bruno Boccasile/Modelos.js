
class Persona {
    id;
    nombre;
    apellido;
    edad;

    constructor(id, nombre, apellido, edad) 
    {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;  
    }

    toString() {
        return (this.id + ", " + this.nombre + ", " + this.apellido + ", " + this.edad);
    }
}

class Profesional extends Persona
{
    titulo;
    facultad;
    añoGraduacion;

    constructor(id, nombre, apellido, edad, titulo, facultad, añoGraduacion)
    {
        super(id, nombre, apellido, edad);
        this.titulo = titulo;
        this.facultad = facultad;
        this.añoGraduacion = añoGraduacion;
    }

    toString() {
        return super.toString() + ", " + this.titulo + ", " + this.facultad + ", " + this.añoGraduacion;
    }
}

class Futbolista extends Persona
{
    equipo;
    posicion;
    cantidadGoles;

    constructor(id, nombre, apellido, edad, equipo, posicion, cantidadGoles)
    {
        super(id, nombre, apellido, edad);
        this.equipo = equipo;
        this.posicion = posicion;
        this.cantidadGoles = cantidadGoles;
    }

    toString() {
        return super.toString() + ", " + this.equipo + ", " + this.posicion + ", " + this.cantidadGoles;
    }
}


let arrayPersonas = new Array()

function crearArrayPersonas(arrayPersonasObj)
{
    arrayPersonas = arrayPersonasObj.map(persona => {
    
        let personaCreada;
    
        if ("equipo" in persona && "posicion" in persona && "cantidadGoles" in persona) {
            personaCreada = new Futbolista(persona.id, persona.nombre, persona.apellido, persona.edad, persona.equipo, persona.posicion, persona.cantidadGoles);
        }
        else if ("titulo" in persona && "facultad" in persona && "añoGraduacion" in persona) {
            personaCreada = new Profesional(persona.id, persona.nombre, persona.apellido, persona.edad, persona.titulo, persona.facultad, persona.añoGraduacion);
        }
    
        return personaCreada;
    });
}

