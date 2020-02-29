const Reparacion = require('../modelos/reparacion')

const reparacionCtrl = {};

reparacionCtrl.getReparaciones = async (req, res) => {  
    const reparaciones = await Reparacion.find()
    res.json(reparaciones)
}

reparacionCtrl.getReparacion = async (req, res) => {  
    const reparacion = await Reparacion.findById(req.params.id)
    res.json(reparacion)
}

reparacionCtrl.crearReparacion = async (req, res) => {          
    const reparacion = new Reparacion(req.body)
    await reparacion.save()
    res.json({estado: 'guardado'})
}

reparacionCtrl.editarReparacion = async (req, res) => {
    await Reparacion.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: false})
    res.json({estado: 'editado'})
}

reparacionCtrl.eliminarReparacion = async (req, res) => {  
    await Reparacion.findByIdAndRemove(req.params.id)
    res.json({status: 'elimino una reparacion'})
}

module.exports = reparacionCtrl