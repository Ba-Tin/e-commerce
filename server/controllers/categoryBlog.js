const CategoryBlog = require('../models/categoryBlog')
const asyncHandler = require('express-async-handler');

const createCategoryBlog = asyncHandler(async (req, res) => {
    const response = await CategoryBlog.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        createdBlog: response ? response : "Cannot create new category"
    })
})


const getAllCategoryBlog = asyncHandler(async (req, res) => {
    const response = await CategoryBlog.find()
    return res.status(200).json({
        success: response ? true : false,
        users: response
    })
})

const deleteCategoryBlog = asyncHandler(async (req, res) => {
    const { _id } = req.params
    if (!_id) throw new Error('Mising inputs')
    const response = await CategoryBlog.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        delete: response ? response : "No category delete"
    })
})

const updateCategoryBlog = asyncHandler(async (req, res) => {
    const { _id } = req.params
    if (!_id || Object.keys(req.body).length === 0) throw new Error('Mising inputs')
    const response = await CategoryBlog.findByIdAndUpdate(_id, req.body, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : "Some thing went wrong"
    })
})

module.exports = {
    createCategoryBlog,
    updateCategoryBlog,
    deleteCategoryBlog,
    getAllCategoryBlog

}