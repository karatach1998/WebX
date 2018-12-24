const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    sessionId: {type: String, required: false},
    role: {type: String, required: false, default: 'user'}
});

module.exports = mongoose.model('Users', UserSchema);