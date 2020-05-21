'use strict';

module.exports = function (app) {
    const Dog     = app.dao.Dog;
    const json    = new app.views.Json();

    return {
        list: function (req, res, next) {
            var dog = new Dog();
            json.promise(dog.list(), res, next);
        },
        error: function (req, res) {
            throw new app.Error(401, 'E_CUSTOM_ERROR');
        }
    };
};
