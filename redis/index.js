//redis-server => inicia servidor redis por defecto en Port: 6379.
//redis-cli => comandos redis para queries en bd.
//por ej. setear clave/valor 

//Comandos básicos
// https://redis.io/commands

// >> SET name juan
// >> GET name
// >> DEL name, => GET name => (nil)
// >> EXISTS name => (integer 0) falso.

// >> SET name juan
// >> KEYS [pattern], => KEYS * => "name"
// >> FLUSHALL => GET name => (nil)

//todos los datos que se graban, los trata como string.
// >> SET numero 2
// >> GET numero 
// >> "2"

//Listas LPUSH/RPUSH
//-------------------------
// >> LPUSH contactos mario
// >> GET contactos => Error, GET solo sirve para acceder datos escalares(strings).
// >> lrange contactos 0 -1 
// >> 1) "mario"

// >> LPUSH contactos ana
// >> lrange contactos 0 -1 
// >> 1) "mario"
// >> 2) "ana"

//Puedo acceder a la lista como stack (LIFO) o queue (FIFO) (LPOP, RPOP)
// >> RPOP contactos
// >> lrange contactos 0 -1 
// >> 1) "ana"

//Sets similar a set de javascript, valores unique.
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

//-------------------------
// >> SADD contactos2 mario
// >> (integer) 1
// >> SADD contactos2 mario
// >> (integer) 0 => no lo agrega.
// >> SMEMBERS contactos2
// >> 1) "mario"

// >> SREM contactos2 mario
// >> SMEMBERS contactos2
// >> (empty array)

//hashes también clave/valor similar objetos javascript.
//-------------------------
// >> HSET persona nombre mario
// >> HSET persona edad 40

// >> HGETALL persona
// >> 1) "nombre"
// >> 2) "mario"
// >> 3) "edad"
// >> 4) "40"

// >> HGET persona nombre
// >> mario

// >> HDEL persona nombre
// >> HEXISTS persona nombre
// >> (integer) 0