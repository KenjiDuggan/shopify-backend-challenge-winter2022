const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const { putImage, getImageByKey, getImagesByPrefix } = require('../services/s3')

exports.putImage = async(req, res) => {
    try {
        const file = req.file 
        const extension = req.body.extension
        const public = req.body.public
 
        let folder = ''
        if(public === 'true') {
            folder = 'Public/'
        } else {
            folder = req.userData.name.toLowerCase().trim() + '/' || 'kenjiduggan'
        }
        
        const result = await putImage(file, folder, extension)
        await unlinkFile(file.path)

        res.send({ imagePath: `/images/${result.key}` })
    } catch (err) {
        res.status(400).json({ err: err })
    }
}
 
exports.getPublicImages = async(req, res) => {
    try {
        const prefix = 'Public/' // the folder we want images from
        const result = await getImagesByPrefix(prefix)

        res.status(201).json({ result })
    } catch (err) {
        res.status(400).json({ err: err })
    }
}

exports.getSingleImage = async(req, res) => {
    try {
        const key = req.params.key
        const readStream = getFileStream(key)
    
        readStream.pipe(res)
    } catch (err) {
        res.status(400).json({ err: err })
    }
}

// exports.uploadImagesPublic  = async (req, res) => {
//     try {
//         await multer().array("images")
//         console.log('this is after upload')
//         const extension = req.params.extension
//         const file = req.file
//         const result = await uploadFile(file)
//         await unlinkFile(file.path)
//         // const description = req.body.description
//         res.send({ imagePath: `/images/${result.key}` })
//     } catch (err) {
//       res.status(400).json({ err: err })
//     }
// }
 