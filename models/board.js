const mongoose = require('mongoose');
const { Schema } = mongoose;
const timestamp = require('mongoose-timestamp');
const axios = require('axios');

const getAverageColor = require('../utils/averageColor');
const { rgbToHex } = require('../utils/colorConverter');

const BoardSchema = new Schema({
    ownerId: { type: String,  required: true },
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

async function recomputeColor(bgUrl) {
    const [r, g, b] = await getAverageColor(bgUrl);
    const res = rgbToHex({r, g, b});

    console.log('color');
    console.log({r, g, b});
    console.log(res);

    return res;
}

BoardSchema.pre('save', async function(next) {
    const {bgUrl} = this;

    if (bgUrl) this.bgColor = await recomputeColor(bgUrl);
    next();
});

BoardSchema.pre(/^update/, async function(next) {
    const {bgUrl} = this.getUpdate();

    if (bgUrl) this.setUpdate({bgColor: await recomputeColor(bgUrl)});
    next();
});

module.exports = mongoose.model('Boards', BoardSchema);