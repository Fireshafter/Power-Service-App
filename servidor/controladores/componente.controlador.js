const Componente = require('../modelos/componente')

const componenteCtrl = {}

componenteCtrl.getComponentes = async (req, res) => {
    let componentes = []    

    if(req.query.categoria == 'vendible')
        componentes = await Componente.find({categoria: {$ne: 'Consumo interno'}}).sort({marca: 1, nombre: 1})
    else{
        if(req.query.marcas != 'undefined' && req.query.categoria != 'Consumo interno'){
            if(req.query.searchTerm != 'undefined' && req.query.searchTerm){
                marcas = req.query.marcas.split(',')
                componentes = await Componente.find({nombre: {$regex: req.query.searchTerm, $options: "i"}, categoria: req.query.categoria, marca: {$in: marcas}}).sort({marca: 1, nombre: 1})
            }
            else{
                marcas = req.query.marcas.split(',')
                componentes = await Componente.find({categoria: req.query.categoria, marca: {$in: marcas}}).sort({marca: 1, nombre: 1})
            }
        }
        else{
            if(req.query.searchTerm && req.query.searchTerm != 'undefined')
                componentes = await Componente.find({nombre: {$regex: req.query.searchTerm, $options: "i"}, categoria: req.query.categoria}).sort({marca: 1, nombre: 1})
            else
                componentes = await Componente.find({categoria: req.query.categoria}).sort({marca: 1, nombre: 1})
        }
            
    }

    res.json(componentes)
}

componenteCtrl.getMainComponentes = async (req, res) => {    

    const marca = req.query.marca;

    let pantallas = await Componente.aggregate([{$match: {categoria: "Pantallas", marca: marca}}, {$group: {_id: marca, total: {$sum: "$stock"}}}])
    let baterias = await Componente.aggregate([{$match: {categoria: "Baterias", marca: marca}}, {$group: {_id: marca, total: {$sum: "$stock"}}}])
    let tecnicotienda = await Componente.aggregate([{$match: {categoria: "Técnico en tienda", marca: marca}}, {$group: {_id: marca, total: {$sum: "$stock"}}}])
    
    let marcadata = {marca: marca,pantallas: 0, baterias: 0, tecnicotienda: 0}
    
    if(pantallas[0])
        marcadata.pantallas = pantallas[0].total
    
    if(baterias[0])
        marcadata.baterias = baterias[0].total
    
    if(tecnicotienda[0])
        marcadata.tecnicotienda = tecnicotienda[0].total
    
    res.json(marcadata)
}

componenteCtrl.crearComponente = async (req, res) => {
    const componente = new Componente(req.body)
    
    await componente.save()
    res.json({id: componente._id})
}

componenteCtrl.editarComponente = async (req, res) => {
    await Componente.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: false})
    res.json({estado: 'editado'})
}

componenteCtrl.editarStock = async (req, res) => {
    if(req.params.id != 'undefined')
        await Componente.findByIdAndUpdate(req.params.id, {$inc: {stock: req.body.stock}}, {new: false})
    else
        await Componente.updateOne({nombre: req.body.nombre}, {$inc: {stock: req.body.stock}})
        
     res.json({estado: 'editado'})
}

componenteCtrl.getMarcas = async (req, res) => {
    const marcas = await Componente.find({categoria: {$ne: 'Consumo interno'}}).distinct("marca")
    res.json(marcas)
}

componenteCtrl.getComponenteByName = async (req, res) => {
    const componente = await Componente.findOne({nombre: req.body.nombre})
    res.json(componente)
}

componenteCtrl.eliminarComponente = async (req, res) => {
    await Componente.findByIdAndRemove(req.params.id)
    res.json({status: 'eliminado correctamente'})
}

module.exports = componenteCtrl