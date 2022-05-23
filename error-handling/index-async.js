// https://developer.mozilla.org/en-US/docs/Glossary/IIFE
((mensaje) => {
    try{
        setTimeout(() => {
            throw new Error(mensaje);
        }, 1000);
    }  
    catch(e){
        console.log(e.message);
    }  
})('un error...');



const HttpError = require('./http-error');
(async (mensaje) => {
    await timeout(mensaje, 1000).then(respuesta => console.log(respuesta)).catch(e => console.log(e.message, e.status));
})('un error con promise...');

function timeout(mensaje, type, ms){
    return new Promise((resolve, reject) => {
        if (type == 'success'){
            setTimeout(resolve(mensaje), ms);
        }
        else{
            setTimeout(reject(new HttpError(mensaje, 400)), ms);
        }
    });
}
