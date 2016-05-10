"use strict";

var API = require('booljs-api');

/** @ignore */
function headers(res, extraHeaders){
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Methods',
        ['GET', 'POST', 'PUT', 'DELETE'].join(', ')
    );
    res.header(
        'Access-Control-Allow-Headers',
        (extraHeaders || []).concat([
            'Authorization', 'Accept', 'Content-Type', 'X-Requested-With',
            'Cache-Control'
        ]).join(', ')
    );
    res.header('Access-Control-Expose-Headers',(extraHeaders || []).join(', '));
}


module.exports = class ExpressCORS extends API.RouteMiddleware{
    constructor(){
        super('booljs-cors', 'mandatory', {
            cors: true
        });
    }

    action(_instance, router, route) {
        var extraHeaders = route.corsExtraHeaders ? (
            _.isArray(route.corsExtraHeaders) && route.corsExtraHeaders
        ) || [ route.corsExtraHeaders ] : [];
        router.options(route.url, function (req, res) {
            headers(res, extraHeaders);
            res.status(200).end();
        });
        return function (req, res, next) {
            headers(res, extraHeaders);
            next();
        };
    }
};