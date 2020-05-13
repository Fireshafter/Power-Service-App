const Distribuidor = require('../modelos/distribudor')

const distribuidorCtrl = {}

distribuidorCtrl.getDistribuidores = async (req, res) => {
    const distribudores = await Distribuidor.find()
    res.json(distribudores)
}

distribuidorCtrl.crearDistribuidor = async (req, res) => {
    const distribuidor = new Distribuidor(req.body)
    await distribuidor.save()
    res.json({id: distribuidor._id})
}

module.exports = distribuidorCtrl