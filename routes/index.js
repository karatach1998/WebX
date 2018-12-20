const _ = require('underscore');

module.exports = (app) => {
    _(['api']).each((file) => {
        require('./' + file)(app);
    });
};