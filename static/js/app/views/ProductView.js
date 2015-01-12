define(function(require, exports, module) {
    var $ = require('jquery'),
        BaseView = require('app/views/BaseView'),
        channels = require('app/channels'),
        helpers = require('app/utils/helpers'),
        constants = require('app/utils/constants'),
        template = require('hbs!templates/product');

    return BaseView.extend({

        className: 'product page',

        template: template,

        ui: {
            fullBleedSections: '.col-full-bleed-bg'
        },

        events: {
        },

        initialize: function(options) {
            this.productData = options.productData;
            $(window).on('resize', _.bind(this.setBackgroundSize, this));
            console.log(this.productData);
            this.$el.addClass(this.productData.title.replace(' ', '-').toLowerCase());
        },

        onRender: function() {
            this.setBackgroundSize();
        },

        serializeData: function() {
            return this.productData;
        },

        setBackgroundSize: function() {
            helpers.setBackgroundSize(this.ui.fullBleedSections, $('.header').height());
        }

    });
});
