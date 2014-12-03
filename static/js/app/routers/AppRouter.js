define(function (require, exports, module) {
    var Marionette = require('marionette'),
        AppController = require('app/controllers/AppController');

    return Marionette.AppRouter.extend({

        appRoutes: {
            '(/)': 'index',
            'collections(/)': 'collections',
            'earl-kluft(/)': 'about',
            'master-standard(/)': 'masterStandard',
            'retailers(/)': 'retailers',
            'contact(/)': 'contact'
        },

        controller: new AppController()
    });

});
