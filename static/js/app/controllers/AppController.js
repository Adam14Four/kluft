define(function(require) {

    var app = require('app/app'),
        Marionette = require('marionette'),
        helpers = require('app/utils/helpers'),
        constants = require('app/utils/constants'),
        channels = require('app/channels'),

        // Models
        Address = require('app/models/Address'),

        // Collections
        Addresses = require('app/collections/Addresses'),

        // Views
        GlobalView = require('app/views/GlobalView'),
        HeaderView = require('app/views/HeaderView'),
        FooterView = require('app/views/FooterView'),
        HomeView = require('app/views/HomeView'),
        CollectionView = require('app/views/CollectionView'),
        AboutView = require('app/views/AboutView'),
        KluftStandardView = require('app/views/KluftStandardView'),
        BeyondLuxuryView = require('app/views/BeyondLuxuryView'),
        KluftSignatureView = require('app/views/KluftSignatureView'),
        RoyalSovereignView = require('app/views/RoyalSovereignView'),
        RoyalSovereignLatexView = require('app/views/RoyalSovereignLatexView'),
        ContactView = require('app/views/ContactView'),
        MethodView = require('app/views/MethodView'),
        RetailersView = require('app/views/RetailersView');


    return Marionette.Controller.extend({


        initialize: function() {
            var self = this;

            app.onload = true;
            app.isReady = false;
            app.waitingForLocations = false;
            this.bootstrap();
        },

        bootstrap: function() {
            var self = this;
            channels.globalChannel.on( 'navigate', this.navigate, this );

            this.globalView = new GlobalView();
            this.headerView = new HeaderView();
            this.footerView = new FooterView();

            app.headerRegion.show(this.headerView);
            app.footerRegion.show(this.footerView);
            // this.onAppReady();

            // $.ajax({
            //     url: '/api/v1/location',
            //     }).done(function(data) {
            //         console.log(data);
            //         var newData = _.each(data, function(location) {
            //             location.zip = parseInt(location.zip, 10);
            //             location.lat = location.geo[0];
            //             location.lng = location.geo[1];
            //         });

            //         app.locations = newData;
            //         self.onAppReady();
            // });
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

            $('html').removeClass('menu-is-open');

            window.app = app;

        },

        onAppReady: function() {
            app.isReady = true;

            if (app.waitingForLocations) {
                this.retailers();
            }
            // JS is inited and ready
            $('body').removeClass(constants.INITING_CLASS);

            $('.preloader').velocity({
                opacity: 0
            }, {
                delay: 500,
                duration: 600,
                display: 'none'
            });

        },

        home: function() {
            this.homeView = new HomeView();

            app.contentRegion.transitionToView(this.homeView);
        },

        collections: function() {
            this.collectionView = new CollectionView();

            app.contentRegion.transitionToView(this.collectionView);
        },

        beyondLuxury: function() {
            this.beyondLuxuryView = new BeyondLuxuryView();

            app.contentRegion.transitionToView(this.beyondLuxuryView);
        },

        kluftSignature: function() {
            this.kluftSignatureView = new KluftSignatureView();

            app.contentRegion.transitionToView(this.kluftSignatureView);
        },

        royalSovereign: function() {
            this.royalSovereignView = new RoyalSovereignView();

            app.contentRegion.transitionToView(this.royalSovereignView);
        },

        royalSovereignLatex: function() {
            this.royalSovereignLatexView = new RoyalSovereignLatexView();

            app.contentRegion.transitionToView(this.royalSovereignLatexView);
        },

        earlSKluft: function() {
            this.aboutView = new AboutView();

            app.contentRegion.transitionToView(this.aboutView);
        },

        method: function() {
            this.methodView = new MethodView();

            app.contentRegion.transitionToView(this.methodView);
        },

        kluftStandard: function() {
            this.kluftStandardView = new KluftStandardView();

            app.contentRegion.transitionToView(this.kluftStandardView);
        },

        retailers: function(address) {

            if (app.isReady) {
                this.address = this.address || new Address();
                this.address.set('address', address);

                this.retailersView = new RetailersView({
                    model: this.address,
                    collection: new Addresses({})
                });

                app.contentRegion.transitionToView(this.retailersView);
            } else {
                app.waitingForLocations = true;
            }
        },

        contact: function() {
            this.contactView = new ContactView();

            app.contentRegion.transitionToView(this.contactView);
        },

        default: function() {
            this.home();
        }

    });

});
