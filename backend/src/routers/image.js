const express = require('express')
const router = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'src/uploads/'})

const auth = require('../middleware/auth')
const imagesController = require('../controllers/image')

router.get('/get/public', imagesController.getPublicImages)
router.get('/get/private', auth, imagesController.getPrivateImages)
router.get('/get/:key', auth, imagesController.getImageByKey)
router.post('/post', upload.single('file'), imagesController.putImage)
router.post('/delete/:key', auth, imagesController.deleteImageByKey)

module.exports = router