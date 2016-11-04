# Backbone Framework
## Global Methods
#### publish
Publishes an event for everything in the framework to listen to.
```
this.publish('event-name', arguments);
```
#### subscribe
Subscribes to any of the events that are published
```
this.subscribe('event-name', this.methodHandler);
```
#### subscribeOnce
Similar to subscribe but only listens to one event
```
this.subscribeOnce('event-name', this.methodHandler);
```
#### stopSubscribing
Removes the event listener when it is no longer needed.
```
this.stopSubscribing('event-name', this.methodHandler);
```


## BaseView, BaseModel, and BaseCollection
Extending the framework's base modules can be done like followed:
```
define([
    'framework/base-view'
], function (BaseView) {
    return BaseView.extend({

        initialize: function () {}

    });

});
```


## View methods
#### customEvents
Similar to how events can be used, the customEvents object can be used to listen to the framework's global published events
```
BaseView.extend({

    customEvents: {
        'module:event-name': 'handleEventName'
    },

    handleEventName: function () {
        // custom codes
    }

});
```

#### handleDomReady
For some modules, you need to wait for the full DOM tree is ready to be able execute some code. Adding $.ready in your code isn't exactly pretty, especially since you have to add `_.bindAll(this, 'methodName')` to your initialize function due to scope differences.
```
BaseView.extend({

    handleDomReady: function () {
        // code that executes after DOM Ready
        this.setElement('#my-element');
    }

});
```


## Custom Events
#### page:scroll-unthrottled
A page scroll event that smartly throttles your code by using requestAnimationFrame and keeping things to about 60fps.

#### page:scroll
A page scroll event that throttles your code to about 10fps. This is sufficient for most things that need scroll behavior

#### page:scroll-after
A page scroll event that fires 100ms after you stop scrolling.