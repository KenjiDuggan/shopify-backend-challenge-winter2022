const express = require('express')
const router = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'src/uploads/'})

const auth = require('../middleware/auth')
const imagesController = require('../controllers/image')

router.get('/get', imagesController.getPublicImages)
router.get('/get/private/:key', auth, imagesController.getSingleImage)
router.post('/post/single/public', upload.single('file'), imagesController.putImage)
// router.post('/post/batch/public', imagesController.uploadImagesPublic)

module.exports = router