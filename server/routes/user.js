const router = require('express').Router()
const ctrls = require('../controllers/user')
const { verifyAccessToken } = require('../middlewares/verifyToken')

router.post('/register', ctrls.register)
router.post('/login', ctrls.login)
router.get('/getUserById', verifyAccessToken, ctrls.getUserById)
router.post('/refreshToken', ctrls.refreshAccessToken)
router.get('/logout', ctrls.logOut)





module.exports = router

