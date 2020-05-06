const express = require('express')
const router = express.Router()

const reparacion = require('../controladores/reparacion.controlador')


router.get('/', reparacion.getReparaciones)

router.get('/:id', reparacion.getReparacion)

router.post('/', reparacion.crearReparacion)

router.put('/:id', reparacion.editarReparacion)

router.delete('/:id', reparacion.eliminarReparacion)

module.exports = router