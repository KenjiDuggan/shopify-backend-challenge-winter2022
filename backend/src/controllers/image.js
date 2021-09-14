const multer = require('multer')
const upload = multer({ dest: 'uploads/'})
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const { uploadFile, getFileStream, getPublicList } = require('../services/s3')

exports.getPublicImages = async (req, res) => {
    try {
        const max = 10
        const result = await getPublicList(max)

        res.status(201).json({ result })
    } catch (err) {
        res.status(400).json({ err: err })
    }
}

exports.getSingleImage = async (req, res) => {
    try {
        const key = req.params.key
        const readStream = getFileStream(key)
    
        readStream.pipe(res)
    } catch (err) {
        res.status(400).json({ err: err })
    }
}

exports.addImagesPrivate = async (req, res) => {
    upload.single('image')
    try {
        const extension = req.params.extension
        const file = req.file
        const result = await uploadFile(file, extension)
        await unlinkFile(file.path)
        // const description = req.body.description
        res.send({ imagePath: `/images/${result.key}` })
    } catch (err) {
      res.status(400).json({ err: err })
    }
}
 