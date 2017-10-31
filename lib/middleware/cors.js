'use strict';

const { RouteMiddleware } = require('booljs.api');
const _ = require('underscore');

/** @ignore */
function headers (response, extraHeaders) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header(
        'Access-Control-Allow-Methods',
        ['GET', 'POST', 'PUT', 'DELETE'].join(', ')
    );
    response.header(
        'Access-Control-Allow-Headers',
        (extraHeaders || []).concat([
            'Authorization', 'Accept', 'Content-Type', 'X-Requested-With',
            'Cache-Control'
        ]).join(', ')
    );
    response.header(
        'Access-Control-Expose-Headers',
        (extraHeaders || []).join(', ')
    );
}

module.exports = class ExpressCORS extends RouteMiddleware {
    constructor () {
        super('booljs-cors', 'mandatory', { cors: true });
    }

    action (instance, router, route) {
        var extraHeaders = route.corsExtraHeaders ? (
            _.isArray(route.corsExtraHeaders) && route.corsExtraHeaders
        ) || [ route.corsExtraHeaders ] : [];
        router.options(route.url, function (req, res) {
            headers(res, extraHeaders);
            res.status(200).end();
        });
        return function (request, response, next) {
            headers(response, extraHeaders);
            next();
        };
    }
};
