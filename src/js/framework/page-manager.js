var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');
var base = require('./base-mixin');

module.exports = Backbone.View.extend(
    _.extend({}, base, {

        el: $(window),

        $document: $(document),

        ticking: false,

        throttleCount: 0,

        isReady: false,

        initialize: function () {
            _.bindAll(this,
                'handlePageReady',
                'handleKeyDown',
                'handleScroll'
            );

            // wait for dom ready before triggering events
            this.$document.ready(this.handlePageReady);
        },

        /**
         * Excutes events when DOM Ready occurs
         *
         * @private
         * @method handlePageReady
        **/
        handlePageReady: function () {
            this.isReady = true;
            this.$el.on('scroll', this.handleScroll);
            this.$el.on('keydown', this.handleKeyDown);
        },

        /**
         * Emits events while the page is scrolling
         *
         * @private
         * @method handleScrollUnthrottled
        **/
        handleScroll: function (e) {
            var self = this;

            if (!this.ticking) {
                window.requestAnimationFrame(function () {
                    
                    //emit events at a frame rate of 60FPS
                    self.publish('page:scroll-unthrottled', e);

                    //emit events at a framerate of about 10FPS
                    self.throttleCount += 1;
                    if (self.throttleCount % 6 == 0) {
                        self.throttleCount = 0;
                        self.publish('page:scroll', e);
                    }

                    //emit a single event after the scroll ends
                    self.handleScrollDebounce(e);

                    //ready for the next scroll event
                    self.ticking = false;
                });
            }

            this.ticking = true;
        },

        /**
         * Adds a trailing scroll event
         *
         * @private
         * @method handleScrollDebounce
        **/
        handleScrollDebounce: _.debounce(function (e) {
            this.throttleCount = 0;
            this.publish('page:scroll', e);
            this.trigger('page:scroll-after', e);
        }, 100),

        /**
         * Trigger events when certain keys are pressed
         *
         * @private
         * @method handleKeyDown
        **/
        handleKeyDown: function (e) {
            console.log('keydown', e);
        }

    })

);
