define(function(require, exports, module) {
    var $ = require('jquery'),
        Marionette = require('marionette'),
        channels = require('app/channels');

    return Marionette.ItemView.extend({


        initialize: function() {
        },

        onShow: function() {
            this.delegateEvents();
        }

    });
});
