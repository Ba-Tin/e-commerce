const router = require('express').Router()
const ctrls = require('../controllers/categoryBlog')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/create', [verifyAccessToken, isAdmin], ctrls.createCategoryBlog)
router.get('/', ctrls.getAllCategoryBlog)
router.put('/update/:_id', [verifyAccessToken, isAdmin], ctrls.updateCategoryBlog)
router.delete('/delete/:_id', [verifyAccessToken, isAdmin], ctrls.deleteCategoryBlog)

module.exports = router
