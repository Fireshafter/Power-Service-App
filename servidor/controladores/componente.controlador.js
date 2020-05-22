const Componente = require('../modelos/componente')

const componenteCtrl = {}

componenteCtrl.getComponentes = async (req, res) => {
    const componentes = await Componente.find()
    res.json(componentes)
}

componenteCtrl.crearComponente = async (req, res) => {
    const componente = new Componente(req.body)
    await componente.save()
    res.json({id: componente._id})
}

componenteCtrl.getComponenteByName = async (req, res) => {
    const componente = await Componente.findOne({nombre: req.body.nombre})
    res.json(componente)
}

module.exports = componenteCtrl