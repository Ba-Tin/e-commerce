const User = require('../models/user')
const asyncHandler = require('express-async-handler');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const sendMail = require('../ultils/sendMail')
const crypto = require('crypto')

const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname } = req.body
    if (!email || !password || !firstname || !lastname)
        return res.status(400).json({
            sucess: false,
            mes: "Msssing Inputs"
        })

    const user = await User.findOne({ email })
    if (user) throw new Error("User has exsited!")
    else {
        const newUser = await User.create(req.body)
        return res.status(200).json({
            succes: newUser ? true : false,
            mes: newUser ? 'Register is successfully. Please go login' : 'something went wrong'
        })
    }
})


// Refresh token => cấp mới access token
// Access token => xác thực người dùng, phân quyền người dùng
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).json({
            sucess: false,
            mes: "Msssing Inputs"
        })
    const response = await User.findOne({ email })
    if (response && await response.isCorrectPassword(password)) {
        const { password, role, refreshToken, ...userData } = response.toObject()
        const accessToken = generateAccessToken(response._id, role)
        const newRefreshToken = generateRefreshToken(response._id)
        await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true })
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
        return res.status(200).json({
            sucess: true,
            accessToken,
            userData
        })
    } else {
        throw new Error('Invalid crendentials!')
    }

})
const getUserById = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id).select('-refreshToken -password -role')
    return res.status(200).json({
        success: user ? true : false,
        rs: user ? user : "User not found"
    })
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new Error("No refresh token in cookies");
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, refreshToken: refreshToken });
    if (!user) throw new Error('Refresh token not matched');
    const accessToken = generateAccessToken(user._id, user.role);
    return res.status(200).json({ success: true, accessToken: accessToken });
});

const logOut = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        res.status(400).json({ success: false, message: "No refresh token found in cookies." });
        return;
    }
    await User.findOneAndUpdate({ refreshToken: refreshToken }, { refreshToken: null });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    });
    res.status(200).json({ success: true, message: "User logged out successfully." });
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.query
    if (!email) throw new Error('Missing email')
    const user = await User.findOne({ email })
    if (!user) throw new Error("User not found")
    const resetToken = user.createPasswordChangedToken()
    await user.save()

    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a
    href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`
    const data = {
        email,
        html
    }
    const rs = await sendMail(data)
    return res.status(200).json({
        success: true,
        rs
    })
})

const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body
    if (!password || !token) throw new Error('Missing input')
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) throw new Error('Invalid reset token')
    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangeAt = Date.now()
    user.passwordResetExpires = undefined
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? 'Updated passsword' : 'Something went wrong'
    })
})

const getAllUsers = asyncHandler(async (req, res) => {
    const response = await User.find().select('-refreshToken -password -role')
    return res.status(200).json({
        success: response ? true : false,
        users: response
    })
})

const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.query
    if (!_id) throw new Error('Mising inputs')
    const response = await User.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        deleteUser: response ? `user with email ${response.email} deleted` : "No user delete"
    })
})

const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    if (!_id || Object.keys(req.body).length === 0) throw new Error('Mising inputs')
    const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : "Some thing went wrong"
    })
})

const updateUserByAdmin = asyncHandler(async (req, res) => {
    const { _id } = req.params
    if (Object.keys(req.body).length === 0) throw new Error('Mising inputs')
    const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : "Some thing went wrong"
    })
})

const updateUserAddress = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    if (!req.body.address) throw new Error('Missing inputs');
    const newAddress = req.body.address;
    const existingAddress = await User.findById({ _id, address: { $elemMatch: { name: newAddress } } });
    if (existingAddress) {
        return res.status(400).json({
            success: false,
            message: 'Address with the same name already exists'
        });
    }
    const response = await User.findByIdAndUpdate(_id, { $push: { address: newAddress } }, { new: true }).select('-password -role -refreshToken');
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : "Something went wrong"
    });
});
const addCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { pid, quantity, color } = req.body
    if (!pid || !quantity || !color) throw new Error("Missing inputs")
    const user = await User.findById(_id).select('cart')
    const alreadyProduct = user?.cart.find(item => item.product.toString() === pid)
    if (alreadyProduct) {
        if (alreadyProduct.color === color) {
            const response = await User.updateOne({ cart: { $elemMatch: alreadyProduct } }, { $set: { "cart.$.quantity": quantity } }, { new: true })
            return res.status(200).json({
                success: response ? true : false,
                updatedUser: response ? response : "Some thing went wrong"
            })
        }
        else {
            const response = await User.findByIdAndUpdate(_id, { $push: { cart: { product: pid, quantity, color } } }, { new: true })
            return res.status(200).json({
                success: response ? true : false,
                updatedUser: response ? response : "Some thing went wrong"
            })
        }
    } else {
        const response = await User.findByIdAndUpdate(_id, { $push: { cart: { product: pid, quantity, color } } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            updatedUser: response ? response : "Some thing went wrong"
        })
    }

})

module.exports = {
    register,
    login,
    getUserById,
    refreshAccessToken,
    logOut,
    forgotPassword,
    resetPassword,
    getAllUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin,
    addCart,
    updateUserAddress
}