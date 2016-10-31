define(['underscore', 'backbone', './base-mixin', './page-manager'], function (_, Backbone, base, pageManager) {

    var originalDelegation = Backbone.View.prototype.delegateEvents;
    var originalUnDelegation = Backbone.View.prototype.undelegateEvents;

    var BaseView = Backbone.View.extend(
        _.extend({}, base, {

            /**
             * Loads the page manager
             *
             * @private
             * @property pageManager
            **/
            pageManager: new pageManager(),

            /**
             * EXTENDS BACKBONE
             * Extends the current method to allow for custom events to be delegated
             *
             * @private
             * @method delegateEvents
            **/
            delegateEvents: function () {
                originalDelegation.apply(this, arguments);
                this.toggleCustomEvents('subscribe');

                return this;
            },

            /**
             * EXTENDS BACKBONE
             * extends the current method to allow for custom events to be undelegated
             *
             * @private
             * @method undelegateEvents
            **/
            undelegateEvents: function () {
                originalUnDelegation.apply(this, arguments);
                this.toggleCustomEvents('stopSubscribing');

                return this;
            },

            /**
             * Allows views to have a customEvents object that delegates to the pub/sub event object.
             *
             * @private
             * @method toggleCustomEvents
            **/
            toggleCustomEvents: function (listenType) {
                var key;
                if (this.customEvents) {
                    for (key in this.customEvents) {
                        this[listenType](key, this[this.customEvents[key]]);
                    }
                }
            }
        })
    );

    return BaseView;

});
