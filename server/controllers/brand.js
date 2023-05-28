const Brand = require('../models/brand')
const asyncHandler = require('express-async-handler');

const createBrand = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error("Missing inputs")
    const response = await Brand.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        createdBrand: response ? response : "Cannot create new brand"
    })
})


const getAllBrand = asyncHandler(async (req, res) => {
    const response = await Brand.find()
    return res.status(200).json({
        success: response ? true : false,
        data: response
    })
})

const deleteBrand = asyncHandler(async (req, res) => {
    const { _id } = req.params
    if (!_id) throw new Error('Mising inputs')
    const response = await Brand.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        delete: response ? response : "No brand delete"
    })
})

const updateBrand = asyncHandler(async (req, res) => {
    const { _id } = req.params
    if (!_id || Object.keys(req.body).length === 0) throw new Error('Mising inputs')
    const response = await Brand.findByIdAndUpdate(_id, req.body, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        update: response ? response : "Some thing went wrong"
    })
})

module.exports = {
    createBrand,
    updateBrand,
    deleteBrand,
    getAllBrand

}