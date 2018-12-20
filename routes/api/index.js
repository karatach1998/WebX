const _ = require('underscore');

module.exports = (app) => {
    _(['boards', 'tasks', 'users']).each((file) => {
        require('./' + file)(app);
    });
};