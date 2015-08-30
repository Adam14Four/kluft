define(function(require, exports, module) {
    var $ = require('jquery'),
        BaseView = require('app/views/BaseView'),
        channels = require('app/channels'),
        helpers = require('app/utils/helpers'),
        constants = require('app/utils/constants'),
        template = require('hbs!templates/footer');

    return BaseView.extend({

        tagName: 'footer',

        className: 'footer',

        template: template,

        ui: {
            'select': 'select',
            scrollBtn: '.back-to-top'
        },

        events: {
            'change @ui.select': 'onChangeSelect',
            'click @ui.scrollBtn': 'onClickScrollBtn'
        },

        initialize: function(options) {
        },

        onShow: function() {
            var option = 'English';
            if (window.locale == 'es') {
                option = 'Spanish';
            } else if (window.locale == 'zh') {
                option = 'Chinese';
            }

            this.ui.select.val(option);
        },

        onClickScrollBtn: function() {
            helpers.scrollTo('body');
        },

        onChangeSelect: function() {
            channels.globalChannel.trigger('language-change', this.ui.select.val());
        }

    });
});
