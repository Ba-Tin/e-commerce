const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var categorBlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('CategorBlog', categorBlogSchema);