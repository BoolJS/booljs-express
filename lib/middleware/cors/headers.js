'use strict';

/**
 * @function
 * Sets CORS headers
 * @param  {HTTPResponse} res - The response object
 */
module.exports = function(res){
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Methods',
        ['GET', 'POST', 'PUT', 'DELETE'].join(', ')
    );
    res.header(
        'Access-Control-Allow-Headers',
        [
        'Authorization', 'Accept', 'Content-Type', 'X-Requested-With',
        'Cache-Control'
        ].join(', ')
    );
};
