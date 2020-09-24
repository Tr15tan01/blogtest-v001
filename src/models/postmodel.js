const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    heading: {
        type: String,
        required: true
    },
    subheading: {
        type: String,
        required: true
    }, 
    content: {
        type: String,
        required: true
    },
    imageurl: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
        tolowercase: true,
        trim: true
    },
    dateCreated: {
         type: Date, 
         default: Date.now 
    } 
})

module.exports = mongoose.model('Post', postSchema)