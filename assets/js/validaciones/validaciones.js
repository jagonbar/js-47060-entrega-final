/**
 * valida si es un número entero válido
 * @param {string} valor 
 * @returns {boolean}
 */
function validaNumeroInt(valor) {
    console.log("function validaNumeroInt()")
    let es_entero = (parseInt(valor) === parseFloat(valor))

    let es_valido = (valor !== null) && (valor !== undefined) && (!isNaN(valor)) && es_entero;
    if (!es_valido) alert("Ingresa un número valido");
    return es_valido;
}

/**
 * retorna verdadero o falso si es que cantidad esta entre 1 y 100 o no.
 * @param {int} cantidad 
 * @returns {boolean}
 */
function validaRango(cantidad) {
    console.log("function validaRango()")
    let minimo = 1;
    let maximo = 100;
    let es_rango_valido = (minimo >= 0 && cantidad <= maximo);
    if (!es_rango_valido) alert("Cantidad debe ser un rango entre 1 y 100");
    return es_rango_valido;
}

/**
 * valida que valor no esté vacío
 * @param {string} valor 
 * @returns 
 */
function validaNoVacio(valor) {
    return valor !== undefined && valor !== undefined && valor !== ""
}

/**
 * revisa si telefono es valido
 * @param {string} valor telefono a validar
 * @returns {boolean}
 */
function validaTelefono(valor) {

    //por ahora solo celulares de chile
    const regexFono = new RegExp("^\\+?569?[0-9]{8}$", "gi");
    let valido = regexFono.test(valor);

    return valido;
}

/**
 * revisa si email es valido
 * @param {string} valor email a validar
 * @returns {boolean}
 */
function validaEmail(valor) {
    const regexEmail = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$", "gi");
    let valido = regexEmail.test(valor);
    return valido;
}

function formateaMiles(valor) {
    let es_entero = (parseInt(valor) === parseFloat(valor))
    let es_valido = (valor !== null) && (valor !== undefined) && (!isNaN(valor)) && es_entero;
    if (es_valido) {
        valor = parseInt(valor);
        return valor.toLocaleString("es-CL");
    }
    return 0;

}
export {
    validaNumeroInt,
    validaRango,
    validaNoVacio,
    validaTelefono,
    validaEmail,
    formateaMiles,
}