const Product = require('../models/product')
const asyncHandler = require('express-async-handler');
const data = require('../../data/data.json')
const slugify = require('slugify')
const categoryData = require('../../data/cate')
const CategoryProduct = require('../models/categoryProduct')

const fn = async (product) => {
    await Product.create({
        title: product?.name,
        slug: slugify(product?.name) + Math.round(Math.random() * 100) + ' ',
        description: product?.description,
        brand: product?.brand,
        price: Math.round(Number(product?.price?.match(/\d/g).join('')) / 100),
        category: product?.category[1],
        quantity: Math.round(Math.random() * 1000),
        sold: Math.round(Math.random() * 100),
        images: product?.images,
        thumb: product?.thumb,
        color: product?.variants?.find(item => item.label === "Color")?.variants[0],
        totalsRatings: Math.round(Math.random() * 5)
    })
}

const insertProduct = asyncHandler(async (req, res) => {
    const promises = []
    for (let product of data) promises.push(fn(product))
    await Promise.all(promises)
    return res.json('Done')

})


const fn2 = async (cate) => {
    await CategoryProduct.create({
        title: cate?.cate,
        brand: cate?.brand
    })
}
const insertCategory = asyncHandler(async (req, res) => {
    const promises = []
    for (let cate of categoryData) promises.push(fn2(cate))
    await Promise.all(promises)
    return res.json('Done')

})

module.exports = {
    insertProduct,
    insertCategory

}
