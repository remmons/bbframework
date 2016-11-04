define([
    'underscore',
    'framework/base-view'
], function (_, BaseView) {
    var realtorView =  BaseView.extend({
        el: '#add-realtor',

        events: {
            'click .button': 'handleSubmit'
        },

        initialize: function () {
            this.subscribeOnce('aw:realtorView-render', this.handleRealtorDisplay);
        },

        handleSubmit: function () {
            var data = {
                first: this.$el.find('#realtor-first-name').val(),
                last: this.$el.find('#realtor-last-name').val(),
                address: this.$el.find('#realtor-address').val(),
                email: this.$el.find('#realtor-email').val()
            };

            this.publish('aw:add-realtor', data);
        },

        handleRealtorDisplay: function () {
            this.$el.show();
        }

    });

    return realtorView;

});
