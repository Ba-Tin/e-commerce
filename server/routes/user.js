const router = require('express').Router()
const ctrls = require('../controllers/user')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/register', ctrls.register)
router.post('/login', ctrls.login)
router.get('/getUserById', verifyAccessToken, ctrls.getUserById)
router.post('/refreshToken', ctrls.refreshAccessToken)
router.get('/logout', ctrls.logOut)
router.get('/forgotpassword', ctrls.forgotPassword)
router.put('/resetpassword', ctrls.resetPassword)
router.get('/', [verifyAccessToken, isAdmin], ctrls.getAllUsers)
router.delete('/', [verifyAccessToken, isAdmin], ctrls.deleteUser)
router.put('/deleteuser', [verifyAccessToken], ctrls.updateUser)
router.put('/:_id', [verifyAccessToken, isAdmin], ctrls.updateUserByAdmin)
module.exports = router



//CREATE (POST) + PUT gửi theo body
//GET + DELETE -query
