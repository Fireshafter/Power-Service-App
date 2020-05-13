const mongoose = require('mongoose')
const { Schema } = mongoose

const distribuidorSchema = new Schema({
    nombre: {type: String, required: true}
})

module.exports = mongoose.model('Distribuidore', distribuidorSchema)