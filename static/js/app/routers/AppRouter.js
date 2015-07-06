define(function (require, exports, module) {
    var Marionette = require('marionette'),
        AppController = require('app/controllers/AppController');

    return Marionette.AppRouter.extend({

        appRoutes: {
            '(/)': 'home',
            'collections(/)': 'collections',
            'collections(/):beyond-luxury(/)': 'beyondLuxury',
            'collections(/):kluft-signature(/)': 'kluftSignature',
            'collections(/):royal-sovereign(/)': 'royalSovereign',
            'collections(/):royal-sovereign-latex(/)': 'royalSovereignLatex',
            'tradition(/)': 'tradition',
            'method(/)': 'method',
            'kluft-standard(/)': 'kluftStandard',
            'retailers(/)(/:address)': 'retailers',
            'contact(/)': 'contact',
            '*default': 'default'

        },

        initialize: function() {
            this.on('route', function(route, params) {
                ga('send', 'pageview', route);
            });
        },

        controller: new AppController()
    });

});
