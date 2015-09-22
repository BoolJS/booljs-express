"use strict";

var API;
try {
    API = require('bool.js/api');
} catch (err){
    API = require('booljs-api');
}

var headers = require('./headers');

module.exports = new API.RouteMiddleware('booljs-cors', {
    action: function (url, router) {
        router.options(url, function (req, res, next) {
            headers(res);
            res.status(200).end();
        });
        return function (req, res, next) {
            headers(res);
            next();
        };
    },
    type: 'mandatory',
    policies: {
        cors: true
    }
});
