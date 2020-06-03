const express = require('express')
const router = express.Router()

const factura = require('../controladores/factura.controlador')


router.get('/', factura.getFacturas)

router.get('/main', factura.getMainFacturas)

router.get('/size', factura.getFacturasCount)

router.get('/:id', factura.getFactura)

router.post('/', factura.crearFactura)

router.put('/:id', factura.editarFactura)

router.delete('/:id', factura.eliminarFactura)

module.exports = router