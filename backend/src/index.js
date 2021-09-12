const express = require('express')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer')
const upload = multer({ dest: 'uploads/'})

const { uploadFile, getFileStream } = require('./aws-utils/s3')

const app = express()
const port = process.env.PORT || 3001

app.get('/images/:key', (req, res) => {
    const key = req.params.key
    const readStream = getFileStream(key)

    readStream.pipe(res)
})

app.post('/images', upload.single('image'),  async(req, res) => {
    const extension = req.params.extension
    const file = req.file
    const result = await uploadFile(file, extension)
    await unlinkFile(file.path)
    const description = req.body.description
    res.send({ imagePath: `/images/${result.key}` })
})

app.listen(port, () => console.log("Listening on port: " + port))
