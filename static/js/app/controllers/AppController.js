define(function(require) {

    var App = require('app/app'),
        Marionette = require('marionette'),
        helpers = require('app/utils/helpers'),
        constants = require('app/utils/constants'),
        channels = require('app/channels'),

        // Views
        GlobalView = require('app/views/GlobalView'),
        HeaderView = require('app/views/HeaderView'),
        FooterView = require('app/views/FooterView'),
        HomeView = require('app/views/HomeView'),
        CollectionsView = require('app/views/CollectionsView'),
        MasterStandardView = require('app/views/MasterStandardView'),
        AboutView = require('app/views/AboutView'),
        ContactView = require('app/views/ContactView'),
        RetailersView = require('app/views/RetailersView');


    return Marionette.Controller.extend({


        initialize: function() {
            var self = this;

            App.firstLoad = true;
            this.bootstrap();
        },

        bootstrap: function() {
            channels.globalChannel.on( 'navigate', this.navigate, this );

            this.globalView = new GlobalView();
            this.headerView = new HeaderView();
            this.footerView = new FooterView();

            App.headerRegion.show(this.headerView);
            App.footerRegion.show(this.footerView);

            this.onAppReady();
        },

        navigate: function(options) {
            // If navigate() is being called...
            // we must be past our initial page load
            // so we'll set onload to 'false'
            app.onload = false;

            this.url = options.route;
            this.triggerStatus = options.triggerStatus;

            // Navigate, good sir!
            app.appRouter.navigate(this.url, {
                trigger: this.triggerStatus
            });

        },

        onAppReady: function() {
            // JS is inited and ready
            $('body').removeClass(constants.INITING_CLASS);

            $('.preloader').velocity({
                opacity: 0
            }, {
                duration: 500,
                display: 'none'
            });

        },

        index: function() {
            this.homeView = new HomeView();

            App.contentRegion.show(this.homeView);
        },

        collections: function() {
            this.collectionsView = new CollectionsView();

            App.contentRegion.show(this.collectionView);
        },

        about: function() {
            this.aboutView = new AboutView();

            App.contentRegion.show(this.aboutView);
        },

        masterStandard: function() {
            this.masterStandardView = new MasterStandardView();

            App.contentRegion.show(this.masterStandardView);
        },

        retailers: function() {
            this.retailersView = new RetailersView();

            App.contentRegion.show(this.retailersView);
        },

        contact: function() {
            this.contactView = new ContactView();

            App.contentRegion.show(this.contactView);
        }

    });

});
