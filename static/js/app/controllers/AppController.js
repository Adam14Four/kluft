define(function(require) {

    var app = require('app/app'),
        Marionette = require('marionette'),
        helpers = require('app/utils/helpers'),
        constants = require('app/utils/constants'),
        channels = require('app/channels'),
        I18n = require('i18n-js'),
        locales = require('app/locales'),

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
        TraditionView = require('app/views/TraditionView'),
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
            this.I18nTranslate();
        },

        bootstrap: function() {
            var self = this;
            if (window.locale === 'zh') {
                document.title = "Kluft® - 大师之作。";
            }
            channels.globalChannel.on( 'navigate', this.navigate, this );
            channels.globalChannel.on('language-change', this.onLanguageChange, this);

            this.globalView = new GlobalView();
            this.headerView = new HeaderView();
            this.footerView = new FooterView();

            app.headerRegion.show(this.headerView);
            app.footerRegion.show(this.footerView);

            channels.globalChannel.trigger('reload');

            // this.onAppReady();

            $.ajax({
                url: '/api/v1/location',
                }).done(function(data) {
                    var newData = _.each(data, function(location) {
                        location.zip = parseInt(location.zip, 10);
                        location.lat = location.geo[0];
                        location.lng = location.geo[1];
                    });

                    app.locations = newData;
                    self.onAppReady();
            });
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

        tradition: function() {
            this.traditionView = new TraditionView();

            app.contentRegion.transitionToView(this.traditionView);
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
        },

        I18nTranslate: function() {
            if (localStorage && localStorage.getItem('language') ) {
                this.setLang(localStorage.getItem('language'))
                return;
            }

            var self = this;
            var supported = ["en", "en_US", "es", "zh", "zh-cn", "zh-hk", "zh-sg"];
            window.I18n.defaultLocale = "en";
            window.I18n.translations.en = locales.locales.en;
            window.I18n.translations.es = locales.locales.es;
            window.I18n.translations.zh = locales.locales.cn;

            $.ajax({
                url: '/api/v1/userlangauge',
                success: function(data) {
                    window.I18n.locale = data;
                    window.locale = data;
                    window.I18n.currentLocale();
                    self.bootstrap();
                },
                error: function(error) {
                    window.I18n.locale = 'en';
                    window.locale = "en";
                    window.I18n.currentLocale();
                    self.bootstrap();
                }
            });
        },

        setLang: function(lang) {
            window.I18n.defaultLocale = "en";
            window.I18n.translations.en = locales.locales.en;
            window.I18n.translations.es = locales.locales.es;
            window.I18n.translations.zh = locales.locales.cn;
            window.I18n.locale = lang;
            window.locale = lang;
            window.I18n.currentLocale();
            this.bootstrap();
            $('body').addClass('lang-' + lang);
        },

        onLanguageChange: function(lang) {
            if (lang === 'Spanish' || lang === '西班牙人' || lang === 'Español') {
                lang = 'es';
            } else if (lang === 'Chinese' || lang === '中文' || lang === 'Chino') {
                lang = 'zh';
            } else {
                lang = 'en';
            }

            if (localStorage) {
                localStorage.setItem('language', lang);
            }

            window.location.reload();
        } 

    });

});
