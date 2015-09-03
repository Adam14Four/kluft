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
            select: '.select',
            option: '.option',
            scrollBtn: '.back-to-top'
        },

        events: {
            'click @ui.option': 'onClickOption',
            'click @ui.select': 'onClickSelect',
            'click @ui.scrollBtn': 'onClickScrollBtn'
        },

        initialize: function(options) {
        },

        onShow: function() {
            var option = 'English';
            if (window.locale == 'es') {
                option = 'Español';
            } else if (window.locale == 'zh') {
                option = '中文';
            }

            this.ui.select[0].childNodes[0].nodeValue = option;
        },

        onClickScrollBtn: function() {
            helpers.scrollTo('body');
        },

        onClickSelect: function() {
            this.ui.select.toggleClass('active');
        },

        onClickOption: function(e) {
            channels.globalChannel.trigger('language-change', $(e.currentTarget).html());
        }

    });
});
