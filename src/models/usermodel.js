const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required here '],
        trim: true,
      //  minlength: [6, 'too short lovely nameee'],
        tolowercase: true
    },
    email: {
        type: String,
        required: [true, 'იმეილი მექქი'],
        tolowercase: true,
        trim: true
    },
    password: {
        type: String, 
        required: true,
        trim: true,
        minlength: [6, 'მინიმუმი არის 6 '],
        // maxlength: [24, 'მაქსიმუმი სრის 24']
    },
    age: {
        type: Number,
        trim: true,
        required: true,
        min: [18, 'ჯერ პატარა ხარ']
    }
})

module.exports = mongoose.model('User', userSchema)