const Blog = require('../models/blog')
const asyncHandler = require('express-async-handler');

const createBlog = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body
    if (!title, !description, !category) throw new Error("Missing inputs")
    const response = await Blog.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        blog: response ? response : "Cannot create new blog"
    })
})

const getAllBlog = asyncHandler(async (req, res) => {
    const response = await Blog.find()
    return res.status(200).json({
        success: response ? true : false,
        blogs: response
    })
})

const deleteBlog = asyncHandler(async (req, res) => {
    const { _id } = req.params
    if (!_id) throw new Error('Mising inputs')
    const response = await Blog.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        delete: response ? response : "Delete fail"
    })
})

const updateBlog = asyncHandler(async (req, res) => {
    const { _id } = req.params
    if (!_id || Object.keys(req.body).length === 0) throw new Error('Mising inputs')
    const response = await Blog.findByIdAndUpdate(_id, req.body, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        updateBlog: response ? response : "Some thing went wrong"
    })
})


const likeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { bid } = req.params
    if (!bid) throw new Error("Mising inputs")
    const blog = await Blog.findById(bid)
    const alreadyDisliked = blog?.disLikes?.find(el => el.toString() === _id)
    if (alreadyDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { disLikes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            data: response
        })
    }
    const isLiked = blog?.likes?.find(el => el.toString() === _id)
    if (isLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            data: response
        })
    }
    else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            data: response
        })
    }

})

const dislikesBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { bid } = req.params
    if (!bid) throw new Error("Mising inputs")
    const blog = await Blog.findById(bid)
    const alreadyLiked = blog?.likes?.find(el => el.toString() === _id)
    if (alreadyLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            data: response
        })
    }
    const isDisLiked = blog?.disLikes?.find(el => el.toString() === _id)
    if (isDisLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { disLikes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            data: response
        })
    }
    else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { disLikes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            data: response
        })
    }

})
const getBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const blog = await Blog.findByIdAndUpdate(bid, { $inc: { numberView: 1 } }, { new: true })
        .populate("likes", "firstname lastname")
        .populate("disLikes", "firstname lastname")
    return res.json({
        success: blog ? true : false,
        data: blog
    })
})

module.exports = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlog,
    likeBlog,
    dislikesBlog,
    getBlog
}