define([
    'underscore',
    'framework/base-view',
    'shared/placeholder/templates/placeholder.hbs'
], function (_, BaseView, template) {
    return BaseView.extend({
        el: '#label-container',

        customEvents: {
            'page:scroll': 'handleScroll'
        },

        initialize: function someOtherModuleInitialize () {
            this.render(new Date());
        },

        render: function (timestamp) {
            var html = template({
                type: 'notice',
                label: 'Notice, I was last updated at ' + timestamp
            });

            this.$el.html(html);
        },

        handleScroll: function () {
            this.render(new Date());
        }

    });

});
