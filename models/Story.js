const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'normal',
        enum: ['normal', 'favorite']
    },
    difficulty: {
        type: String,
        enum:['1', '2', '3', '4', '5', '6', '6+']
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }, 
    faved: {
        type: Boolean,
        default: false 
    }
})

module.exports = mongoose.model('Story', StorySchema)