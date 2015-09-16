'use strict';

var API         = require('booljs-api')
,   resolver    = require('./lib/utils/resolve');

module.exports = new API.ServerLoader(
    'booljs-express', // Name
    require('./lib/server'), // Functions
    [ resolver('lib/middleware/cors') ] // Dependants
);
