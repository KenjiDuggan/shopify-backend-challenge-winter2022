const mongoose = require('mongoose')
const MONGO_PORT = "mongodb://localhost:27017/shopifyapp"

mongoose
  .connect(MONGO_PORT)
  .then(() => {
    console.log('Database is connected')
  })
  .catch(err => {
    console.log({ database_error: err })
  })
