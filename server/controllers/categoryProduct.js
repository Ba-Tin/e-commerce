const CategoryProduct = require('../models/categoryProduct')
const asyncHandler = require('express-async-handler');

const createCategoryProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error("Missing inputs")
    const response = await CategoryProduct.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : "Cannot create new category"
    })
})


const getAllCategoryProduct = asyncHandler(async (req, res) => {
    const response = await CategoryProduct.find()
    return res.status(200).json({
        success: response ? true : false,
        data: response
    })
})

const deleteCategoryProduct = asyncHandler(async (req, res) => {
    const { _id } = req.params
    if (!_id) throw new Error('Mising inputs')
    const response = await CategoryProduct.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        delete: response ? response : "No category delete"
    })
})

const updateCategoryProduct = asyncHandler(async (req, res) => {
    const { _id } = req.params
    console.log(_id);
    if (!_id || Object.keys(req.body).length === 0) throw new Error('Mising inputs')
    const response = await CategoryProduct.findByIdAndUpdate(_id, req.body, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        update: response ? response : "Some thing went wrong"
    })
})

module.exports = {
    createCategoryProduct,
    updateCategoryProduct,
    deleteCategoryProduct,
    getAllCategoryProduct

}