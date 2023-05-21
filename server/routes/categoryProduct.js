const router = require('express').Router()
const ctrls = require('../controllers/categoryProduct')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/create', [verifyAccessToken, isAdmin], ctrls.createCategoryProduct)
router.get('/', ctrls.getAllCategoryProduct)
router.put('/update/:_id', [verifyAccessToken, isAdmin], ctrls.updateCategoryProduct)
router.delete('/delete/:_id', [verifyAccessToken, isAdmin], ctrls.deleteCategoryProduct)

module.exports = router
