define([
    'underscore',
    './base-mixin'
], function (_, base) {
    var BaseCollection = Backbone.Collection.extend(
        _.extend({}, base, {

        })
    );

    return BaseCollection;
});
