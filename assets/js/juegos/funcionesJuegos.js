/**
 * FUNCIONES DE 
 * PAGINA pages\juegos.html
 */
// import {templateJuego} from "./templateJuego.js"
// import {juegosDisponibles} from "./juegos.js"
// import { mensaje } from "../_utilidades/mensaje.js";
import {agregarJuegoVenta} from "../venta/funcionesVenta.js"
import {getTemplate,mensajeClear} from "/assets/js/_utilidades/mensaje.js"
import {
    validaNumeroInt,
    validaRango,
    formateaMiles,
} from "/assets/js/validaciones/validaciones.js"

let juegosDisponibles=[];
/**
 * ir a buscar datos a "base de datos" (JSON)
 */
async function cargarJuegos(){
    let resp = await fetch("/assets/data/juegos.json");
    if(resp.ok){
        juegosDisponibles = await resp.json();
    }
}

/**
 * dibuja las tarjetas de cada juego
 * @param {*} plataformas 
 */
export async function inicioPaginaJuegos(plataformas) {

    await cargarJuegos();
    
    const games__list = document.querySelector(".games__list");
    const htmlJuegos = [];
    let i=0;
    //01 dibujar tarjetas por cada juego
    for (let juego of juegosDisponibles) {
        
        // solo mostrar juegos de plataformas pedidas
        if(plataformas.indexOf(juego.plataforma)==-1) continue;

        ++i;        
        // let html = templateJuego; // de templateJuego.js
        let data = "";
        let dataJSON=[];
        Object.keys(juego).forEach(function(valor){
            data+= `data-${valor}="${juego[valor]}" `;            
        });        
        
        dataJSON.push({"tag":"###DATA###"        ,"valor": data});
        dataJSON.push({"tag":"###ID###"          ,"valor": juego.id});
        dataJSON.push({"tag":"###NOMBRE_JUEGO###","valor": juego.titulo});
        dataJSON.push({"tag":"###PRECIO###"      ,"valor": formateaMiles(juego.precio)});
        dataJSON.push({"tag":"###DESCRIPCION###" ,"valor": juego.descripcion});
        dataJSON.push({"tag":"###IMAGEN###"      ,"valor": juego.imagen});        
        console.log({dataJSON})

        let {ok,textoResultado:html} = await getTemplate("/assets/templates/templateJuego.html",dataJSON);

        if(ok){

            htmlJuegos.push(html);
        }
    }
    
    games__list.innerHTML =  htmlJuegos.length>0 ? htmlJuegos.join("") : "Seleccione plataforma para mostrar juegos." ;

    //02 - asociar eventos a tarjetas
    const linkAgregarJuegos = document.querySelectorAll(".link_agregar_juego");
    
    linkAgregarJuegos.forEach(function(linkJuego){

            linkJuego.addEventListener("click",clickLinkAgregarJuegos);
        });

    //03 - botones form modal
    let btnModalAgregar  = document.getElementById("btnModalAgregar")
    let btnModalCancelar = document.getElementById("btnModalCancelar")
        
    btnModalAgregar.addEventListener("click",clickBtnModalAgregar);

    btnModalCancelar.addEventListener("click",clickbtnModalCancelar);  
}

/**
 * pide cantidad a vender entre 1 a 100
 * si numero está fuera de rango, se sigue preguntando
 * @returns cantidad
 */
export function revisarCantidad(){
    console.log("function revisarCantidad()")
    
    let cantidad = document.getElementById("cantidadComprar").value;      
    
    let es_valido   = validaNumeroInt(cantidad) && validaRango(cantidad);
    
    return (es_valido)?parseInt(cantidad):false;
        
}
function mostrarModal(mostrar){
    let visibility = (mostrar===true)?"visible":"hidden";

    let modals = document.querySelectorAll(".modal")
    for(let m of modals){
        m.style.visibility = visibility;
    }
    if(mostrar){
        document.getElementById("cantidadComprar").value = "";
    }
}
/**
 * accion de click agregar juego
 * @param {event} event 
 */

function clickLinkAgregarJuegos(event){
    event.preventDefault();
    console.log("clickeado",this);
    //obtener juego seleccionado
    document.getElementById("idJuego").value = this.id;

    mostrarModal(true);          
}
/**
 * agregar cantidad a comprar. Si ya esta se actualiza cantidad
 * @returns 
 */
function clickBtnModalAgregar(){
    
    let cantidad = revisarCantidad();
    
    if(!cantidad) return; //si cantidad no es válida corta ejecución

    let idJuego = document.getElementById("idJuego").value
    let dataset = document.getElementById(idJuego).dataset
    let juego   = {...dataset};    

    //de assets/js/venta/gestionVentas.js
    agregarJuegoVenta(juego, cantidad);
}
/**
 * ocultar modal
 */
function clickbtnModalCancelar(){
    mostrarModal(false);
    mensajeClear();
}