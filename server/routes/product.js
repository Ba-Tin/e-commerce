const router = require('express').Router()
const ctrls = require('../controllers/product')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/create', [verifyAccessToken, isAdmin], ctrls.createProduct)
router.get('/', ctrls.getAllProduct)

router.put('/update/:id', [verifyAccessToken, isAdmin], ctrls.updateProduct)
router.delete('/delete/:id', [verifyAccessToken, isAdmin], ctrls.deleteProduct)
router.get('/:id', ctrls.getProduct)


module.exports = router


