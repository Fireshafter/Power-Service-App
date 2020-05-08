const mongoose = require('mongoose')
const { Schema } = mongoose

const facturaSchema = new Schema({
    distribuidor: {type: String, required: true},
    idfactura: {type: String, required: true},
    fecha: {type: Date, default: Date.now()},
    costes: {type: [
        {
            concepto: {type: String, required: true},
            cantidad: {type: Number, required: true},
            precio: {type: Number, required: true},
            categoria: {type: String, required: true}
        }
    ], required: true, _id: false},
    comentario: {type: String, required: true}
})

module.exports = mongoose.model('Factura', facturaSchema)