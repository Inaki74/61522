//Ejercicio: Fix de errores hasta mostrar mensaje del método log() por consola en el catch.
const LogError = require('./log-error');
try{
    throw new LogError('otro error log...');
}
catch(e){
    e.log().then(result => console.log(result)).catch(err => console.log(err.message));
}