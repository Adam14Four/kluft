define(function(require, exports, module) {
    var $ = require('jquery'),
        Marionette = require('marionette'),
        channels = require('app/channels');

    require('jquery.viewport');

    return Marionette.ItemView.extend({

        onShow: function() {
            var self = this;

            $(window).scrollTop($(window).scrollTop()+1);
            this.bindUIElements();
            this.delegateEvents();
            this.onResize();
            this.scrollEffects();

            setTimeout(function(){
                $('section').removeClass('is-loading');
            }, 300);
        },

        scrollEffects: function(e) {
            var scrolledY =  $(window).scrollTop();

            if (scrolledY > 150 && !this.faded) {
                this.ui.textbox.addClass('fade-out');
                this.faded = true;
            } else if (scrolledY < 150 && this.faded) {
                this.ui.textbox.removeClass('fade-out');
                this.faded = false;
            }

            $('.block-image:in-viewport').addClass('in-view');

            if (!Modernizr.touch) {
                this.ui.parallaxBg.css('background-position', '50% ' + parseInt(scrolledY / 10) + 'px');
                // this.ui.parallaxBg.css('background-position', '50% ' + (this.bgYOffset + parseInt(-scrolledY / 6)) + 'px');
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
        }

    });
});