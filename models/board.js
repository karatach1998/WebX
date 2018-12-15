const mongoose = require('mongoose');
const { Schema } = mongoose;
const timestamp = require('mongoose-timestamp');

const Task = require('../models/task');

const BoardSchema = new Schema({
    title: { type: String, required: true },
    columns: { type: Array, required: true },
    bgUrl: { type: String, required: true },
    stared: { type: Boolean, required: true },
    lastRequestTime: { type: Date,  required: true, default: Date.now }
});

BoardSchema.plugin(timestamp, {
    updatedAt: 'lastRequestTime'
});

module.exports = mongoose.model('Boards', BoardSchema);