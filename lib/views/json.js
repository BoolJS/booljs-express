'use strict';

exports.execute = function (error, data, response, status = 200) {
    if (error !== undefined && error !== null) {
        status = error.status || 500;
        delete error.status;
    }

    response.status(status).json({
        success: error === undefined || error === null || !error,
        data,
        error
    });
};

module.exports = class JsonView {
    errorMiddlewareHandler (error, req, res, next) {
        this.error(error, res);
    }

    standard (data, res, statusCode) {
        return exports.execute(undefined, data, res, statusCode);
    }

    error (error, response) {
        return exports.execute(error, undefined, response);
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
