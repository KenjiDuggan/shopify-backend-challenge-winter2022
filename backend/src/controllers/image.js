const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const { putImage, getImageByKey, deleteImageByKey, getImagesByPrefix, checkIfPrefixExists } = require('../services/s3')

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
        console.log('get public images')
        const prefix = 'Public/' // the folder we want images from
        const result = await getImagesByPrefix(prefix)
        console.log(result)
        res.status(201).json({ result })
    } catch (err) {
        res.status(400).json({ err: err })
    }
}

exports.getPrivateImages = async(req, res) => {
    try {
        const prefix = req.userData.name.toLowerCase().replace(/\s/g, "") + '/'
        console.log('this is prefix: ' + prefix)
        await checkIfPrefixExists(prefix)
        const result = await getImagesByPrefix(prefix)
        res.status(201).json({ result })
    } catch (err) {
        res.status(400).json({ err: err })
    }
}

exports.getImagesByKeys = async(req, res) => {
    try {
        const keys = req.body.keys
        let results = []
        keys.forEach((e) => {
            result.push(getImageByKey(e))
        })
        res.status(201).json({ results })
    } catch (err) {
        res.status(400).json({ err: err })
    }
}

exports.deleteImagesByKeys = async(req, res) => {
    try {
        const keys = req.body.keysd
        let results = []
        keys.forEach((e) => {
            result.push(deleteImageByKey(e))
        })
        res.status(201).json({ results })
    } catch (err) {
        res.status(400).json({ err: err })
    }
}
 