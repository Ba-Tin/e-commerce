const router = require('express').Router()
const ctrls = require('../controllers/product')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')


router.post('/create', [verifyAccessToken, isAdmin], ctrls.createProduct)
router.get('/', ctrls.getAllProduct)
router.put('/ratings', verifyAccessToken, ctrls.ratings)

router.put('/uploadimage/:pid', [verifyAccessToken, isAdmin], uploader.array('images', 10), ctrls.uploadImgesProduct)
router.put('/update/:id', [verifyAccessToken, isAdmin], ctrls.updateProduct)
router.delete('/delete/:id', [verifyAccessToken, isAdmin], ctrls.deleteProduct)
router.get('/:id', ctrls.getProduct)


module.exports = router


