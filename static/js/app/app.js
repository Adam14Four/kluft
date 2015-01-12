define(function(require, exports, module) {

    var Marionette = require('marionette'),
        TransitionRegion = require('app/regions/TransitionRegion');

    var app = new Backbone.Marionette.Application();

    app.addRegions({
        contentRegion: {
            selector: '#region-content',
            regionClass: TransitionRegion
        },
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
