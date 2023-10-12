//conexion
const { conexion } = require("./baseDatos/conexion")
const express = require('express')
var cors = require('cors')
const articulosRutas = require('./rutas/articulo')

const app = express()

//configurar midlewares (antes de cada ruta)
app.use(cors())
//convertir body a objeto js
app.use(express.json())
//pasar a objeto json
app.use(express.urlencoded({extended: true})) //por form url-encoded


//cargando las rutas
app.use("/api", articulosRutas)



//servidor
const port = 3000

app.listen(port,()=>{
    console.log(`La aplicacion corre en el puerto, ${port}`)
})


conexion()




