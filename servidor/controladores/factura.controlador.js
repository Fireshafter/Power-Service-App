const Factura = require('../modelos/factura')

const facturaCtrl = {};

facturaCtrl.getFacturas = async (req, res) => {
    const facturas = await Factura.find()
    res.json(facturas)
}

facturaCtrl.getFactura = async (req, res) => {
    const factura = await Factura.findById(req.params.id)
    res.json(factura)
}

facturaCtrl.crearFactura = async (req, res) => {
    const factura = new Factura(req.body)
    await factura.save()
    res.json({_id: factura._id})
}

facturaCtrl.editarFactura = async (req, res) => {
    await Factura.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: false})
    res.json({estado: 'editado'})
}

facturaCtrl.eliminarFactura = async (req, res) => {
    await Factura.findByIdAndRemove(req.params.id)
    res.json({status: 'factura eliminada'})
}

module.exports = facturaCtrl