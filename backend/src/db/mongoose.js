const mongoose = require('mongoose')

mongoose
  .connect(process.env.MONGODB_PORT)
  .then(() => {
    console.log('Database is connected')
  })
  .catch(err => {
    console.log({ database_error: err })
  })
