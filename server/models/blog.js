const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    numberView: {
        type: Number,
        default: 0
    },
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    disLikes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    image: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2Fthe-8-best-free-online-word-processors--347340190008089064%2F&psig=AOvVaw0HlcVwsTAxSYxuSXRIEN3P&ust=1684671537825000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNCMgNjwg_8CFQAAAAAdAAAAABAJ"
    },
    author: {
        type: String,
        default: "Admin"
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);