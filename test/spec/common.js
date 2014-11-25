describe('Register modules', function () {
    it('registers as a global module', function () {
        expect(window.Publisher).toBeDefined();
    });

    it('registers as an AMD module', function () {
        expect(window.isDefined('eventlib')).toBe(true);
    });

    it('AMD module returns instance of publisher', function () {
        expect(window.getDefinition('eventlib') instanceof Publisher).toBe(true);
    });
});

describe('Subscribe to topics', function () {
    var instance = new Publisher();

    it('subscribing to a new topic creates topic', function () {
        var callback = function () {};

        instance.subscribe('test_topic', callback);

        expect(instance.subscribers['test_topic']).toBeDefined();
        expect(instance.subscribers['test_topic'].length).toBe(1);
        expect(instance.subscribers['test_topic'][0]).toBe(callback);
    });

    it('subscribing to an existing topic appends to topic', function () {
        var callback = function () {};

        instance.subscribe('test_topic', callback);

        expect(instance.subscribers['test_topic'].length).toBe(2);
        expect(instance.subscribers['test_topic'][1]).toBe(callback);
    });
});

describe('Unsubscribe from topics', function () {
    var instance = new Publisher();

    it('cannot unsubscribe from non-existent topic', function () {
        var callback = function () {};

        expect(instance.unsubscribe('not-existent', callback)).toBe(false);
    });

    it('cannot unsubscribe from topic when not already subscribed', function () {
        var callback = function () {};

        instance.subscribe('test_topic', function () {});

        expect(instance.unsubscribe('test_topic', callback)).toBe(false);
    });

    it('can unsubscribe from topic', function () {
        var callback1 = function () {};
        var callback2 = function () {};
        var callback3 = function () {};

        instance.subscribe('new_topic', callback1);
        instance.subscribe('new_topic', callback2);
        instance.subscribe('new_topic', callback3);

        expect(instance.unsubscribe('new_topic', callback2)).toBe(true);

        expect(instance.subscribers['new_topic'].length).toBe(2);
        expect(instance.subscribers['new_topic'][0]).toBe(callback1);
        expect(instance.subscribers['new_topic'][1]).toBe(callback3);
    });

    it('topic is deleted when no more subscribers exist', function () {
        var callback = function () {};

        instance.subscribe('topic_delete', callback);

        expect(instance.unsubscribe('topic_delete', callback)).toBe(true);
        expect(instance.subscribers['topic_delete']).toBeUndefined();
    });
});

describe('Publish topics', function () {
    var instance = new Publisher();

    describe('synchronous publishing', function () {
        it('can publish topic with a single subscriber', function () {
            var value = false;
            var callback = function () {
                value = true;
            };

            instance.subscribe('sync_single_topic', callback);
            instance.publish('sync_single_topic', undefined, false);

            expect(value).toBe(true);
        });

        it('can publish topic with multiple subscribers', function () {
            var value1 = false;
            var value2 = false;

            var callback1 = function () {
                value1 = true;
            };

            var callback2 = function () {
                value2 = true;
            };

            instance.subscribe('sync_multiple_topic', callback1);
            instance.subscribe('sync_multiple_topic', callback2);
            instance.publish('sync_multiple_topic', undefined, false);

            expect(value1).toBe(true);
            expect(value2).toBe(true);
        });
    });

    describe('asynchronous publishing', function () {
        var value1 = true;
        var value2 = true;

        it('can publish topic with a single subscriber', function (done) {
            value1 = false;
            var callback = function () {
                value1 = true;
                done();
            };

            instance.subscribe('async_single_topic', callback);
            instance.publish('async_single_topic');
        });

        it('can publish topic with multiple subscribers', function (done) {
            value1 = false;
            value2 = false;

            var callback1 = function () {
                value1 = true;
            };

            var callback2 = function () {
                value2 = true;
                done();
            };

            instance.subscribe('async_multiple_topic', callback1);
            instance.subscribe('async_multiple_topic', callback2);
            instance.publish('async_multiple_topic');
        });

        afterEach(function () {
            expect(value1).toBe(true);
            expect(value2).toBe(true);
        });
    });

    describe('common', function () {
        it('publisher can pass data to subscriber', function () {
            var value = false;
            var callback = function (data) {
                if (data !== undefined) {
                    value = data.value;
                }
            };

            instance.subscribe('data_test', callback);

            instance.publish('data_test', {value: true}, false);

            expect(value).toBe(true);
        });
    });
});
