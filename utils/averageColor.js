const ColorThief = require('color-thief-jimp');
const Jimp = require('jimp');

module.exports = async (imgUrl) => {
    return await Jimp.read(imgUrl).then((sourceImage) => {
        // if (err) {
        //     console.error(err);
        //     return '#000000';
        // }

        console.log(`Downloaded: ${imgUrl}`);
        return ColorThief.getColor(sourceImage);
    });
}