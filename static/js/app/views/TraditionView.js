define(function(require, exports, module) {
    var $ = require('jquery'),
        BaseView = require('app/views/BaseView'),
        channels = require('app/channels'),
        helpers = require('app/utils/helpers'),
        constants = require('app/utils/constants'),
        template = require('hbs!templates/tradition');

        require('jquery.viewport');

    return BaseView.extend({

        className: 'about page',

        template: template,

        ui: {
            parallaxBg: '.parallax-bg',
            textbox: '.parallax-bg .text-box',
            box1: '.block-text-1',
            caption: '.masthead-caption.desktop'
        },

        initialize: function(options) {
            this.window = $(window);
            this.window.on('scroll.about', _.bind(this.scrollEffects, this));
            this.window.on('resize.about', _.bind(this.onResize, this));

            this.faded = false;
        },

        onDestroy: function() {
            this.window.off('.about');
        },

        onResize: function() {
            if (!Modernizr.touch) {
                var headerHeight = $('#region-header').height();
                this.$el.css('margin-top', '-' + headerHeight + 'px');
                this.ui.textbox.css('margin-top', headerHeight/2);
            }

            this.winWidth = $(window).width();

            this.ui.caption.css('left', this.ui.box1.offset().left);

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
        }

    });
});
