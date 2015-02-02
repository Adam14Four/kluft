define(function(require, exports, module) {
    var $ = require('jquery'),
        BaseView = require('app/views/BaseView'),
        channels = require('app/channels'),
        helpers = require('app/utils/helpers'),
        constants = require('app/utils/constants'),
        template = require('hbs!templates/home');

        require('stellar');
        require('jquery.viewport');

    return BaseView.extend({

        className: 'home page',

        template: template,

        ui: {
            masthead: '.grid .intro .masthead',
            allMastheads: '.grid .masthead',
            intro: '.intro'
        },

        events: {
        },

        initialize: function(options) {
            $(window).on('scroll.page', _.bind(this.scrollEffects, this));
            $(window).on('resize.page', _.bind(this.handleBackgrounds, this));
            this.window = $(window);
            this.faded = false;
            this.scrollPos = 0;
        },

        onShow: function() {
            $.stellar('refresh');
            this.textBox = $('.intro .masthead .h10');
            $('.grid .intro').stellar();
            $.stellar({
                horizontalScrolling: false,
                verticalOffset: 0,
                horizontalOffset: 0,
                responsive: true
            });



            this.handleBackgrounds();
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

        handleBackgrounds: function() {
            var height = this.ui.masthead.innerHeight();
            this.ui.allMastheads.each(function(){
                $(this).parent().css('height', height);
            });
        },

        onDestroy: function() {
            $(window).off('page');
        }

    });
});
