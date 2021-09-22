const express = require('express')
const router = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'src/uploads/'})

const auth = require('../middleware/auth')
const imagesController = require('../controllers/image')

router.get('/public', auth, imagesController.getPublicImages)
router.get('/private', auth, imagesController.getPrivateImages)
router.post('/:key', auth, imagesController.getImagesByKeys)
router.post('/', upload.single('file'), auth, imagesController.putImage)
router.delete('/:key', auth, imagesController.deleteImagesByKeys)

module.exports = router