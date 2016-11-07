define(['underscore', 'backbone', 'jquery', './base-mixin'], function (_, Backbone, $, base) {

    var PageManger = Backbone.View.extend(

        _.extend({}, base, {

            /**
             * Sets the scope of the backbone view to window
             *
             * @private
             * @property el
            **/
            el: $(window),

            /**
             * Keeps track of the state of the scroll handler so the browser doesn't do too
             * much when scrolling
             *
             * @private
             * @property ticking
            **/
            ticking: false,

            /**
             * Keeps track of how many times the scroll event fires so it can be throttled
             *
             * @private
             * @property throttleCount
            **/
            throttleCount: 0,

            /**
             * Kicks everything off on dom-ready
             *
             * @private
             * @method initialize
            **/
            initialize: function () {
                _.bindAll(this,
                    'handlePageReady',
                    'handleKeyDown',
                    'handleScroll'
                );

                this.$el.ready(this.handlePageReady);
            },

            /**
             * Excutes events when DOM Ready occurs
             *
             * @private
             * @method handlePageReady
            **/
            handlePageReady: function () {
                this.publish('page:ready');
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

                //while the page scrolls and the browser isn't doing any work
                if (!this.ticking) {
                    window.requestAnimationFrame(function () {

                        //emit events at a frame rate of 60FPS
                        self.publish('page:scroll-unthrottled', e);

                        //emit events at a framerate of about 10FPS
                        self.throttleCount += 1;
                        if (self.throttleCount % 6 === 0) {
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
             * Adds a trailing scroll event after 100 ms
             *
             * @private
             * @method handleScrollDebounce
            **/
            handleScrollDebounce: _.debounce(function (e) {
                this.throttleCount = 0;
                this.publish('page:scroll', e);
                this.publish('page:scroll-after', e);
            }, 100),

            /**
             * Trigger events when certain common keys are pressed
             *
             * @private
             * @method handleKeyDown
            **/
            handleKeyDown: function (e) {
                var key = e.keyCode;

                // 27 is the value for ESCAPE
                if (key === 27) {
                    this.publish('page:key-esc');
                }
            }
        })
    );

    return new PageManger();
});
