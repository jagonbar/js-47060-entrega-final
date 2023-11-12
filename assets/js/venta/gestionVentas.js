import { mensaje } from "/assets/js/_utilidades/mensaje.js";
import { mostrarTablaVenta, realizarVenta } from "./funcionesVenta.js";
window.onload= function(){
    
    mostrarTablaVenta()
        .then((hayItemsVenta)=>{
                if(!hayItemsVenta) {
                    mensaje("warning", "Sin items.", "No hay juegos agregados al carrito. Agrega algunos en menú \"Juegos\" ");
                    return false; 
                }

                mensaje("info", ``, "Haz clic en realizar compra para finalizar" );    

                const btnRealizarVenta = document.querySelector("#btnRealizarVenta");
                
                //agregar evento a boton realizar venta
                btnRealizarVenta.addEventListener("click",realizarVenta)        
        })
        .catch((response)=>console.log)
}
