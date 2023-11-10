/**
 * RETORNA JSON DE VENTA DESDE LOCALSTORAGE... SINO ARREGLO VACIO
 * @returns {JSON}
 */
export function obtenerObjetoVenta(){
    console.log("obtenerObjetoVenta()")
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
    console.log("actualizarVenta()")
    ventaActual = JSON.stringify(ventaActual);
    localStorage.setItem("ventaActual",ventaActual);
}

/**
 * va a buscar carro de venta desde localstorage para
 * crear tabla resumen 
 * @param {*} ventaActual 
 * @returns {boolean} si hay o no items
 */
export function mostrarTablaVenta(){
    console.log("mostrarTablaVenta()")
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
    for(item of ventaActual){
        numero++;
        
        let htmlItem = templateVentaItem;
        
        let datasetEliminar = `data-id=${item.id} data-titulo="${item.titulo}"`;
        htmlItem = htmlItem.replace("###ELIMINAR###",datasetEliminar)
        htmlItem = htmlItem.replace("###NUMERO###"  ,numero)
        htmlItem = htmlItem.replace("###TITULO###"  ,item.titulo)
        htmlItem = htmlItem.replace("###PRECIO###"  , formateaMiles(item.precio))
        htmlItem = htmlItem.replace("###CANTIDAD###", formateaMiles(item.cantidad))
        htmlItem = htmlItem.replace("###TOTAL###"   , formateaMiles(item.precio*item.cantidad))

        cantidadFinal += item.cantidad; 
        totalFinal    += item.precio*item.cantidad;
        htmlVenta.push(htmlItem);
    }
    
    htmlTablaVenta = templateVentaCompleta.replace("###ITEMS###"  ,htmlVenta.join(""));
    htmlTablaVenta = htmlTablaVenta.replace("###CANTIDAD_FINAL###",formateaMiles(cantidadFinal))
    htmlTablaVenta = htmlTablaVenta.replace("###TOTAL_FINAL###"   ,formateaMiles(totalFinal))
    resumenVenta.innerHTML = htmlTablaVenta;
    
    //agregar eventos a linkEliminarJuego
    const linksEliminarJuego = document.querySelectorAll(".linkEliminarJuego")
    for(link of linksEliminarJuego){
        link.addEventListener("click",clickLinkEliminarJuego)
    }
    
    return true;
}
export function clickLinkEliminarJuego(event){
    console.log("clickLinkEliminarJuego()")
    event.preventDefault()

    let titulo = this.dataset.titulo;
    if(confirm(`Quieres eliminar la venta de juego ${titulo} `)){
        let id = this.dataset.id;
        console.log({id})
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
    console.log("paso 4")
    if(!cantidad) return;
    console.log("paso 5")
    console.log("agregarJuegoVenta()")
    let ventaActual = obtenerObjetoVenta();

    let indexJuego = ventaActual.findIndex(item=>item.id===juego.id);
        
    if(indexJuego==-1) {
        alert(`Agregado juego a la venta.\nNumero de copias: ${cantidad}`);
        ventaActual.push({...juego,cantidad});
    }else{
        alert(`Se ha actualizado cantidad a comprar a ${cantidad} items`);
        ventaActual[indexJuego]["cantidad"]= cantidad;
    }     
    actualizarVenta(ventaActual);
}


/**
 * saca producto de la venta, dejandolo al final para eliminarlo con pop
 * @param {*} id 
 */
export function sacarProductoDeVenta(id){    
    console.log("sacarProductoDeVenta()")

    const ventaActual = obtenerObjetoVenta();
    const indice      = ventaActual.findIndex(item => item.id === id);
    console.log({indice})
    if (indice !== -1) {
        ventaActual.splice(indice, 1);
        actualizarVenta(ventaActual);
    }
}

export function realizarVenta(){
    alert("compra realizada!!")
    console.log("se borra storage para nuevo ejercicio")
    localStorage.clear();
    mostrarTablaVenta()
}
