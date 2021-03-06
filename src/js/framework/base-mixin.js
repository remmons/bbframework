define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var BaseMixin = {

        /**
         * @private
         *
         * Pub/Sub Backbone Event object for use with triggering and subscribing to messages
        **/
        _pubSub: _.extend({}, Backbone.Events),

        /**
         * Trigger events across all modules
         *
         * @public
         * @method publish
         * @param eventName {String} The name of the event to be triggered
         * @param args {Mixed} Information that is sent with the trigger.
        **/
        publish: function () {
            this._pubSub.trigger.apply(this._pubSub, arguments);
            return this;
        },

        /**
         * Subscribes to events broadcasted on the framework
         *
         * @public
         * @method subscribe
         * @param [view] {Object} An optional backbone view
         * @param eventName {String} The name of the event to be triggered
         * @param callback {Mixed} The callback to be triggered
         *
         * ex: this.subscribe('aw:my event-action', this.handleMyEvent)
        **/
        subscribe: function () {
            this._subscribeHelper('listenTo', arguments);
            return this;
        },

        /**
         * Subscribe to a single event broadcasted by the framework
         *
         * @public
         * @method subscribeOnce
         * @param [view] {Object} An optional backbone view
         * @param eventName {String} The name of the event to be triggered
         * @param callback {Mixed} The callback to be triggered
         *
         * ex: this.subscibeOnce('aw:myevent-action', this.handleMyEvent);
        **/
        subscribeOnce: function () {
            this._subscribeHelper('listenToOnce', arguments);
        },

        /**
         * Stop subscribing to a custom event broadcasted by the framework
         *
         * @public
         * @method stopSubscribing
         * @param [view] {Object} An optional backbone view
         * @param eventName {String} The name of the event to be triggered
         * @param callback {Mixed} The callback to be triggered
        **/
        stopSubscribing: function () {
            this._subscribeHelper('stopListening', arguments);
        },

        /**
         * Helper function to build subscription functions
         *
         * @private
         * @method subscribeHelper
         * @param [view] {Object} An optional backbone view
         * @param eventName {String} The name of the event to be triggered
         * @param callback {Mixed} The callback to be triggered
        **/
        _subscribeHelper: function (type, args) {
            if (_.isString(args[0])) {
                this[type](this._pubSub, args[0], args[1]);
            } else {
                this[type](args[0], args[1], args[2]);
            }
        },
    };

    return BaseMixin;
});
