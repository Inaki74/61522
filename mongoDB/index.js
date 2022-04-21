//mongod --dbpath "./data/db" => iniciar servidor en directorio local creado previamente. Por defecto conecta en Win C:/data/db en Mac /data/db.
//mongo "mongodb://127.0.0.1:27017/mydb" => iniciar mongo shell (CLI).

//Ejemplos comandos básicos
//https://www.mongodb.com/docs/manual/reference/command/

// CLI
// >> db
// >> mydb
// >> db.peliculas.insertOne({titulo:"Black Rain", anio:1989 });
// >> db.peliculas.insertOne({titulo:"Taxi Driver", anio:1976});
// >> db.peliculas.insertOne({titulo:"Lethal Weapon 2", anio:1989, genero:"ACCION"});
// >> db.getCollection("peliculas").find({anio:1989});

// UI https://www.mongodb.com/products/compass
// Mongo Cloud https://www.mongodb.com/atlas/database

// https://www.npmjs.com/package/mongodb
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/mydb";
const client = new MongoClient(uri);
async function run() {
    await client.connect();
    const database = client.db("mydb");
    const peliculas = database.collection("peliculas");
    // crear un documento.
    const doc = {
        titulo: "Taxi Driver",
        anio: 1976,
    }
    // insertar documento en colección de películas.
    const result = await peliculas.insertOne(doc);
    
    const documentos = await peliculas.find({}).toArray();
    documentos.forEach(documento => {
        console.log(documento); 
    });

    //recordar que cualquier retorno de una funcion async siempre crear una Promise.
    return `Se ha creado documento con _id: ${result.insertedId}!`;
}

run() 
    .then((done) => console.log(done))
    .catch((err) => console.log(err) )
    .finally(() => client.close());