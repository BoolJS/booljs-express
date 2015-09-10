"use strict";

module.exports = (function() {

    var pattern = require('route-pattern')
    ,   corsEnabled = [];

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

    return {

        registerRoute: function(url, method){
            corsEnabled.push({
                url: url,
                method: method
            });
        },

        match: function(req, res, next){

            for(var route in corsEnabled){
                var rt = corsEnabled[route];
                if(
                    pattern.fromString(rt.url.toLowerCase())
                        .matches(req.path.toLowerCase()) &&
                    req.method == rt.method.toUpperCase()
                ){
                    allowCrossDomain(res);
                }
            }

            next();
        },

        matchUrl: function(req, res, next){

            for(var route in corsEnabled){
                var rt = corsEnabled[route];
                if(pattern.fromString(rt.url).matches(req.path)){
                    allowCrossDomain(res);
                }
            }

            next();

        }



    };

})();
