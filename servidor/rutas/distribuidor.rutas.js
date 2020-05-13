const express = require('express')
const router = express.Router()

const distribuidor = require('../controladores/distribuidor.controlador')


router.get('/', distribuidor.getDistribuidores)

router.post('/', distribuidor.crearDistribuidor)

module.exports = router