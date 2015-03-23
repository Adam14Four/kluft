define(function(require, exports, module) {
    var $ = require('jquery'),
        Marionette = require('marionette'),
        channels = require('app/channels'),
        helpers = require('app/utils/helpers'),
        constants = require('app/utils/constants'),
        Map = require('app/behaviors/Map'),
        locations = require('app/data/locations'),
        itemTemplate = require('hbs!templates/retailer'),
        template = require('hbs!templates/retailers');

        require('jquery.viewport');

    var ItemView = Marionette.ItemView.extend({
        template: itemTemplate,
        tagName: "li",
        modelEvents: {
            'change:active': 'setActiveClass'
        },
        events: {
            // 'click': 'onClick'
        },
        setActiveClass: function() {
            // if (this.model.get('active')) {
            //     this.trigger('center:location');
            //     this.$el.addClass('active');
            // } else {
            //     this.$el.removeClass('active');
            // }
        },
        onClick: function() {
            // this.model.collection.setActiveModel(this.model);
            // this.trigger('center:location');
        }
    });

    return Marionette.CompositeView.extend({

        className: 'page retailers',

        template: template,

        childViewContainer: '.results',

        childView: ItemView,

        ui: {
            'parallaxBg': '.parallax-bg',
            'textbox': '.parallax-bg .text-box',
            'results': '.results',
            'form': '.js-search',
            'inputAddress': 'input[name=address]',
            'errors': '.errors',
            'masthead': '.grid .intro .masthead',
            'intro': '.intro',
            'submitBtn': '.submit'
        },

        events: {
            // 'submit @ui.form': 'onFormSubmit',
            // 'click @ui.submitBtn': 'onFormSubmit',
            'focus @ui.inputAddress': 'onFormFocus'
        },

        behaviors: {
            Map: {
                behaviorClass: Map
            }
        },

        childEvents: {
            'reset:classes': 'resetChildClasses',
            'center:location': 'centerLocation'
        },

        resetChildClasses: function() {
            this.children.each(this.resetChildClass);
        },

        resetChildClass: function(childView) {
            childView.$el.removeClass('active');
        },

        centerLocation: function(view) {
            this.ui.results.addClass('location-centered');
            this.triggerMethod('CenterLocation', view.model);
        },

        collectionEvents: {
            reset: "collectionReset"
        },

        collectionReset: function() {
            this.triggerMethod('CollectionReset');
        },

        initialize: function() {
            this.locations = locations;
            this.listenTo(this.model, 'change:location', this.onUpdateAddress);
            this.window = $(window);
            this.window.on('scroll.retail', _.bind(this.scrollEffects, this));
            this.window.on('resize.retail', _.bind(this.onResize, this));

            this.faded = false;
        },

        onShow: function() {
            var self = this;
            if (!_.isUndefined(this.model.get('location'))) {
                this.model.trigger('change:location');
            }

            this.ui.form = $('form');
            this.ui.form.on('submit', function(e) {
                e.preventDefault();
                self.onFormSubmit(e);
                return false;
            });

            $(window).scrollTop($(window).scrollTop()+1);
            this.delegateEvents();
            this.onResize();
            this.scrollEffects();

            setTimeout(function(){
                $('section').removeClass('is-loading');
            }, 300);
        },

        scrollEffects: function(e) {
            var scrolledY =  this.window.scrollTop();

            if (scrolledY > 150 && !this.faded) {
                this.ui.textbox.addClass('fade-out');
                this.faded = true;
            } else if (scrolledY < 150 && this.faded) {
                this.ui.textbox.removeClass('fade-out');
                this.faded = false;
            }

            $('.block-image:in-viewport').addClass('in-view');
            if (!Modernizr.touch) {
                this.ui.parallaxBg.css('background-position', '50% ' + (this.bgYOffset + scrolledY) + 'px');
            }

        },

        onResize: function() {
            if (!Modernizr.touch) {
                var headerHeight = $('#region-header').height();
                this.$el.css('margin-top', '-' + headerHeight + 'px');
                this.ui.textbox.css('margin-top', headerHeight/2);
            }

            this.winWidth = $(window).width();

            if (this.winWidth >= 960 && this.winWidth < 1100) {
                this.bgYOffset = -60;
            } else if (this.winWidth >= 1100 && this.winWidth < 1300) {
                this.bgYOffset = -100;
            } else if (this.winWidth >= 1300 && this.winWidth < 1500) {
                this.bgYOffset = -150;
            } else if (this.winWidth >= 1500) {
                this.bgYOffset = -200;
            } else {
                this.bgYOffset = 0;
            }

            this.scrollEffects();
        },

        onUpdateAddress: function() {
            if (_.isUndefined(this.model.get('location')) || this.model.get('location') === null) {
                this.ui.inputAddress.val('');
                return this.$el.removeClass('showing-results');
            }
            _.each(this.locations, this.setDistance, this);
            var results = _.sortBy(this.locations, this.sortLocations);
            this.collection.reset(results.slice(0, 6));
            this.checkResults(results.slice(0, 6));
        },

        checkResults: function(results) {
            // console.log(results);
            // if (results[0].distance > 60) {
            //     console.log('too far away');

            //     return;
            // }

            this.$el.addClass('showing-results');
        },

        sortLocations: function(location) {
            return location.distance;
        },

        setDistance: function(location) {
            var lat = this.model.get('location').lat();
            var lng = this.model.get('location').lng();

            location.distance = ((Math.acos(Math.sin(lat * Math.PI / 180) * Math.sin(location.lat * Math.PI / 180) + Math.cos(lat * Math.PI / 180) * Math.cos(location.lat * Math.PI / 180) * Math.cos((lng - location.lng) * Math.PI / 180)) * 180 / Math.PI) * 60 * 1.1515);
        },

        onFormSubmit: function(e) {
            e.stopPropagation();
            e.preventDefault();

            var address = $(e.currentTarget).find('input[name=address]').val();
            ga('send', 'retailer-search', address);

            this.resetErrors();

            if (this.isFormValid(address)) {
                this.model.set('address', address);
            } else {
                console.log('error');
                this.addError('Please enter a zip code', this.ui.inputAddress);
                this.showErrors();
            }
        },

        onFormFocus: function() {
            this.ui.inputAddress.val('');
        },

        resetErrors: function() {
            this.errors = [];
            this.ui.errors.empty();
            $('.error').removeClass('.error');
        },

        addError: function(msg, $input) {
            this.errors.push(msg);
            this.$el.addClass('error');
        },

        showErrors: function() {
            var errorContainer = $('<p>').addClass('error');

            errorContainer.text('Please provide a valid zip code').appendTo(this.ui.errors);

            errorContainer.appendTo(this.ui.errors);
        },

        onLocationMarkerClicked: function(location) {
            var model = this.collection.get(location);
            model.collection.setActiveModel(model);
        },

        isFormValid: function (address) {
            console.log(address)
            return (/(^\d{5}$)|(^\d{5}-\d{4}$)/).test(address);
        },

        onDestroy: function() {
            this.window.off('.retail');
        }

    });
});
