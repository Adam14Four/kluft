define(function (require, exports, module) {
    var Marionette = require('marionette'),
        AppController = require('app/controllers/AppController');

    return Marionette.AppRouter.extend({

        appRoutes: {
            '(/)': 'index',
            'collections(/)': 'collections',
            'collections(/):beyond-luxury(/)': 'beyondLuxury',
            'collections(/):kluft-signature(/)': 'kluftSignature',
            'collections(/):royal-sovereign(/)': 'royalSovereign',
            'collections(/):royal-sovereign-latex(/)': 'royalSovereignLatex',
            'earl-kluft(/)': 'about',
            'method(/)': 'method',
            'kluft-standard(/)': 'kluftStandard',
            'retailers(/)(/:address)': 'retailers',
            'contact(/)': 'contact'

        },

        controller: new AppController()
    });

});
