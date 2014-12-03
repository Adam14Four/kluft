define(function(require, exports, module) {

    var Marionette = require('marionette');
    var app = new Backbone.Marionette.Application();

    app.addRegions({
        contentRegion: '#region-content',
        headerRegion: '#region-header',
        footerRegion: '#region-footer'
    });

    app.Behaviors = app.Behaviors || {};

    Marionette.Behaviors.behaviorsLookup = function() {
        return app.Behaviors;
    };

    app.addInitializer(function() {

        Backbone.history.start({
            pushState: true
        });


    });

    window.app = app;

    return app;

});
