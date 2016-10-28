var BaseView = require('./framework/base-view');

module.exports = BaseView.extend({
	
	customEvents: {
		'aw:module-init': 'handleModuleInit'
	},

	initialize: function () {

	},

	handleModuleInit: function () {
		console.log('handle module init');
	}

});
