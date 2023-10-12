
const {crear, listar} = require('../controladores/articulo')
const express = require('express')
const router = express.Router()

//ruta de verdad
router.post('/crear', crear)
router.get('/articulos/:cantidad?', listar)

module.exports = router
