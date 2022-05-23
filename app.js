class perro{
    constructor(nombre,duenio,sexo,anio,telefono){
        this.nombre=nombre
        this.duenio=duenio
        this.sexo=sexo
        this.anio=anio
        this.telefono=telefono
        }
        
}

//DECLARACION DE PERROS EN LISTA//
let perro1 = new perro ("jack", "raul", "macho", 2010, "4444-4444")
let perro2 = new perro ("pancha", "alicia", "hembra", 2015, "5555-5555")
let perro3 = new perro ("firulais", "ruben", "macho", 2019, "9999-9999")
let perro4 = new perro ("morgan", "bruno", "macho", 2016, "3333-3333")
let perro5 = new perro ("raviol", "paula", "hembra", 2017, "2222-2222")
let perro6 = new perro ("luna", "marco", "hembra", 2018, "7777-7777")

//DECLARACION DE JAURIA//
const jauria =[] 
jauria.push(perro1)
jauria.push(perro2)
jauria.push(perro3)
jauria.push(perro4)
jauria.push(perro5)
jauria.push(perro6) 
console.log(jauria)

//INGRESAR NUEVO PERRO//
let ingresarPerro =document.getElementById ("ingresarPerro")
ingresarPerro.addEventListener("click", ()=>{ 
    let nuevoNombre = prompt("Ingrese el nombre del perro").toLowerCase()
    let nuevoDuenio = prompt("ingrese el nombre del dueño").toLowerCase()
    let nuevoSexo =  prompt("macho o hembra").toLowerCase()
    //OEPRADOR TERNARIO//
    nuevoSexo == "macho" ? alert("Usted ingreso un perro llamado "+ nuevoNombre) : alert("Usted ingreso una perra llamada "+ nuevoNombre)
    let nuevoAnio = Number(prompt("Ingrese el año en que nacio"))
    let nuevoTelefono = prompt("Ingrese el numero de telefono")
    let nuevoPerro = new perro(nuevoNombre,nuevoDuenio,nuevoSexo,nuevoAnio,nuevoTelefono)
    jauria.push(nuevoPerro)
    console.log(jauria)
///////////////////////////////////////

///////////////////////////////////////
do{
    respuesta = prompt("Desa ingresar un nuevo perro? (si/no)").toLowerCase()

if (respuesta == "si"){
    agregarPerro()
    respuesta = prompt("Desa ingresar un nuevo perro? (si/no)").toLowerCase()    
}
if (respuesta == "no"){
    //SWEATALERT
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Muchas gracias! Hasta la proxima!',
        showConfirmButton: false,
        timer: 1000
        }) 
    }
}while (respuesta !== "si" && respuesta !== "no")
////////////////////////////////////////////////
}
)
//SEPARACION POR SEXO//
let macho = jauria.filter(perro=>perro.sexo=="macho")
let hembra = jauria.filter(perro=>perro.sexo=="hembra")
//OPERADOR SPREAD PARA CONCATENAR//
const arrayMacho = [macho]
const arrayHembra = [hembra]
const machoHembra = [...macho, ...hembra]
console.log(macho)
console.log(hembra)
console.log(machoHembra)

//LISTADO COMPLETO DE PERROS//
let contenedor =document.getElementById("contenedor")
let listaPerros = document.getElementById ("listaPerros")
listaPerros.addEventListener ("click", ()=>{
    jauria.forEach(perro=> {
        agregarListaAlHTML(perro)
    });
}
)


//FUNCION LISTA PERRO// 
function agregarListaAlHTML(perro) {
    let ul = document.createElement ("ul")
    const li =document.createElement ("li")
    li.innerText=perro.nombre
    const liDuenio =document.createElement ("li")
    liDuenio.innerText =`Dueño: ${perro.duenio}`
    const liSexo = document.createElement("li")
    liSexo.innerText =`Sexo: ${perro.sexo}`
    const liAnio = document.createElement ("li")
    liAnio.innerText =`Año de nacimiento: ${perro.anio}`
    const liTelefono =document.createElement ("li")
    liTelefono.innerText =`Telefono: ${perro.telefono}`
    //PASEO PERRO SUMA//
    const masPaseo =document.createElement ("button")
    masPaseo.innerHTML = `Sumar un Paseo a ${perro.nombre}`
    masPaseo.id = "masPaseo"
    masPaseo.addEventListener("click", () => {
    /*const perro = jauria[0];*/
    let perrosAgregados = [];
    const perrosStorageJSON = localStorage.getItem("jauria");
    if(perrosStorageJSON) {
        perrosAgregados = JSON.parse(perrosStorageJSON);
    }
    const indexArray = perrosAgregados.findIndex( (elemento) => {
        return elemento.nombre == perro.nombre;
    });
    if(indexArray === -1) { 
        perro.cantidad = 1;
        perrosAgregados.push(perro);
    } else { 
        const perroEncontrado = perrosAgregados[indexArray];
        perroEncontrado.cantidad++;
        perrosAgregados[indexArray] = perroEncontrado;
    }
    localStorage.setItem("jauria", JSON.stringify(perrosAgregados));
    });


    //PASEO PERRO RESTA//
    const restarPaseo =document.createElement ("button")
    restarPaseo.innerHTML = `Quitar un Paseo a ${perro.nombre}`
    restarPaseo.id = "restarPaseo"
    restarPaseo.addEventListener("click", () => {
        let perrosAgregados =[];
        const perrosStorageJSON = localStorage.getItem("jauria");
        if(perrosStorageJSON) {
            perrosAgregados = JSON.parse(perrosStorageJSON);
        }
        const indexArray = perrosAgregados.findIndex( (elemento) => {
            return elemento.nombre == perro.nombre;
        });
        if(indexArray !== -1) { 
            const perroEncontrado = perrosAgregados[indexArray];
            perroEncontrado.cantidad--;
            
        }
        localStorage.setItem("jauria", JSON.stringify(perrosAgregados));
    });
    ul.append(li,liDuenio,liSexo,liAnio,liTelefono)
    contenedor.append(ul)
    contenedor.append(masPaseo)
    contenedor.append(restarPaseo)
}

//ULTIMO PERRO INGRESADO//
let ultimoPerros = document.getElementById ("ultimoPerros")
ultimoPerros.addEventListener("click", ()=>{    
    if (jauria.length > 0){
        let perro = jauria.pop()
        agregarListaAlHTML(perro)
    }else {
        //Toastify//
        Toastify({
            text: "Ese fue el ultimo",
            duration: 3000
            }).showToast();
    }
}
)

//BUSCADOR//
let input = document.getElementById ("input-1")
input.addEventListener("input", ()=>{
    let valor = input.value
    let perroBuscado = jauria.filter((perro) =>{
        return perro.nombre.includes(valor)
    })
    contenedor.innerHTML= ""
    if(perroBuscado.length > 0){
        perroBuscado.forEach((perro)=>{
            agregarListaAlHTML(perro)
        })
    }
}
)

const contenedor1 = document.getElementById("contenedor1") 
const ul = document.getElementById("ul")  
fetch("/gatos.json")
    .then( (response) => {
        return response.json();
    }).then( (gatos) => {
    console.log(gatos);
});

const obtenerGatos = async () => {
    const responseGatos = await fetch("https://pokeapi.co/api/v2/pokemon");
    const gatos = await responseGatos.json();
    gatos.results.forEach( (gato) => {
        const li = document.createElement("li");
        li.innerText = gato.name;
        ul.append(li);
    });
};

obtenerGatos();


/*
localStorage.clear()
*/