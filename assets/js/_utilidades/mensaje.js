import {getTemplateBase,getTemplate,retornaResultado} from "./templateClass.js";
import "/assets/js/_jquery/jquery.min.js";
import "/assets/js/_toastr/toastr.min.js";

const rutaTemplates = "/assets/js/_utilidades/templates/"

const templates = {
    "prompt": rutaTemplates + "templatePrompt.html",
}
function mensajeClear(){
    toastr.clear()
}
function mensaje(tipo, titulo, msg, options={}){
    mensajeClear()
    console.log("-->function mensaje")
    toastr.options = options;
    
    // toastr.options["positionClass"]="toast-top-left";
    toastr.options["positionClass"]="toast-top-full-width";
    

    toastr.options["closeButton"]  =true;
    toastr.options["progressBar"]  =true;
    msg =`<div style="font-size:2.5rem;font-family:Console,monospace">${msg}</div>`
    titulo =`<div style="font-size:2rem;font-family:Console,monospace;text-decoration:underline">${titulo}</div>`
    toastr[tipo](msg, titulo);
}

function mensajePrompt(){
    let options={
        "timeOut":0,
        "extendedTimeOut":0,
        "tapToDismiss":false
    }
    let msg= `<div class="prompt">
        <div class="prompt__question">
            <label for="prompt__msg">
                <p>
                    ###MSG###
                </p>
                <input type="text" name="prompt__input" id="prompt__input" placeholder="###PLACEHOLDER###">
            </label>
        </div>
        <div class="prompt__buttons">
            <button class="prompt_button" id="prompt_ok" onclick='###FUNCTION_OK###'>
                <i class="fa fa-check" aria-hidden="true"></i> ###OK_BTN###
            </button>
            <button class="prompt_button" id="prompt_cancel" onclick='###FUNCTION_CANCEL###'>
                <i class="fa fa-times" aria-hidden="true"></i> ###CANCEL_BTN###
            </button>
        </div>
    </div>`
    let mitoast = toastr["info"](msg, "titulo");
    mitoast.delegate(
        ".prompt_button","click",function(){alert("asdf"),mitoast.remove()}
    )
}

/**
 * 
 * @param {Array} tipo = success|info|warning|error
 * @param {*} titulo 
 * @param {*} template 
 * @param {*} dataMensaje 
 */
async function mensajeTemplate(tipo, titulo, template = "", data, options) {
    // toastr.options.progressBar = true;
    
    let ok,html="";
    
    if (template !== "" && templates.hasOwnProperty(template)) {
        
        ({ok,textoResultado:html} = await getTemplate(templates[template], data));

        if(ok){            
            if(template=="prompt"){
                options["timeOut"]=0;
                options["extendedTimeOut"]=0;
                options["tapToDismiss"]=false;
                options["closeButton"]=false;
            }            
            mensaje(tipo, titulo, html, options);
            return; // para terminar ejecución
        }
    }

    //opcion no encuentra template
    toastr[tipo](data, titulo);
    mensaje(tipo, titulo, data, options);    
}

//re-exportar
export {getTemplateBase, getTemplate, retornaResultado, mensaje, mensajeTemplate, mensajePrompt ,mensajeClear} //para no tener que importar  adicionales a este archivo

// ###MSG###
// ###PLACEHOLDER###
// ###OK_BTN###
// ###FUNCTION_OK###
// ###CANCEL_BTN###
// ###FUNCTION_CANCEL###