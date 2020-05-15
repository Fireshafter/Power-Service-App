const express = require('express')
const router = express.Router()

const componente = require('../controladores/componente.controlador')


router.get('/', componente.getComponentes)

router.post('/', componente.crearComponente)

module.exports = router