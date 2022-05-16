# Ejemplo JWT con clave pública/privada.

Servidor auth-server recibe usuario y password a autenticar.

Si autenticación correcta, firma payload con clave privada (private.key) y retorna token.

API peliculas para crear y listar peliculas requiere token de autenticación, si lo recibe en middleware (verify),
verifica el usuario con clave pública (public.key) y lo agrega a los documentos creados como su creador, por ej. cuando se crea una película.

## Generar par clave pública/privada
https://cryptotools.net/rsagen

## Flujo

### Crear usuario
```
POST localhost:3000/usuarios/ en auth-server
{
    "nombre":"juan",
    "apellido":"perez",
    "email":"juan@gmail.com",
    "password":"123"
}
```

### Autenticar usuario
```
POST localhost:3000/login/ en auth-server
{
    "usuario":"juan@gmail.com",
    "password":"123"
}
```

### Obtener token retornado
```
{
    "token": "eyJhbGciOiJSUzI1NiJ9.eyJfaWQiOiI2MjgyOGJiZTY5ZGM3YTRiOGM3NGU2NWMiLCJub21icmUiOiJqdWFuIiwiYXBlbGxpZG8iOiJwZXJleiIsImVtYWlsIjoianVhbkBnbWFpbC5jb20iLCJfX3YiOjB9.lzNQ2lKdexxvSiQv7dMzzBnAhbpr5qtkzW-8Ecv8Yn895PrQbj5koxiVfYWkw_OTmccfGPKMLi9RyQ3V1tZl4VIfRaSpAepe6gEc5Gw_TVS23hGCj67_nDc-ifWG1PM57Xfji6D6xJuS-Fp5aQuTPmAVfbHV5E2vG6VlwAtNGT8"
}
```

### Crear película
```
POST localhost:3001/peliculas/ en api peliculas
Header Authorization Bearer eyJhbGciOiJSUzI1NiJ9.eyJfaWQiOiI2MjgyOGJiZTY5ZGM3YTRiOGM3NGU2NWMiLCJub21icmUiOiJqdWFuIiwiYXBlbGxpZG8iOiJwZXJleiIsImVtYWlsIjoianVhbkBnbWFpbC5jb20iLCJfX3YiOjB9.lzNQ2lKdexxvSiQv7dMzzBnAhbpr5qtkzW-8Ecv8Yn895PrQbj5koxiVfYWkw_OTmccfGPKMLi9RyQ3V1tZl4VIfRaSpAepe6gEc5Gw_TVS23hGCj67_nDc-ifWG1PM57Xfji6D6xJuS-Fp5aQuTPmAVfbHV5E2vG6VlwAtNGT8
```
```
{
    "titulo":"peli 1",
    "anio":2005,
    "genero":"TERROR"
}
```

### Listar películas creadas 
```
GET localhost:3001/peliculas/ en api peliculas
Header Authorization Bearer eyJhbGciOiJSUzI1NiJ9.eyJfaWQiOiI2MjgyOGJiZTY5ZGM3YTRiOGM3NGU2NWMiLCJub21icmUiOiJqdWFuIiwiYXBlbGxpZG8iOiJwZXJleiIsImVtYWlsIjoianVhbkBnbWFpbC5jb20iLCJfX3YiOjB9.lzNQ2lKdexxvSiQv7dMzzBnAhbpr5qtkzW-8Ecv8Yn895PrQbj5koxiVfYWkw_OTmccfGPKMLi9RyQ3V1tZl4VIfRaSpAepe6gEc5Gw_TVS23hGCj67_nDc-ifWG1PM57Xfji6D6xJuS-Fp5aQuTPmAVfbHV5E2vG6VlwAtNGT8
```
```
[
    {
        "_id": "62828d24ec4cc65aaaba9871",
        "titulo": "peli 1",
        "anio": 2000,
        "genero": "TERROR",
        "creadaPor": {
            "nombre": "juan",
            "apellido": "perez",
            "email": "juan@gmail.com"
        },
        "creado": "2022-05-16T17:43:00.000Z",
        "__v": 0
    },
    {
        "_id": "62828d5bec4cc65aaaba9873",
        "titulo": "peli 2",
        "anio": 2005,
        "genero": "ACCION",
        "creadaPor": {
            "nombre": "juan",
            "apellido": "perez",
            "email": "juan@gmail.com"
        },
        "creado": "2022-05-16T17:43:55.000Z",
        "__v": 0
    }
]```

```
