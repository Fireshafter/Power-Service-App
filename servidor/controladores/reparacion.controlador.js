const Reparacion = require('../modelos/reparacion')
const mongoose = require('mongoose')

const reparacionCtrl = {};

reparacionCtrl.getReparaciones = async (req, res) => {  
    const reparaciones = await Reparacion.find()
    res.json(reparaciones)
}

reparacionCtrl.getReparacion = async (req, res) => {  
    
    if(mongoose.Types.ObjectId.isValid(req.params.id)){  
        const reparacion = await Reparacion.findById(req.params.id)
        res.json(reparacion)
    }
    else
        res.json({error: 'ObjectId no válido'})
}

reparacionCtrl.crearReparacion = async (req, res) => {          
    const reparacion = new Reparacion(req.body)
    await reparacion.save()
    res.json({_id: reparacion._id})
}

reparacionCtrl.editarReparacion = async (req, res) => {
    await Reparacion.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: false})
    res.json({estado: 'editado'})
}

reparacionCtrl.eliminarReparacion = async (req, res) => {  
    await Reparacion.findByIdAndRemove(req.params.id)
    res.json({status: 'reparacion eliminada'})
}

module.exports = reparacionCtrl