const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler');

const createCoupon = asyncHandler(async (req, res) => {
    const { name, discount, expiry } = req.body
    if (!name || !discount || !expiry) throw new Error("Missing inputs")
    const response = await Coupon.create({
        ...req.body,
        expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000
    })
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : "Cannot create new Coupon"
    })
})


const getAllCoupon = asyncHandler(async (req, res) => {
    const response = await Coupon.find().select("-createdAt -updatedAt")
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : "Can not get coupon"
    })
})

const deleteCoupon = asyncHandler(async (req, res) => {
    const { _id } = req.params
    if (!_id) throw new Error('Mising inputs')
    const response = await Coupon.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        delete: response ? response : "No Coupon delete"
    })
})

const updateCoupon = asyncHandler(async (req, res) => {
    const { _id } = req.params
    if (!_id || Object.keys(req.body).length === 0) throw new Error('Mising inputs')
    if (req.body.expiry) req.body.expiry = Date.now() + +req.body.expiry * 24 * 60 * 60 * 1000
    const response = await Coupon.findByIdAndUpdate(_id, req.body, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        update: response ? response : "Some thing went wrong"
    })
})

module.exports = {
    createCoupon,
    updateCoupon,
    deleteCoupon,
    getAllCoupon

}