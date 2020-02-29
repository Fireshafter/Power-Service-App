const mongoose = require('mongoose')
const { Schema } =  mongoose

const reparacionSchema = new Schema({
    orden: {type: Number, required: true},
    estado: {type: String, required: true},
    fechacreacion: {type: Date, default: Date.now()},
    taller: {type: String, required: true},
    cliente: {
        nombre: {type: String, required: true},
        apellidos: {type: String, required: true},
        calle: {type: String, required: true},
        numero: {type: Number, required: true},
        codigopostal: {type: Number, required: true},
        ciudad: {type: String, required: true},
        telefono: {type: String, required: true},
        correo: {type: String, required: true},
    },
    dispositivo: {
        nombre: {type: String, required: true},
        marca: {type: String, required: true},
        estado: {type: [String], required: true},
        sn: {type: String, required: true},
        accesorios: {type: [String], required: false},
    },
    titulo: {type: String, required: true},
    descripcion: {type: String, required: true},
    costes: {type: [
        {
            servicio: { type: String, required: true},
            coste: { type: Number, required: true}
        }
    ], required: false, _id: false},
    log: {type: [{
        usuario: { type: String, required: true},
        mensaje: { type: String, required: true},
    }], required: false, _id: false}
})

module.exports = mongoose.model('Reparacione', reparacionSchema)