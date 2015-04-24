define(function(require, exports, module) {
    var $ = require('jquery'),
        BaseView = require('app/views/BaseView'),
        channels = require('app/channels'),
        helpers = require('app/utils/helpers'),
        constants = require('app/utils/constants'),
        Map = require('app/behaviors/Map'),
        template = require('hbs!templates/contact');

        require('jquery.viewport');

    return BaseView.extend({

        className: 'contact page',

        template: template,

        ui: {
            parallaxBg: '.parallax-bg',
            textbox: '.parallax-bg .text-box',
            email: '.email',
            submitBtn: '.submit',
            form: 'form',
            errors: '.errors',
            message: '.message',
            success: '.success',
            'masthead': '.grid .intro .masthead',
            'intro': '.intro'
        },

        behaviors: {
            Map: {
                behaviorClass: Map
            }
        },

        events: {
            'click @ui.submitBtn': 'onFormSubmit'
        },

        initialize: function(options) {
            this.window = $(window);
            this.window.on('scroll.contact', _.bind(this.scrollEffects, this));
            this.window.on('resize.contact', _.bind(this.onResize, this));

            this.faded = false;
        },

        onDestroy: function() {
            this.window.off('.contact');
        },

        onFormSubmit: function(event) {
            event.stopPropagation();
            event.preventDefault();

            this.resetErrors();

            if (helpers.validEmail(this.ui.email.val()) !== true) {
                this.addError('Please enter a valid email address', this.ui.email);
            }

            if (this.errors.length === 0) {
                var self = this;
                console.log('NO ERRORS');

                $.ajax({
                    url: window.location.origin + '/form',
                    type: 'post',
                    dataType: 'json',
                    data: this.ui.form.serialize(),
                    success: function(data) {
                        self.onSuccess();
                    }
                });

                this.onSuccess();

            } else {
                this.showErrors();
            }

        },

        resetErrors: function() {
            this.errors = [];
            this.ui.errors.empty();
            $('.error').removeClass('.error');
        },

        addError: function(msg, $input) {
            this.errors.push(msg);
            $input.addClass('error');
        },

        showErrors: function() {
            var errorContainer = $('<p>').addClass('error');

            errorContainer.text('Please provide a valid email').appendTo(this.ui.errors);

            errorContainer.appendTo(this.ui.errors);

            this.$el.addClass('errors-showing');
        },

        onSuccess: function() {
            var successContainer = $('<p>');

            this.$el.addClass('success-showing');
            successContainer.text('Message sent.').appendTo(this.ui.success);

            successContainer.appendTo(this.ui.success);

            this.ui.message.add(this.ui.email).val('');
        }

    });
});
