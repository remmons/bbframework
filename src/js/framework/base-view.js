var _ = require('underscore');
var Backbone = require('backbone');
var base = require('./base-mixin');
var pageManager = require('./page-manager');

var originalDelegation = Backbone.View.prototype.delegateEvents;
var originalUnDelegation = Backbone.View.prototype.undelegateEvents;

module.exports = BaseView = Backbone.View.extend(
	_.extend({}, base, {
        pageManager: new pageManager(),

        /**
         * Allows views to have a customEvents object that delegates to the pub/sub event object.
         *
         * @private
         * @method _toggleCustomEvents
        **/
        _toggleCustomEvents: function (listenType) {
            var key;
            if (this.customEvents) {
                for (key in this.customEvents) {
                    this[listenType](key, this[this.customEvents[key]]);
                }
            }
        },

        /**
         * EXTENDS BACKBONE 
         * Extends the current method to allow for custom events to be delegated
         *
         * @private
         * @method delegateEvents
        **/
        delegateEvents: function () {
            originalDelegation.apply(this, arguments);
            this._toggleCustomEvents('subscribe');

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
            this._toggleCustomEvents('stopSubscribing');

            return this;
        }

	})

);
