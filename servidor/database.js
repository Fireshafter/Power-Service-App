const mongoose = require('mongoose')

const URI = 'mongodb://localhost/power-service'

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(db => console.log('Conectado a la base de datos'))
    .catch(err => console.log('Error al conectar a la base de datos'))

module.exports = mongoose