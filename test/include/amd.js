;(function (window, undefined) {
    'use strict';

    var definitions = {};
    window.define = function (definition, dependencies, callback) {
        definitions[definition] = {
            dependencies: dependencies,
            callback: callback
        };
    };

    window.isDefined = function (definition) {
        return definitions[definition] !== undefined;
    };

    window.getDefinition = function (definition) {
        return definitions[definition] !== undefined ? definitions[definition].callback.apply() : undefined;
    };
})(window);
