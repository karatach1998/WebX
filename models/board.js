const mongoose = require('mongoose');
const { Schema } = mongoose;
const timestamp = require('mongoose-timestamp');
const axios = require('axios');

const getAverageColor = require('../utils/averageColor');
const { rgbToHex } = require('../utils/colorConverter');

const BoardSchema = new Schema({
    title: { type: String, required: true },
    columns: { type: Array, required: true, default: [] },
    bgUrl: { type: String, required: true },
    bgColor: { type: String, required: true, default: '#000000'},
    stared: { type: Boolean, required: true, default: false },
    lastRequestTime: { type: Date,  required: true, default: Date.now }
});

BoardSchema.plugin(timestamp, {
    updatedAt: 'lastRequestTime'
});

async function recomputeColor(next) {
    console.log('recomputeColor');
    const {bgUrl} = this.getUpdate();
    if (bgUrl) {
        const [r, g, b] = await getAverageColor(bgUrl);
        this.bgColor = {r, g, b};
        console.log(this.bgColor);
        this.bgColor = rgbToHex(this.bgColor);
        console.log('color');
        console.log(this.bgColor);
        this.setUpdate({bgUrl, bgColor: this.bgColor});
    }
    next();
}

BoardSchema.pre('save', recomputeColor);
BoardSchema.pre('updateOne', recomputeColor);

module.exports = mongoose.model('Boards', BoardSchema);