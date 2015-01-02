define(function(require, exports, module) {
    var Marionette = require('marionette'),
        helpers = require('app/utils/helpers'),
        channels = require('app/channels'),
        constants = require('app/utils/constants');
        // FastClick = require('fastclick');

    return Marionette.ItemView.extend({

        el: 'body',

        ui: {
            links: '[data-navigate], a[href^="/"]'
        },

        events: {
            'click @ui.links': 'onClickNavigate'
        },

        initialize: function() {

            // Javascript is ready... go!
            this.$el.removeClass(constants.INITING_CLASS);

            // Check aspect ratio onResize and throw a warning if necessary
            // this.checkAspectRatio();

            // Add resize event handler
            // $(window).on('resize', _.bind(this.onResizeWin, this));

            // Force touch devices to respect :active styles in CSS
            document.addEventListener('touchstart', function() {}, true);

            // Prevent elastic bounce in touch-enabled web browsers
            document.addEventListener('touchmove', function(e) {
                e.preventDefault();
            }, false);

            // No click delay for iOS
            // FastClick.attach(document.body);

            // Page visibility detection
            // this.listenForPageVisibility();

        },

        onClickNavigate: function(e) {

            /**
             * Keep the markup flexible, by allowing two ways to navigate:
             *      <foo data-navigate="/bar/"></foo>
             *      <a href="/foo/">Bar</a>
             */

            e.preventDefault();
            var url = $(e.currentTarget).data('navigate') || $(e.currentTarget).attr('href');

            channels.globalChannel.trigger('navigate', {
                route: url,
                triggerStatus: true
            });

        },

        checkAspectRatio: function() {
            var aspectRatio = $(window).width() / $(window).height();
            if (aspectRatio < 0.5 || (aspectRatio >= 1.5 && $(window).height() <= 1024 && $(window).width() <= 684)) {
                $('html').addClass(constants.RESIZE_WARNING_CLASS);
            } else {
                $('html').removeClass(constants.RESIZE_WARNING_CLASS);
            }
        },

        listenForPageVisibility: function() {

            var hidden, visibilityChange;

            if (typeof document.hidden !== 'undefined') {
                hidden = 'hidden';
                visibilityChange = 'visibilitychange';
            } else if (typeof document.mozHidden !== 'undefined') {
                hidden = 'mozHidden';
                visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.msHidden !== 'undefined') {
                hidden = 'msHidden';
                visibilityChange = 'msvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                hidden = 'webkitHidden';
                visibilityChange = 'webkitvisibilitychange';
            }

            function handleVisibilityChange() {

                if (document.hidden) {
                    channels.soundChannel.trigger('mute', {
                        persist: false
                    });
                } else if (localStorage.getItem('isPlaying') === 'true') {
                    channels.soundChannel.trigger('unmute', {
                        persist: false
                    });
                }

            }

            document.addEventListener('visibilitychange', handleVisibilityChange, false);

        }

    });
});
