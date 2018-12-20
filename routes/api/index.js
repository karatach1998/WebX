const _ = require('underscore');

module.exports = (app) => {
    _(['boards', 'users']).each((file) => {
        require('./' + file)(app);
    });
};