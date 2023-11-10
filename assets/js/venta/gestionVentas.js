window.onload=function(){
    
    let hayItemsVenta = mostrarTablaVenta();
    const btnRealizarVenta = document.querySelector("#btnRealizarVenta");
    
    //agregar evento a boton realizar venta
    btnRealizarVenta.addEventListener("click",realizarVenta)
}
