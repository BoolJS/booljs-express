'use strict';

const _ = require('underscore');

exports.execute = function (error, data, response, statusCode) {
    let status = error ? (error.status || 500) : (statusCode || 200);

    let object = { success: !error };

    if (error !== undefined && error !== null) {
        object.error = _.omit(error, 'status');
        object.error.message = error.message || 'internal_server_error';
    } else if (data !== undefined && data !== null) {
        object.data = data;
    }

    response.status(status).json(object);
};

module.exports = class JsonView {
    standard (data, res, statusCode) {
        return exports.execute(null, data, res, statusCode);
    }

    error (error, response) {
        return exports.execute(error, null, response);
    }

    async promise (action, response, next, statusCode) {
        try {
            let data = await action;
            return this.standard(data, response, statusCode);
        } catch (error) {
            return this.error(error, response);
        }
    }
};
