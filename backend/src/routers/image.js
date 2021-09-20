const express = require('express')
const router = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'src/uploads/'})

const auth = require('../middleware/auth')
const imagesController = require('../controllers/image')

router.get('/public', imagesController.getPublicImages)
router.get('/private', auth, imagesController.getPrivateImages)
router.get('/:key', auth, imagesController.getImageByKey)
router.post('/', upload.single('file'), imagesController.putImage)
router.delete('/:key', auth, imagesController.deleteImageByKey)

module.exports = router