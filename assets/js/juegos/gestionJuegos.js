// import "/assets/js/_jquery/jquery.min.js";
// import "/assets/js/_toastr/toastr.min.js";
import {inicioPaginaJuegos} from "./funcionesJuegos.js"
/**
 * ARCHIVO QUE CONTIENE TODA LA GESTION DE
 * PAGINA pages\juegos.html
 */

const plataformas = ["pc","playstation","switch","xbox"];

// verificar carga de página
window.onload = async function(){
    
    // console.log(toast)

    // toastr["info"]("gestion ","tidddtulo");
    //01 - al cargar pagina, dibujar todas las tarjetas de juegos
    await inicioPaginaJuegos(plataformas);    
    
    //02 - asociar eventos a checks de filtro
    const checksFiltro        = document.querySelectorAll(".checkFiltro");
    checksFiltro.forEach(function(checkFiltro){
        checkFiltro.addEventListener("change",clickcheckFiltro);
    });
};

/**
 * filtra tabla de juegos disponibles segun check seleccionados
 * @returns {}
 */
function clickcheckFiltro(){
    const checksFiltro        = document.querySelectorAll(".checkFiltro:checked");
    const checkSeleccion = [];
    
    //si no hay checks marcados, mostrar sección vacía
    if(checksFiltro.length==0){
        inicioPaginaJuegos([]);
        return;
    }
    
    for(check of checksFiltro){
        checkSeleccion.push(check.dataset.tipo);
    }
    inicioPaginaJuegos(checkSeleccion);
}