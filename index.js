'use strict';

var API         = require('bool.js/api')
,   resolver    = require('./lib/utils/resolve');

module.exports = new API.ServerLoader(
    'booljs-express', // Name
    require('./lib/server'), // Functions
    [ resolver('lib/middleware/cors') ] // Dependants
);
