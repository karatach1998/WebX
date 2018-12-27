const _ = require('underscore');

const config = {
    driver: {
        host: '127.0.0.1',
        port: 4444,
        desiredCapabilities: {
            browserName: 'chrome'
        },
        deprecationWarnings: false,
        logLevel: 'silent'
    }
};

module.exports = config;
