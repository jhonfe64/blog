
const {crear, listar, uno} = require('../controladores/articulo')
const express = require('express')
const router = express.Router()

//ruta de verdad
router.post('/crear', crear)
router.get('/articulos/:cantidad?', listar)
router.get('/articulo/:id', uno)

module.exports = router
