import {getTemplateBase,getTemplate,retornaResultado} from "./templateClass.js";
// import $ from "/assets/js/_jquery/jquery.min.js";
// import { toast } from "/assets/js/_toastr/toast.min.js";
import "/assets/js/_jquery/jquery.min.js";
import "/assets/js/_toastr/toastr.min.js";        

const rutaTemplates = "/assets/js/_utilidades/templates/"

const templates = {
    "prompt": rutaTemplates + "templatePrompt.html",
}

/**
 * 
 * @param {Array} tipo = success|info|warning|error
 * @param {*} titulo 
 * @param {*} template 
 * @param {*} dataMensaje 
 */
async function mensaje(tipo, titulo, template = "", data) {
    toastr.options.progressBar = true;
    let respuestaTemplate,ok,html="";

    if (template !== "" && templates.hasOwnProperty(template)) {
        respuestaTemplate = await getTemplate(templates[template], data);        
    }
    if(respuestaTemplate.hasOwnProperty("ok") && respuestaTemplate.ok){
        
        if(template=="prompt"){
            toastr.options.timeOut = 0;
            toastr.options.extendedTimeOut = 0;
        }
        toastr[tipo](respuestaTemplate.textoResultado, "");
    }else{
        toastr[tipo](data, titulo);
    }
}

//re-exportar
export {getTemplateBase, getTemplate, retornaResultado, mensaje } //para no tener que importar  adicionales a este archivo

// ###MSG###
// ###PLACEHOLDER###
// ###OK_BTN###
// ###FUNCTION_OK###
// ###CANCEL_BTN###
// ###FUNCTION_CANCEL###