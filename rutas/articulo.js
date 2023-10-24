
const {crear, listar, uno, eliminar, actualizar, subir, imagen, buscador} = require('../controladores/articulo')
const express = require('express')
const router = express.Router()
const multer = require('multer')


//Multer

const almacenamiento = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './images/articulos')
    },
    filename: function (req, file, cb){
        cb(null, "articulo"+Date.now() + file.originalname);
    }
})

const subidas = multer({storage: almacenamiento})


//ruta de verdad
router.post('/crear', crear)
router.get('/articulos/:cantidad?', listar)
router.get('/articulo/:id', uno)
router.delete('/articulo/eliminar/:id', eliminar)
router.put('/articulo/:id', actualizar)
router.put('/subir-imagen/:id', [subidas.single("file0")], subir)
router.get('/imagen/:fichero', imagen)
router.get('/buscar/:busqueda', buscador)

module.exports = router
