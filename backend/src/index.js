require('dotenv').config()
require('./db/mongoose')

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3001

// Import Routers
const userRoutes = require('./routers/user')  
const imagesRoutes = require('./routers/image')


/**
 * Application Configuration
 */
app.use(cors()) // CORS Enabled
app.use(express.json()) // Express JSON Parsing
app.use(morgan('dev')) // Morgan on Dev


/**
 * Application Endpoints
 */
app.use('/user', userRoutes)
app.use('/images', imagesRoutes)


// Listen on port defined above
module.exports = app.listen(port, () => {
    console.log('Listening on port: ' + port)
})
 