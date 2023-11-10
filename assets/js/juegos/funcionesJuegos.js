/**
 * FUNCIONES DE 
 * PAGINA pages\juegos.html
 */
// import {templateJuego} from "./templateJuego.js"
// import {juegosDisponibles} from "./juegos.js"
import {agregarJuegoVenta} from "../venta/funcionesVenta.js"
import {getTemplate, retornaResultado, mensaje} from "/assets/js/_utilidades/mensaje.js"
import {
    validaNumeroInt,
    validaRango,
    validaNoVacio,
    validaTelefono,
    validaEmail,
    formateaMiles,
} from "/assets/js/validaciones/validaciones.js"

let juegosDisponibles=[];

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

    // console.table(juegosDisponibles);
    // let juegosDisponiblesResponse = await fetch("./assets")

    // let juegosDisponibles
    
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

        // console.log({dataJSON})

        let {ok,textoResultado:html} = await getTemplate("/assets/templates/templateJuego.html",dataJSON);
        console.log("en fj",{html})
        // html = html.replace("###DATA###"        , data);
        // html = html.replace("###ID###"          , juego.id);
        // html = html.replace("###NOMBRE_JUEGO###", juego.titulo);
        // html = html.replace("###PRECIO###"      , formateaMiles(juego.precio));
        // html = html.replace("###DESCRIPCION###" , juego.descripcion);
        // html = html.replace("###IMAGEN###"      , juego.imagen);
        if(ok){
            console.log(html);
            htmlJuegos.push(html);
        }
    }
    
    games__list.innerHTML =  htmlJuegos.length>0 ? htmlJuegos.join("") : "Seleccione plataforma para mostrar juegos." ;

    //02 - asociar eventos a tarjetas
    const linkAgregarJuegos = document.querySelectorAll(".link_agregar_juego");
    
    linkAgregarJuegos.forEach(function(linkJuego){
        // linkJuego.addEventListener("click",function(event){
            //     event.preventDefault();
            //     console.log(this)            
            // });
            linkJuego.addEventListener("click",clickLinkAgregarJuegos);
        });
}

/**
 * pide cantidad a vender entre 1 a 100
 * si numero está fuera de rango, se sigue preguntando
 * @returns cantidad
 */
export function pedirCantidad(){
    console.log("function pedirCantidad()")
    let cantidad;
    do{
        let data = [
            {"tag":"###MSG###"             , "valor": "ingresa cantidad"},
            {"tag":"###PLACEHOLDER###"     , "valor": "rango de 1 a 100"},
            {"tag":"###FUNCTION_OK###"     , "valor": `alert("OK")`},
            {"tag":"###OK_BTN###"          , "valor": "OK!!!!"},
            {"tag":"###FUNCTION_CANCEL###" , "valor": `alert("OK")`},
            {"tag":"###CANCEL_BTN###"      , "valor": `CANCELAR`},
        ]
        mensaje("info", "Ingresa Cantidad", "prompt", data);

        let cantidad= prompt("Indica cantidad a comprar (de 1 a 100) ");
        
        if(cantidad===null) {
            console.log("canceló prompt");
            return false;
            break;
        }//canceló prompt

        es_valido   = validaNumeroInt(cantidad) && validaRango(cantidad);
    }while(!es_valido)
    console.log("paso 1",cantidad)
    return parseInt(cantidad);
}

/**
 * accion de click agregar juego
 * @param {event} event 
 */

function clickLinkAgregarJuegos(event){
    event.preventDefault();
    console.log(this.dataset)
    

    let juego = {...this.dataset};
    console.log("click hecho a ",{juego});
    cantidad = pedirCantidad();
    console.log("paso 2")
    if(cantidad!==false){
        console.log("paso 3")
        //de assets/js/venta/gestionVentas.js
        agregarJuegoVenta(juego, cantidad);
    }
    
}