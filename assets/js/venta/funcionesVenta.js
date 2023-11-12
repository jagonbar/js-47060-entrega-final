import { mensaje, getTemplate } from "/assets/js/_utilidades/mensaje.js";
import { formateaMiles } from "/assets/js/validaciones/validaciones.js";

/**
 * RETORNA JSON DE VENTA DESDE LOCALSTORAGE... SINO ARREGLO VACIO
 * @returns {JSON}
 */
export function obtenerObjetoVenta(){    
    let objetoVenta = JSON.parse(localStorage.getItem("ventaActual")) ?? [];
    
    //antes de retornar se ordena
    objetoVenta.sort((a,b)=>{
        return (a.titulo.toUpperCase()>b.titulo.toUpperCase())?1:-1;
    })    
    return objetoVenta;
}

/**
 * ACTUALIZAR LOCALSTORAGE DE VENTA
 * @param {*} ventaActual 
 */
export function actualizarVenta(ventaActual){

    ventaActual = JSON.stringify(ventaActual);
    localStorage.setItem("ventaActual",ventaActual);
}

/**
 * va a buscar carro de venta desde localstorage para
 * crear tabla resumen 
 * @param {*} ventaActual 
 * @returns {boolean} si hay o no items
 */
export async function mostrarTablaVenta(){

    const resumenVenta = document.querySelector("#resumenVenta");
    const botonesVenta = document.querySelector("#botonesVenta");
    
    
    botonesVenta.style.visibility="hidden"


    const ventaActual  = obtenerObjetoVenta();
    let htmlVenta =[];
    if(ventaActual.length==0){
        resumenVenta.innerHTML=`<div style="background:white">No hay productos en carro de compras.\nVe a juegos para agregar alguno.</div>`

        return false;
    }


    botonesVenta.style.visibility="visible"
    
    let numero        = 0 
    let cantidadFinal = 0
    let totalFinal    = 0
    for(let item of ventaActual){
        numero++;
                                
        let datasetEliminar = `data-id=${item.id} data-titulo="${item.titulo}"`;

        let dataJSON=[
             {"tag":"###ELIMINAR###" , "valor": datasetEliminar}
            ,{"tag":"###NUMERO###"   , "valor": numero}
            ,{"tag":"###TITULO###"   , "valor": item.titulo}
            ,{"tag":"###PRECIO###"   , "valor":  formateaMiles(item.precio)}
            ,{"tag":"###CANTIDAD###" , "valor":  formateaMiles(item.cantidad)}
            ,{"tag":"###TOTAL###"    , "valor":  formateaMiles(item.precio*item.cantidad)}
        ]
        let {ok,textoResultado:htmlItem} = await getTemplate("/assets/templates/templateVentaItem.html",dataJSON);
        cantidadFinal += item.cantidad; 
        totalFinal    += item.precio*item.cantidad;
        htmlVenta.push(htmlItem);
    }
    let dataJSON=[
          {"tag":"###ITEMS###"         , "valor": htmlVenta.join("")}
        , {"tag":"###CANTIDAD_FINAL###", "valor": formateaMiles(cantidadFinal)}
        , {"tag":"###TOTAL_FINAL###"   , "valor": formateaMiles(totalFinal)}
    ]
    let {ok,textoResultado:htmlTablaVenta} = await getTemplate("/assets/templates/templateVentaCompleta.html",dataJSON);     
    resumenVenta.innerHTML = htmlTablaVenta;
    
    //agregar eventos a linkEliminarJuego
    const linksEliminarJuego = document.querySelectorAll(".linkEliminarJuego")
    for(let link of linksEliminarJuego){
        link.addEventListener("click",clickLinkEliminarJuego)
    }
    
    return true;
}
export function clickLinkEliminarJuego(event){
    event.preventDefault()

    let titulo = this.dataset.titulo;
    if(confirm(`Quieres eliminar la venta de juego ${titulo} `)){
        let id = this.dataset.id;
        sacarProductoDeVenta(id);
        mostrarTablaVenta()

    }

}

/**
 * agrega juego a venta
 * @param {*} juego 
 * @param {*} cantidad 
 */
export function agregarJuegoVenta(juego, cantidad=1){

    
    if(!cantidad) return;

    
    let ventaActual = obtenerObjetoVenta();

    let indexJuego = ventaActual.findIndex(item=>item.id===juego.id);
        
    if(indexJuego==-1) {
        // alert(`Agregado juego a la venta.\nNumero de copias: ${cantidad}`);
        mensaje("info", 'Agregado', `Agregado juego a la venta.\nNumero de copias: ${cantidad}`);
        ventaActual.push({...juego,cantidad});
    }else{
        // alert(`Se ha actualizado cantidad a comprar a ${cantidad} items`);
        mensaje("warning", 'Actualizado', `Se ha actualizado cantidad a comprar a ${cantidad} items`);
        ventaActual[indexJuego]["cantidad"]= cantidad;
    }     
    actualizarVenta(ventaActual);
}


/**
 * saca producto de la venta, dejandolo al final para eliminarlo con pop
 * @param {*} id 
*/
export function sacarProductoDeVenta(id){    
    
    mensaje("warning", 'Eliminación', `Se ha descartado item`);
    
    const ventaActual = obtenerObjetoVenta();
    const indice      = ventaActual.findIndex(item => item.id === id);
    if (indice !== -1) {
        ventaActual.splice(indice, 1);
        actualizarVenta(ventaActual);
    }
}

export function realizarVenta(){
    // alert("compra realizada!!")
    mensaje("success", "", `COMPRA REALIZADA!!`,{"timeOut": "2000"});
    
    localStorage.clear();
    mostrarTablaVenta()
}
