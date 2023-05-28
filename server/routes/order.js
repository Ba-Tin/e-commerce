const router = require('express').Router()
const ctrls = require('../controllers/order')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')



router.post('/create', verifyAccessToken, ctrls.createOrder)
router.get('/', verifyAccessToken, ctrls.getUserOrder)
router.get('/allorder', verifyAccessToken, isAdmin, ctrls.getAllOrder)

router.put('/status/:_oid', verifyAccessToken, isAdmin, ctrls.updateStatus)


module.exports = router