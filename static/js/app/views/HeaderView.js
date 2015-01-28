define(function(require, exports, module) {
    var $ = require('jquery'),
        BaseView = require('app/views/BaseView'),
        channels = require('app/channels'),
        helpers = require('app/utils/helpers'),
        constants = require('app/utils/constants'),
        template = require('hbs!templates/header');

    return BaseView.extend({

        tagName: 'header',

        className: 'header',

        template: template,

        ui: {
            menuToggle: '.toggle-menu'
        },

        events: {
            'click @ui.menuToggle': 'onClickMenuToggle'
        },

        initialize: function(options) {
            $(window).on('resize', _.bind(this.setMobileMenu, this));
        },

        onShow: function() {
            this.setMobileMenu();
        },

        setMobileMenu: function() {
            var winWidth = $(window).width();
            var winHeight = $(window).height();
            var headerHeight = $('#region-header').height();

            $('.mobile-menu').css({
                height: winHeight - headerHeight,
                top: headerHeight
            });
        },

        onClickMenuToggle: function() {
            $('html').toggleClass('menu-is-open');
        },

        hasScrolled: function() {
            var st = $(window).scrollTop();

            // Make sure they scroll more than delta
            if(Math.abs(this.lastScrollTop - st) <= this.delta)
                return;

            // If they scrolled down and are past the navbar, add class .nav-up.
            // This is necessary so you never see what is "behind" the navbar.
            if (st > this.lastScrollTop && st > this.navbarHeight){
                // Scroll Down
                this.$el.removeClass('nav-down').addClass('nav-up');
            } else {
                // Scroll Up
                if (st + this.winHeight < this.docHeight) {
                    this.$el.removeClass('nav-up').addClass('nav-down');
                }
            }

            this.lastScrollTop = st;
        }

    });
});
