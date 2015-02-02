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
            success: '.success',
            'masthead': '.grid .intro .masthead',
            'intro': '.intro'
        },

        events: {
            'click @ui.submitBtn': 'onFormSubmit'
        },

        initialize: function(options) {
            $(window).on('scroll.page', _.bind(this.scrollEffects, this));
            $(window).on('resize.page', _.bind(this.handleBackgrounds, this));
            this.window = $(window);
            this.faded = false;
        },

        scrollEffects: function(e) {
            this.scrollPos = this.window.scrollTop();

            if (this.window.scrollTop() > 150 && !this.faded) {
                this.textBox.addClass('fade-out');
                this.faded = true;
            } else if (this.window.scrollTop() < 150 && this.faded) {
                this.textBox.removeClass('fade-out');
                this.faded = false;
            }
            $('.block-image:in-viewport').addClass('in-view');
        },

        onShow: function() {
            this.textBox = $('.intro .masthead .text-box');
        },

        setBackgroundSize: function() {
        },

        onFormSubmit: function(event) {
            console.log('SUBMIT')
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
