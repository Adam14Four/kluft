define(function(require, exports, module) {
    var $ = require('jquery'),
        BaseView = require('app/views/BaseView'),
        channels = require('app/channels'),
        helpers = require('app/utils/helpers'),
        constants = require('app/utils/constants'),
        template = require('hbs!templates/kluft-signature');

        require('jquery.viewport');

    return BaseView.extend({

        className: 'kluft-signature page',

        template: template,

        ui: {
            parallaxBg: '.parallax-bg',
            textbox: '.parallax-bg .text-box'
        },

        initialize: function(options) {
            this.window = $(window);
            this.window.on('scroll.signature', _.bind(this.scrollEffects, this));
            this.window.on('resize.signature', _.bind(this.onResize, this));

            this.faded = false;
        },

        onDestroy: function() {
            this.window.off('.signature');
        }

    });
});
