define(function(require, exports, module) {
    var $ = require('jquery'),
        BaseView = require('app/views/BaseView'),
        channels = require('app/channels'),
        helpers = require('app/utils/helpers'),
        constants = require('app/utils/constants'),
        template = require('hbs!templates/royal-sovereign-latex');

    return BaseView.extend({

        className: 'royal-sovereign-latex page',

        template: template,

        ui: {
            masthead: '.intro .masthead'
        },

        events: {
        },

        initialize: function(options) {
            $(window).on('resize', _.bind(this.setBackgroundSize, this));
        },

        onRender: function() {
            this.setBackgroundSize();
        },

        setBackgroundSize: function() {
            helpers.setBackgroundSize(this.ui.masthead, $('.header').height());
        }

    });
});
