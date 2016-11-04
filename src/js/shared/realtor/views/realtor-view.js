define([
    'underscore',
    'framework/base-view',
    'shared/realtor/collections/realtor-collection',
    'shared/realtor/templates/realtors.hbs'
], function (_, BaseView, RealtorCollection, template) {

    var realtorView =  BaseView.extend({
        el: '#person-container',

        events: {
            'click .person': 'handleClick'
        },

        collection: new RealtorCollection(),

        initialize: function () {
            _.bindAll(this, 'render');
            this.collection.on('sync add', this.render);
        },

        render: function () {
            // build the template HTML
            var html = template({
                data: this.collection.toJSON(),
                color: Math.ceil(Math.random() * 899 + 100)
            });

            // add the template HTML to the dom
            this.$el.html(html);

            // let everyone know it's ready
            this.publish('aw:realtorView-render');
        },

        handleClick: function () {
            this.render();
        }

    });

    return realtorView;

});
