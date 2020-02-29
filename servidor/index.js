const express = require('express')
const app = express();
const morgan = require('morgan')

const { mongoose } = require('./database')

// Configuración
app.set('puerto', process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Rutas
app.use('/reparaciones',require('./rutas/reparacion.rutas'))

// Arranque del servidor
app.listen(app.get('puerto'), () => console.log(`Servidor abierto en http://localhost:${app.get('puerto')}`))