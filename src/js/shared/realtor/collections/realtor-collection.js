define(['underscore', 'framework/base-collection'], function (_, BaseCollection) {
    var realtorCollection = BaseCollection.extend({

        url: 'https://beta.randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole',

        initialize: function () {
            this.fetch();
            this.subscribe('aw:add-realtor', this.handleAdd);
        },

        sync: function (method, model, options) {
            options.cache = true;
            return Backbone.sync(method, model, options);
        },

        parse: function (response) {
            //edit the data before it goes into the collection
            return response;
        },

        handleAdd: function (data) {
            this.add(data);
        }

    });

    return realtorCollection;
});
