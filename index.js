/* global process */
if (process.env.NODE_ENV === 'production')
    module.exports = require('./dist/rongcapital.prod.js');
else 
    module.exports = require('./dist/rongcapital.dev.js');
