const mongoose = require('mongoose')
const { Schema } = mongoose

const componenteSchema = new Schema({
    nombre: {type: String, required: true},
    categoria: {type: String, required: true}
})

module.exports = mongoose.model('Componente', componenteSchema)