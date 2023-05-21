const router = require('express').Router()
const ctrls = require('../controllers/coupon')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post("/create", [verifyAccessToken, isAdmin], ctrls.createCoupon)
router.get("/", ctrls.getAllCoupon)
router.put("/update/:_id", [verifyAccessToken], ctrls.updateCoupon)
router.delete("/delete/:_id", [verifyAccessToken], ctrls.deleteCoupon)



module.exports = router