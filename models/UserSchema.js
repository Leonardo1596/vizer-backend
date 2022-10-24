const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    }
});


module.exports = mongoose.model('users', userSchema)