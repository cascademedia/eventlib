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
