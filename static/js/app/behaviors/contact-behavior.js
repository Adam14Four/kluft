// define(function(require, exports, module) {
//     var App = require('app/app'),
//         Marionette = require('marionette'),
//         helpers = require('app/utils/helpers'),
//         velocity = require('velocity');

//     Marionette.Behaviors.behaviorsLookup.Contact = Marionette.Behavior.extend({

//         defaults: function() {
//             return {
//                 errorClass: 'error',
//                 success: _.bind(this.formSubmitSucces, this),
//                 maxErrorsToDisplay: 2
//             };
//         },

//         ui: function() {
//             var container;

//             if (!_.isUndefined(this.options.container)) {
//                 container = this.options.container + ' ';
//             }

//             return {
//                 form: container + 'form',
//                 success: container + '.success',
//                 email: container + '[name="Email"]',
//                 terms: container + '[name="terms-privacy"]',
//                 firstName: container + ' [name="FirstName"]',
//                 lastName: container + ' [name="LastName"]',
//                 errors: container + '.errors',
//                 hasError: container + '.error'
//             };
//         },

//         events: {
//             'submit @ui.form': 'onFormSubmitted'
//         },

//         onShow: function() {
//             this.$el.find('input, textarea').placeholder();
//         },

//         resetErrors: function() {
//             this.errors = [];
//             this.ui.errors.empty();
//             this.$('.' + this.options.errorClass).removeClass(this.options.errorClass);
//         },

//         addError: function(msg, $input) {
//             this.errors.push(msg);
//             $input.addClass(this.options.errorClass);
//         },

//         showErrors: function() {
//             var errorContainer = $('<p>').addClass(this.options.errorClass);

//             if (this.options.maxErrorsToDisplay < this.errors.length) {
//                 errorContainer.text('Please fill out the required fields').appendTo(this.ui.errors);
//             } else {
//                 errorContainer.html(this.errors.join('<br />'));
//             }

//             errorContainer.appendTo(this.ui.errors);
//         },

//         onFormSubmitted: function(event) {
//             var url,
//                 floodlightCategory,
//                 section = document.location.hash.replace('#', '').toUpperCase();

//             event.stopPropagation();
//             event.preventDefault();

//             if (!_.isUndefined(this.options.floodlightCategory)) {
//                 floodlightCategory = this.options.floodlightCategory + '_SUBMIT';
//             }

//             App.trigger('track:floodlight', floodlightCategory);
//             App.trigger('track:omnitureLinks', 'EMAIL', section);

//             this.resetErrors();

//             if (helpers.validEmail(this.ui.email.val()) !== true) {
//                 this.addError('Please enter a valid email address', this.ui.email);
//             }

//             if (this.ui.terms.get(0).checked !== true) {
//                 this.addError('Please agree to the Terms of Use and Honda Privacy Policy', this.ui.terms);
//             }

//             if (this.ui.firstName.val().length === 0) {
//                 this.addError('Please enter your first name', this.ui.firstName);
//             }

//             if (this.ui.lastName.val().length === 0) {
//                 this.addError('Please enter your last name', this.ui.lastName);
//             }

//             if (this.errors.length === 0) {
//                 url = this.ui.form.attr('action') + '?' + this.ui.form.serialize();

//                 $('<img />').attr('src', url).appendTo('body');
//                 this.options.success();
//             } else {
//                 this.showErrors();
//             }

//         },

//         formSubmitSucces: function() {
//             var floodlightCategory;

//             $('.contact-form-container form').add('.contact-form form').add('.news .left .top').css({
//                 opacity: 0,
//                 visibility: 'hidden'
//             });

//             $('.contact-form-container .success').add('.contact-form .success').velocity({
//                 opacity: 1
//             }, {
//                 visibility: 'visible',
//                 duration: 600
//             });

//             if (!_.isUndefined(this.options.floodlightCategory)) {
//                 floodlightCategory = this.options.floodlightCategory + '_CONFIRMATION';
//             }

//             App.trigger('track:floodlight', floodlightCategory);
//             App.trigger('track:omniturePages', 'CONFIRMATION');
//         }
//     });

//     return Marionette.Behaviors.behaviorsLookup.Contact;
// });
