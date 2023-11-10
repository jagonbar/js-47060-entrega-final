/**
 * clase para traer html dinamico
 */
import {retornaResultado} from "./response.js"
export {retornaResultado}
  
// obtiene html desde templates
export async function getTemplateBase(url){
    let response = await fetch(url);  
    let textoResultado='';
    if(response.ok){
        textoResultado = await response.text();
    }
    console.log({textoResultado});
    return retornaResultado(
        response.ok,
        textoResultado
        )
        
        
    }
    // reemplaza palabras de template
    export async function getTemplate(url, data){
        
        let {ok,textoResultado:html} = await getTemplateBase(url);    
        if(!ok){
            return retornaResultado(ok,"");
        }    
        
        if(data!==null && data!==undefined){
            for(let dato of data){            
                html = html.replace(dato.tag, dato.valor);                
            }
        }
        console.log({html});
        return retornaResultado(true,html);        
}