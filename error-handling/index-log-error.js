//Ejercicio: Fix de errores hasta mostrar mensaje retornado por método log() en consola en el catch.
const LogError = require('./log-error');
try{
    throw new LogError('otro error log...');
}
catch(e){
    console.log(e.log());
}