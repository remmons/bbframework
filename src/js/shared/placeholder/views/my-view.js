define(['underscore', 'framework/base-view'], function (_, BaseView) {
    return BaseView.extend({

        customEvents: {
            'page:scroll-after': 'handleScroll'
        },

        initialize: function someOtherModuleInitialize () {
            //_.bindAll(this, 'someEvent');
        },

        render: function () {
            //render the module
        },

        handleScroll: function () {
            console.log('scroll handler from shared module', new Date().getTime());
        }

    });

});
