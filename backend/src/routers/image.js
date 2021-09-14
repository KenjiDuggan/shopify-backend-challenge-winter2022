const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const imagesController = require('../controllers/image')

router.get('/get/public/all', auth, imagesController.getPublicImages)
router.get('/get/private/:key', auth, imagesController.getSingleImage)
router.post('/add/private', auth, imagesController.addImagesPrivate)

module.exports = router