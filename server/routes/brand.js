const router = require('express').Router()
const ctrls = require('../controllers/brand')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/create', [verifyAccessToken, isAdmin], ctrls.createBrand)
router.get('/', ctrls.getAllBrand)
router.put('/update/:_id', [verifyAccessToken, isAdmin], ctrls.updateBrand)
router.delete('/delete/:_id', [verifyAccessToken, isAdmin], ctrls.deleteBrand)

module.exports = router