/**
 * ARCHIVO QUE CONTIENE TODA LA GESTION DE
 * PAGINA pages\contacto.html
 */

window.onload = function(){
    iniciaPaginaContacto();
}

function iniciaPaginaContacto(){
    const btnEnviarConsulta = document.getElementById("btnEnviarConsulta");
    btnEnviarConsulta.addEventListener("click",clickBtnEnviarConsulta);

}//iniciaPaginaContacto()

function enviarConsulta(){

    const txtNombre   = document.getElementById("txtNombre");
    const txtApellido = document.getElementById("txtApellido");
    const txtEmail    = document.getElementById("txtEmail");
    const txtFono     = document.getElementById("txtFono");
    const slcMotivo   = document.getElementById("slcMotivo");
    const txtConsulta = document.getElementById("txtConsulta");
    
    //validaNoVacio
        // txtNombre
        if( !validaNoVacio(txtNombre.value) ){
            alert("Debes completar tu nombre");
            return false;
        }
        // txtApellido
        if( !validaNoVacio(txtApellido.value) ){
            alert("Debes completar tu Apellido");
            return false;
        }
        // txtEmail
        if( !validaNoVacio(txtEmail.value) ){
            alert("Debes completar tu Email");
            return false;
        }
        // txtFono    
        if( !validaNoVacio(txtFono.value) ){
            alert("Debes completar tu Fono");
            return false;
        }
        // slcMotivo
        if( !validaNoVacio(slcMotivo.value) ){
            alert("Debes indicar Motivo consulta");
            return false;
        }
        // txtConsulta
        if( !validaNoVacio(txtConsulta.value) ){
            alert("Debes completar tu Consulta");
            return false;
        }

    //validaTelefono
        if(!validaTelefono(txtFono.value) ){
            alert("Tu Fono no tiene formato correcto");
            return false;
        }
    //validaEmail
        if(!validaEmail(txtEmail.value) ){
            alert("Tu Email no tiene formato correcto");
            return false;
        }
    
        alert("Su consulta se ha enviado.\nTe responderemos dentro de pronto")
        return false; //solo para prevenir envio
} //enviarConsulta

/**
 * listener de boton enviar consulta
 * @param {event} event evento
 */
function clickBtnEnviarConsulta(event){
    event.preventDefault();    
    enviarConsulta();
}