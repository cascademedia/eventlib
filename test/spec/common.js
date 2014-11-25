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
