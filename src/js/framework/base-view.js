define([
    'underscore',
    'backbone',
    'jquery',
    './base-mixin',
    './page-manager'
], function (_, Backbone, $, base, pageManager) {

    var originalDelegation = Backbone.View.prototype.delegateEvents;
    var originalUnDelegation = Backbone.View.prototype.undelegateEvents;

    var BaseView = Backbone.View.extend(
        _.extend({}, base, {

            /**
             * Loads the page manager
             *
             * @public
             * @property pageManager
            **/
            pageManager: new pageManager(),

            /**
             * Placeholder for views that may define the handleDomReady method
             *
             * @public
             * @property handleDomReady
            **/
            handleDomReady: undefined,

            /**
             * Loads the page manager
             *
             * @private
             * @property _hasDomDelegated
            **/
            _hasDomDelegated: false,

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

                // adds handleDomReady
                if (this.handleDomReady && !this._hasDomDelegated) {
                    this._hasDomDelegated = true;

                    if ($.isReady) {
                        _.bindAll(this, 'handleDomReady');
                        _.defer(this.handleDomReady);
                    } else {
                        this.subscribeOnce('page:ready', this.handleDomReady);
                    }
                }

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
