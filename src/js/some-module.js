var _ = require('underscore');
var BaseView = require('./framework/base-view');

module.exports = BaseView.extend({
	
	customEvents: {
		'page:scroll-unthrottled': 'handleScroll'
	},

	initialize: function someOtherModuleInitialize () {
		_.bindAll(this, 'delayedEvent');
		window.setTimeout(this.delayedEvent, 3000);
	},

	delayedEvent: function someOtherModuleDelayedEvent () {
		this.publish('aw:module-init');
	},

	handleScroll: function () {
		//console.log('scroll handler from base view', new Date().getTime());
	}

});
