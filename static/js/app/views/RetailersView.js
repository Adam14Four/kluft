define(function(require, exports, module) {
    var $ = require('jquery'),
        BaseView = require('app/views/BaseView'),
        channels = require('app/channels'),
        helpers = require('app/utils/helpers'),
        constants = require('app/utils/constants'),
        template = require('hbs!templates/retailers');

    return BaseView.extend({

        className: 'retailers',

        template: template,

        ui: {
        },

        events: {
        },

        initialize: function(options) {

        },

        onShow: function() {
        }

    });
});
