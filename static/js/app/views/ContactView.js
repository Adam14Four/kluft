define(function(require, exports, module) {
    var $ = require('jquery'),
        BaseView = require('app/views/BaseView'),
        channels = require('app/channels'),
        helpers = require('app/utils/helpers'),
        constants = require('app/utils/constants'),
        template = require('hbs!templates/contact');

        require('jquery.viewport');

    return BaseView.extend({

        className: 'contact page',

        template: template,

        ui: {
            email: '.email',
            submitBtn: '.submit',
            form: 'form',
            errors: '.errors',
            success: '.success'
        },

        events: {
            'click @ui.submitBtn': 'onFormSubmit'
        },

        initialize: function(options) {
        },

        onShow: function() {
        },

        setBackgroundSize: function() {
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
        },

        handleBackgrounds: function() {
            var height = this.ui.masthead.innerHeight();
            this.ui.masthead.parent().css('height', height);
        },

    });
});
