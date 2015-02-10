define(function(require, exports, module) {
    var $ = require('jquery'),
        BaseView = require('app/views/BaseView'),
        channels = require('app/channels'),
        helpers = require('app/utils/helpers'),
        constants = require('app/utils/constants'),
        template = require('hbs!templates/collections');

        require('jquery.viewport');

    return BaseView.extend({

        className: 'collections page',

        template: template,

        ui: {
            parallaxBg: '.parallax-bg',
            textbox: '.parallax-bg .text-box'
        },

        initialize: function(options) {
            this.window = $(window);
            this.window.on('scroll.collections', _.bind(this.scrollEffects, this));
            this.window.on('resize.collections', _.bind(this.onResize, this));

            this.faded = false;
        },

        onDestroy: function() {
            this.window.off('.collections');
        }

    });
});
