const express   = require('express');
const app       = express();

// https://mongoosejs.com/docs/
const mongoose  = require('mongoose');
const RestError = require('./routes/rest-error');
const pelicula     = require('./routes/pelicula');
const actor     = require('./routes/actor');
const director     = require('./routes/director');
const login     = require('./routes/login');

// https://www.npmjs.com/package/dotenv
require('dotenv').config();
const uri = process.env.MONGODB_URI;

// https://mongoosejs.com/docs/5.x/docs/deprecations.html
const options = {useNewUrlParser:true, useUnifiedTopology: true}; 

// Ejemplos de conexión

//Promise
mongoose.connect(uri, options).then(() => {
    console.log('Conectado a DB...');
}).catch(error => {
    console.log('Hubo un error de conexion', error.message);
});

mongoose.connect(uri, options).catch(error => {
    console.log('Hubo un error de conexion', error.message);
});

//Eventos
mongoose.connection.on('error', error => {
    console.log('Hubo un error de conexion', error.message);   
});

//Callback
/*
mongoose.connect(uri, options, function (error) {
    if(error){
        console.log('Hubo un error de conexión', error.message);
    }
}); 
*/

// npm install jsonwebtoken
const jwt = require('jsonwebtoken');
//creamos un middleware de express para verificar cada request.
const authorize = function(req, res, next){
    if ('/login' == req.path){ 
        next();
    }
    //recibimos el token enviado por header.
    const authHeader = req.headers['authorization']; 
    if(!authHeader){
        next(new RestError('unauthorized', 401));
    }
    //envio Authorization: Bearer 1234 
    const token = authHeader.split(' ')[1]; 
    if(!token){
        next(new RestError('unauthorized', 401));
    }
    //Creamos TOKEN_SECRET en archivo .env 
    //Para generar una clave aleatoria utilizamos módulo crypto de Node.js.
    //>>> node 
    //>>> require('crypto').randomBytes(64).toString('hex') 
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, usr){ 
        if(err){
            next(new RestError(err.message, 401));
        }
        else{
            //agregamos el usuario a instancia de request para tenerlo disponible en solicitudes subsiguientes. 
            //hasta aquí realizamos paso de autenticación, obteniendo el usuario puedo aplicar segundo paso que es la autorización.
            req.user = usr;
            next();
        }
    }); 
}

app.use(express.json());
app.use(authorize);
app.use(login);
app.use(pelicula);
app.use(actor);
app.use(director);

app.use((err,req ,res, next) => {
    res.status(err instanceof RestError? err.status: 500);
    res.json({error:err.message});
});

app.listen(process.env.PORT, function(){
    console.log(`Escuchando puerto ${process.env.PORT}`);
});