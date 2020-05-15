const express = require('express')
const app = express();
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

const { mongoose } = require('./database')

// Configuración
app.set('puerto', process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({origin: 'http://localhost:4200'}))

// Rutas
app.use('/reparaciones',require('./rutas/reparacion.rutas'))
app.use('/facturas', require('./rutas/factura.rutas'))
app.use('/distribuidores', require('./rutas/distribuidor.rutas'))
app.use('/componentes', require('./rutas/componente.rutas'))
app.use('/static', express.static(path.join(__dirname, 'public')))

// Arranque del servidor
app.listen(app.get('puerto'), () => console.log(`Servidor abierto en http://localhost:${app.get('puerto')}`))