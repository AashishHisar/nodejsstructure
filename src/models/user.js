const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    password: { 
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: false,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
