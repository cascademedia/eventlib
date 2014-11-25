;(function (window, define, undefined) {
    'use strict';

    var Publisher = function () {
        this.subscribers = {};
    };

    Publisher.prototype = {
        subscribers: undefined,
        publish: function (topic, data, async) {
            var subscribers = this.subscribers;
            var callback = function () {
                var topicSubscribers = subscribers[topic];

                if (topicSubscribers !== undefined) {
                    for (var index in topicSubscribers) {
                        if (topicSubscribers.hasOwnProperty(index)) {
                            topicSubscribers[index].apply(undefined, [data]);
                        }
                    }
                }
            };

            if (async === false) {
                callback.apply(this);
            } else {
                setTimeout(
                    callback,
                    0
                );
            }
        },
        subscribe: function (topic, callback) {
            var topicSubscribers = this.subscribers[topic];

            if (topicSubscribers === undefined) {
                this.subscribers[topic] = [];
                topicSubscribers = this.subscribers[topic];
            }

            topicSubscribers.push(callback);
        },
        unsubscribe: function (topic, callback) {
            var result = false;
            var topicSubscribers = this.subscribers[topic];
            var index;

            if (topicSubscribers !== undefined) {
                index = topicSubscribers.indexOf(callback);
                if (index !== -1) {
                    topicSubscribers.splice(index, 1);

                    if (topicSubscribers.length === 0) {
                        delete this.subscribers[topic];
                    }

                    result = true;
                }
            }

            return result;
        }
    };

    // Register with globals
    if (window !== undefined) {
        window.Publisher = Publisher;
    }

    // Register with AMD
    if (define !== undefined) {
        define('eventlib', [], function () {
            return new Publisher();
        });
    }
})(
    typeof window !== 'undefined' ? window : undefined,
    typeof define !== 'undefined' ? define : undefined
);
