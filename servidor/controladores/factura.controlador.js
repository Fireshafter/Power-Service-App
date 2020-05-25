const Factura = require('../modelos/factura')

const facturaCtrl = {};

facturaCtrl.getFacturas = async (req, res) => {
    let distribuidoresStr = req.query.distribuidores
    let facturas = null

    if(distribuidoresStr != 'undefined'){
        let distribuidores = distribuidoresStr.split(',')
        facturas = await Factura.find({distribuidor: {$in: distribuidores}}).sort({fecha: -1}).skip(Number(req.query.pag) * Number(req.query.pagsize)).limit(Number(req.query.pagsize))
    }
    else{
        facturas = await Factura.find().sort({fecha: -1}).skip(Number(req.query.pag) * Number(req.query.pagsize)).limit(Number(req.query.pagsize))
    }

    res.json(facturas)
}

facturaCtrl.getFacturasCount = async (req, res) => {
    const distribuidoresStr = req.query.distribuidores
    let count

    if(distribuidoresStr != 'undefined'){
        const distribuidores = distribuidoresStr.split(',')
        count = await Factura.countDocuments({distribuidor: {$in: distribuidores}})
    }
    else{
        count = await Factura.countDocuments()
    }

    res.json(count)
}

facturaCtrl.getFactura = async (req, res) => {
    const factura = await Factura.findById(req.params.id)
    res.json(factura)
}

facturaCtrl.crearFactura = async (req, res) => {
    const factura = new Factura(req.body)
    await factura.save()
    res.json({id: factura._id})
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