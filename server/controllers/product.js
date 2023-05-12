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
    const products = await Product.find()
    return res.status(200).json({
        success: products ? true : false,
        productsData: products ? products : "Cannot get product"
    })
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

module.exports = {
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
}