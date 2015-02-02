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
            'click': 'onClick'
        },
        setActiveClass: function() {
            if (this.model.get('active')) {
                this.trigger('center:location');
                this.$el.addClass('active');
            } else {
                this.$el.removeClass('active');
            }
        },
        onClick: function() {
            this.model.collection.setActiveModel(this.model);
            this.trigger('center:location');
        }
    });

    return Marionette.CompositeView.extend({

        className: 'page retailers',

        template: template,

        childViewContainer: '.results',

        childView: ItemView,

        ui: {
            'results': '.results',
            'form': '.js-search',
            'inputAddress': 'input[name=address]',
            'errors': '.errors',
            'masthead': '.grid .intro .masthead',
            'intro': '.intro'
        },

        events: {
            'submit @ui.form': 'onFormSubmit',
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
            $(window).on('scroll.page', _.bind(this.scrollEffects, this));
            $(window).on('resize.page', _.bind(this.handleBackgrounds, this));
            this.window = $(window);
            this.faded = false;
        },

        onShow: function() {
            if (!_.isUndefined(this.model.get('location'))) {
                this.model.trigger('change:location');
            }
            this.textBox = $('.intro .masthead .text-box');
        },

        scrollEffects: function(e) {
            this.scrollPos = this.window.scrollTop();

            if (this.window.scrollTop() > 150 && !this.faded) {
                this.textBox.addClass('fade-out');
                this.faded = true;
            } else if (this.window.scrollTop() < 150 && this.faded) {
                this.textBox.removeClass('fade-out');
                this.faded = false;
            }
            $('.block-image:in-viewport').addClass('in-view');
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
            console.log(results);
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
            e.preventDefault();

            var address = $(e.currentTarget).find('input[name=address]').val();

            this.resetErrors();

            if (this.isFormValid(address)) {
                this.model.set('address', address);
                console.log(address);
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
            var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(parseInt(address, 10));

            return isValidZip;
        },

        handleBackgrounds: function() {
            var height = this.ui.masthead.innerHeight();
            this.ui.masthead.parent().css('height', height);
        }

    });
});
