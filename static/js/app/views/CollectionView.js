define(function(require, exports, module) {
    var $ = require('jquery'),
        BaseView = require('app/views/BaseView'),
        channels = require('app/channels'),
        helpers = require('app/utils/helpers'),
        constants = require('app/utils/constants'),
        template = require('hbs!templates/collections');

        require('stellar');
        require('jquery.viewport');

    return BaseView.extend({

        className: 'collections page',

        template: template,

        ui: {
            masthead: '.intro .masthead'
        },

        events: {
        },

        initialize: function(options) {
            $(window).on('scroll.page', _.bind(this.scrollEffects, this));
            $(window).on('resize.page', _.bind(this.handleBackgrounds, this));
            this.window = $(window);
            this.faded = false;
        },

        onShow: function() {
            this.textBox = $('.intro .masthead .text-box');

            $.stellar({
                horizontalScrolling: false,
                verticalOffset: 0,
                horizontalOffset: 0,
                responsive: true
            });

            $.stellar('refresh');

            this.handleBackgrounds();
        },

        scrollEffects: function(e) {
            if (this.window.scrollTop() > 150 && !this.faded) {
                this.textBox.addClass('fade-out');
                this.faded = true;
            } else if (this.window.scrollTop() < 150 && this.faded) {
                this.textBox.removeClass('fade-out');
                this.faded = false;
            }
            $('.block-image:in-viewport').addClass('in-view');
        },

        handleBackgrounds: function() {
            var height = this.ui.masthead.innerHeight();
            this.ui.masthead.parent().css('height', height);
        },

        onDestroy: function() {
            $(window).off('page');
        }

    });
});
