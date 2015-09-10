"use strict";
var API = require('booljs-api');

/**
 * @function
 * Sets CORS headers
 * @param  {HTTPResponse} res - The response object
 */
function allowCrossDomain(res){
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
}

/**
 * @class CORSMiddleware
 */
var middleware = new API.Plugins.Middleware();

middleware.name = 'Booljs-CORS';
middleware.type = 'routeMiddleware';
/**
 * @function CORSMiddleware#action
 * @param  {String} url    The URL of the route
 * @param  {Object} router The application router
 * @return {Function}      A middleware object
 */
middleware.action = function (url, router) {
    router.options(url, function (req, res, next) {
        allowCrossDomain(res);
        res.status(200).end();
    });
    return function (req, res, next) {
        allowCrossDomain(res);
        next();
    };
};
middleware.policyType = 'mandatory';
/**
 * Describe mandatory policies to enable the feature
 * @type {Object}
 */
middleware.policies = {
    cors: true
};

module.exports = middleware;
