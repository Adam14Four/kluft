/*
    Require.js config
    http://requirejs.org/docs/api.html#config
*/

requirejs.config({

    waitSeconds: 30,

    paths: {

        // Main libs
        'backbone': 'libs/backbone',
        'underscore': 'libs/underscore',
        'jquery': 'libs/jquery',
        'marionette': 'libs/backbone.marionette',
        'backbone.radio': 'libs/backbone.radio',
        'Handlebars': 'libs/handlebars',

        // Main plugins
        'hbs': 'libs/hbs',
        'i18n': 'libs/i18n',
        'i18nprecompile': 'libs/i18nprecompile',
        'json2': 'libs/json2',

        // App specific plugins
        'velocity': 'libs/velocity',
        'async': 'libs/async',

        // shortcut to templates
        templates: './templates'

    },

    shim: {
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'velocity': {
            deps: ['jquery']
        }
    },

    hbs: {
        templateExtension: "html",
        disableI18n: true,
        disableHelpers: false
    }

});
