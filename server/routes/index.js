const userRouter = require("./user")
const productRouter = require("./product")
const categoryProductRouter = require("./categoryProduct")
const categoryBlogRouter = require("./categoryBlog")
const brandRouter = require("./brand")
const blogRouter = require("./blog")
const couponRouter = require("./coupon")

const { notFound, errHandler } = require('../middlewares/errHandler');


const initRouters = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    app.use('/api/categoryproduct', categoryProductRouter)
    app.use('/api/categoryblog', categoryBlogRouter)
    app.use('/api/brand', brandRouter)
    app.use('/api/blog', blogRouter)
    app.use('/api/coupon', couponRouter)



    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRouters