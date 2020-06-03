const Reparacion = require('../modelos/reparacion')
const mongoose = require('mongoose')

const reparacionCtrl = {};

reparacionCtrl.getReparaciones = async (req, res) => {
    let reparaciones = null

    if(req.query.cerradas == 'true'){
        reparaciones = await Reparacion.find().sort({orden: -1}).skip(Number(req.query.pag) * Number(req.query.pagsize)).limit(Number(req.query.pagsize))
    }
    else{
        reparaciones = await Reparacion.find({estado: {$ne: 'Finalizada'}}).sort({orden: -1}).skip(Number(req.query.pag) * Number(req.query.pagsize)).limit(Number(req.query.pagsize))
    }
    res.json(reparaciones)
}

reparacionCtrl.getMainReparaciones = async (req, res) => {
    
    const reparaciones = await Reparacion.find().sort({orden: -1}).limit(7)
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

reparacionCtrl.getReparacionesCount = async (req, res) => {  
    let size = null

    if(req.query.cerradas == 'true'){
        size = await Reparacion.countDocuments()
    }
    else{
        size = await Reparacion.countDocuments({estado: {$ne: 'Finalizada'}})
    }
    res.json(size)
}

reparacionCtrl.getLastReparacion = async (req, res) => {  
    const lastReparacion = await Reparacion.find().sort({orden: -1}).limit(1)

    if(lastReparacion[0])
        res.json(lastReparacion)
    else
        res.json({error: 'No hay registros previos'})
}

reparacionCtrl.reparacionSearch = async (req, res) => {  
    let search = null
    
    if(isNaN(req.query.searchTerm)){
        search = await Reparacion.find({$or:[
            {"cliente.nombre": {$regex: req.query.searchTerm, $options: "i"}},
            {"cliente.apellidos": {$regex: req.query.searchTerm, $options: "i"}},
            {"cliente.correo": {$regex: req.query.searchTerm, $options: "i"}}
        ]}).limit(Number(req.query.pagsize))
    }
    else{
        search = await Reparacion.find({$or:[
            {"orden": req.query.searchTerm},
            {"cliente.telefono": req.query.searchTerm}
        ]}).limit(Number(req.query.pagsize))
    }

    res.json(search)
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