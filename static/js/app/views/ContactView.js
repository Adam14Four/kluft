define(function(require, exports, module) {
    var $ = require('jquery'),
        BaseView = require('app/views/BaseView'),
        channels = require('app/channels'),
        helpers = require('app/utils/helpers'),
        constants = require('app/utils/constants'),
        template = require('hbs!templates/contact');

    return BaseView.extend({

        className: 'contact page',

        template: template,

        ui: {
            // form: 'form',
            // email: '#email'
        },

        events: {
            // 'submit @ui.form': 'onFormSubmitted'
        },

        initialize: function(options) {

        },

        onShow: function() {
        },

        onFormSubmitted: function(event) {
            event.stopPropagation();
            event.preventDefault();

            this.resetErrors();

            if (helpers.validEmail(this.ui.email.val()) !== true) {
                this.addError('Please enter a valid email address', this.ui.email);
            }

            if (this.errors.length === 0) {
                url = this.ui.form.attr('action') + '?' + this.ui.form.serialize();

                $('<img />').attr('src', url).appendTo('body');
                this.options.success();
            } else {
                this.showErrors();
            }
        },

        formSubmitSucces: function() {

            console.log('form submission successful');

            // $('.contact-form-container form').add('.contact-form form').add('.news .left .top').css({
            //     opacity: 0,
            //     visibility: 'hidden'
            // });

            // $('.contact-form-container .success').add('.contact-form .success').velocity({
            //     opacity: 1
            // }, {
            //     visibility: 'visible',
            //     duration: 600
            // });

        },

        resetErrors: function() {
            this.errors = [];
            // this.ui.errors.empty();
            // this.$('.' + this.options.errorClass).removeClass(this.options.errorClass);
        },

        addError: function(msg, $input) {
            this.errors.push(msg);
            // $input.addClass(this.options.errorClass);
        },

        showErrors: function() {
            console.log('called show errors');
        }

    });
});
