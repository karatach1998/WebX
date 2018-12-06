const _ = require('underscore');

exports.hexToRgb = function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

exports.rgbToHsl = function(c) {
    const r = c.r / 255;
    const g = c.g / 255;
    const b = c.b / 255;
    const chanels = [
        {chanel: r, index: 0, x: g, y: b},
        {chanel: g, index: 2, x: b, y: r},
        {chanel: b, index: 4, x: r, y: g}
    ];

    const {chanel: max, index, x, y} = _(chanels).max('chanel');
    const {chanel: min} = _(chanels).min('chanel');
    const h = (index + (x - y)/(max - min)) * 60;
    const l = (max + min) / 2;
    const s = (l < 0.5)
        ? (max - min) / (max + min)
        : (max - min) / (2 - (max + min));

    // console.log({h, s, l});
    return {h, s: s*100, l: l*100};
}
