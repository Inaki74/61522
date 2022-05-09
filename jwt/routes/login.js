const mongoose  = require('mongoose');
const express   = require('express');
const Router    = express.Router()
const RestError = require('./rest-error');

//incluimos módulo crypto de Node.js. 
const crypto = require('crypto'); 
//incluimos módulo jwt.
const jwt = require('jsonwebtoken'); 
const conn = mongoose.connection;

Router.post('/login', function(req, res, next){ 
    const usr = req.body.usr;
    let pwd = req.body.pwd;
    
    if(!usr){
        next(new RestError('usr requerido para continuar', 400));    
    }
    if(!pwd){
        next(new RestError('pwd requerido para continuar', 400));     
    }
    //encriptamos pwd.
    pwd = crypto.createHash('sha256').update(pwd).digest('hex'); 
    //hacemos un find por usuario y pwd encriptado, aquí consultamos directamente colección usuarios creados a mano.
    //en vez de esto, los usuarios serían schemas mongoose y tienen un router con método http post para registrarse.
    conn.db.collection('usuarios', function (err, collection) {
        collection.findOne({usr:usr, pwd:pwd}, function(err, doc){ 
            if(doc){
                //enviamos info de usuario autenticado menos pwd. doc.pwd = undefined;
                //payload: datos utilizados para generar token. 
                const token = jwt.sign(doc.usr, process.env.TOKEN_SECRET);
                //enviamos token generado con los datos de usuario. 
                doc.token = token;
                res.json({usr:doc});
            } 
            else{
                next(new RestError('usr o pwd no válidos', 401));
            }
        }); 
    });
   
});

module.exports = Router