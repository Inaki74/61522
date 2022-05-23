// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
// throw new Error('error');

// pierdo atributos y métodos de la clase Error de JavaScript.
// throw 'error';

try{
    throw new Error('error!');
}
catch(e){
    console.log(e.message);
    console.log(e.toString());
}

function get_status(e){
    return e instanceof HttpError? e.status: 500;
}

const data = process.argv[2];
const HttpError = require('./http-error');
try{
    if('http' == data){
        const bad_request = 400;
        throw new HttpError('http error...', bad_request);
    }
    else{
        throw new Error('otro error...');
    }
    
}
catch(e){
    console.log('status', get_status(e));
    console.log('message', e.toString());
    console.log(e.name);
}
finally{
    console.log('siempre se ejecuta...');
}