define([
    'underscore',
    './base-mixin'
], function (_, base) {
    var BaseModel = Backbone.Model.extend(
        _.extend({}, base, {

        })
    );

    return BaseModel;
});