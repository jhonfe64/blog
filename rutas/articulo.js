
const {crear, listar, uno, eliminar, actualizar} = require('../controladores/articulo')
const express = require('express')
const router = express.Router()

//ruta de verdad
router.post('/crear', crear)
router.get('/articulos/:cantidad?', listar)
router.get('/articulo/:id', uno)
router.delete('/articulo/eliminar/:id', eliminar)
router.put('/articulo/:id', actualizar)

module.exports = router
