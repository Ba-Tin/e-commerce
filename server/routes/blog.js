const router = require('express').Router()
const ctrls = require('../controllers/blog')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.post("/create", [verifyAccessToken, isAdmin], ctrls.createBlog)
router.get("/", ctrls.getAllBlog)
router.get("/:bid", ctrls.getBlog)
router.put("/like/:bid", [verifyAccessToken], ctrls.likeBlog)
router.put("/dislike/:bid", [verifyAccessToken], ctrls.dislikesBlog)
router.put("/update/_id", [verifyAccessToken, isAdmin], ctrls.updateBlog)
router.delete("/delete/:_id", [verifyAccessToken, isAdmin], ctrls.deleteBlog)
router.put("/uploadimage/:bid", [verifyAccessToken, isAdmin], uploader.single('image'), ctrls.uploadImgeBlog)


module.exports = router