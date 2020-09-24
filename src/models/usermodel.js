const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required here '],
        trim: true,
        minlength: [6, 'too short lovely nameee'],
        maxlength: [18, 'too long name choose shorter']
    },
    email: {
        type: String,
        required: [true, 'იმეილი მექქი'],
        tolowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'password is requird'],
        trim: true
    },
    age: {
        type: Number,
        trim: true,
        required: [true, 'it is necessary to provide age baby'],
        min: [18, 'ჯერ პატარა ხარ'],
        max: [18, 'ჯერ პატარა ხარ']
    }
})

module.exports = mongoose.model('User', userSchema)