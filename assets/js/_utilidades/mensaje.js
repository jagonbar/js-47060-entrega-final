import {getTemplateBase,getTemplate,retornaResultado} from "./templateClass.js";
// import $ from "/assets/js/_jquery/jquery.min.js";
// import { toast } from "/assets/js/_toastr/toast.min.js";
import "/assets/js/_toastr/toastr.min.js";        
import "/assets/js/_jquery/jquery.min.js";

const rutaTemplates = "/assets/_utilidades/templates/"

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
async function mensaje(tipo, titulo, template = "", dataMensaje) {
    toastr.options.progressBar = true;

    if (template !== "" && templates.hasOwnProperty(template)) {
        let html = await getTemplate(templates[template], data);        
        toast[tipo](html, titulo);
    }else{
        toast[tipo](data, titulo);
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