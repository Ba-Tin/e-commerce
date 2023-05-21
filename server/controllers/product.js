const Product = require('../models/product')
const asyncHandler = require('express-async-handler');
const slugify = require('slugify')


const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error("Missing inputs")
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        createdProduct: newProduct ? newProduct : "Cannot create new product"
    })
})

const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : "Cannot get product"
    })
})
//Filtering, sorting && pagination
const getAllProduct = asyncHandler(async (req, res) => {
    const queries = { ...req.query }
    //Tách các trường đặc biệt ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields']
    excludeFields.forEach(item => delete queries[item])

    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, macthedItem => `$${macthedItem}`)
    const formatedQuires = JSON.parse(queryString)
    //Filtering
    if (queries?.title) formatedQuires.title = { $regex: queries.title, $options: 'i' }
    let queryCommand = Product.find(formatedQuires)
    //sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(" ")
        queryCommand = queryCommand.sort(sortBy)

    }

    //Fiels limiting
    if (req.query.fields) {
        console.log(req.query.fields);
        const fields = req.query.fields.split(',').join(" ")
        queryCommand = queryCommand.select(fields)
    }

    //Pagination
    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCT
    const skip = (page - 1) * limit
    queryCommand.skip(skip).limit(limit)
    //Execute query
    // số lượng sản phẩm thõa mãn điều kiện !== số lượng sp trả về
    queryCommand.exec().then(async response => {
        const counts = await Product.find(formatedQuires).countDocuments();
        return res.status(200).json({
            success: response ? true : false,
            counts,
            products: response ? response : "Cannot get product",
        });
    }).catch(err => {
        throw new Error(err.message);
    });
})

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, { new: true })
    return res.status(200).json({
        success: updateProduct ? true : false,
        updateProduct: updateProduct ? updateProduct : "Cannot get product"
    })
})


const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    const deleteProduct = await Product.findByIdAndDelete(id)
    return res.status(200).json({
        success: deleteProduct ? true : false,
        deleteProduct: deleteProduct ? deleteProduct : "Cannot get product"
    })
})


//đánh giá
const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { star, comment, pid } = req.body
    if (!star || !pid) throw new Error("Missing inputs")
    const ratingProduct = await Product.findById(pid)
    const alreadyRating = ratingProduct?.ratings?.find(el => el.postedBy.toString() === _id)
    console.log({ alreadyRating });
    if (alreadyRating) {
        //update start & comment
        await Product.updateOne({
            ratings: { $elemMatch: alreadyRating }
        }, {
            $set: {
                "ratings.$.star": star,
                "ratings.$.comment": comment
            }
        }, { new: true })
    } else {
        //add star & comment
        const response = await Product.findByIdAndUpdate(pid, {
            $push: { ratings: { star, comment, postedBy: _id } }
        }, { new: true })
    }

    // sum rating
    const updatedProduct = await Product.findById(pid)
    const ratingCount = updatedProduct.ratings.length
    const sumRatings = updatedProduct.ratings.reduce((sum, item) => sum + +item.star, 0)
    updatedProduct.totalsRatings = Math.round(sumRatings * 10 / ratingCount) / 10

    await updatedProduct.save()

    return res.status(200).json({
        status: true,
        updatedProduct
    })
})

module.exports = {
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    ratings
}