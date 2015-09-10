"use strict";

module.exports = function(){

    function execute(err, data, res){

        var status = err ? (err.status || 500) : (data.status || 200);

        var obj = {
            success: !err
        };

        if(err){
            obj.error = _.omit(err, 'status');
            obj.error.message = err.message || 'internal_server_error';
        } else {
            if(data) obj.data = _.isArray(data) ? data : _.omit(data, 'status');
        }

        res.status(status).json(obj);

    }

    var plugin = {
        standard: function(data, res){
            execute(null, data, res);
        },
        error: function(err, res){
            execute(err, null, res);
        },
        promise: function(action, res, next){
            action.then(function(data){
                plugin.standard(data, res);
            }).catch(next);
        }
    };

    return plugin;

};
