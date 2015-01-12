define(function(require, exports, module) {
    var Marionette = require('marionette'),
        helpers = require('app/utils/helpers'),
        _ = require('underscore');

    return Marionette.Region.extend({

        initialize: function() {
            this.transEndEventName = helpers.prefixedTransEnd;
            this.transformPropName = helpers.prefixedTransform;
        },

        transitionToView: function( newView ) {

            var self = this,
                transType = $('body').attr('data-page-trans'),
                synchonousTransition = ( transType === 'fade' ) ? true : false;

            // Make sure we have a view
            var view = this.currentView;
            if (!view || view.isClosed){
                this.show(newView);
                return;
            }

            // I'm not gonna lie I have no idea if this is necessary
            Marionette.triggerMethod.call(this, 'willTransition', view);

            this.stopListening(newView, 'render');

            // Wait for the new view to render, then initialize a transition to
            // show the new view while hiding the old.
            this.listenTo( newView, 'render', function() {

                // clean up the old listeners, just to ensure we only have 1 active.
                self.$el.off( self.transEndEventName );

                // CSS Based transition
                if( Modernizr && Modernizr.csstransforms3d ) {

                    // Allow CSS to dictate where the new view's start position should be
                    newView.$el.addClass('before-transition');

                    self.$el.append( newView.el );

                    // Trigger onBeforeShow on new view - even though it's already
                    // in the DOM, it most likely hasn't transitioned into view yet
                    Marionette.triggerMethod.call(newView, 'before:show', true);
                    Marionette.triggerMethod.call(this, 'before:show', newView);

                    // let region know we're transitioning
                    $('body').addClass('views-transitioning');

                    // transition views
                    self.currentView.$el.addClass('transitioning-out');

                    // Trigger onTransitionOut method on current view
                    Marionette.triggerMethod.call(self.currentView, 'transition:out', true);

                    if( synchonousTransition ) {
                        self.currentView.$el.on( self.transEndEventName, function (e) {
                            if( e.target === e.currentTarget ) {
                                self.cleanOldView( self.currentView );
                                newView.$el
                                    .removeClass('before-transition')
                                    .addClass('transitioning-in');

                                // Trigger onTransitionIn method on new view
                                Marionette.triggerMethod.call(newView, 'transition:in', true);
                            }
                        });

                        newView.$el.on( self.transEndEventName, function (e) {

                            if( e.target === e.currentTarget ) {
                                self.cleanNewView( newView );
                            }
                        });

                    } else {

                        // Super ugly delay here due to the need
                        // to give newView a paint cycle to allow the
                        // before-transition styles to be applied
                        _.delay(function(){
                            newView.$el
                                .removeClass('before-transition')
                                .addClass('transitioning-in');
                            // Trigger onTransitionIn method on new view
                            Marionette.triggerMethod.call(newView, 'transition:in', true);

                        }, 50);

                        // New view has no transition
                        if( transType.indexOf('pop-in-') > -1 ) {
                            self.currentView.$el.on( self.transEndEventName, function () {
                                self.cleanOldView( self.currentView );
                                self.cleanNewView( newView );
                            });
                        } else {
                            console.log('here')
                            newView.$el.on( self.transEndEventName, function () {
                                self.cleanOldView( self.currentView );
                                self.cleanNewView( newView );
                            });
                        }



                    }

                // JS transition
                } else {
                     self.currentView.$el.fadeOut(function() {
                        self.$el.append( newView.$el.hide() );
                        newView.$el.fadeIn(function() {
                            self.cleanOldView( self.currentView );
                            self.cleanNewView( newView );
                        });

                     });

                }


            });

            newView.render();

        },

        cleanOldView: function( view ) {
            view.$el.off(self.transEndEventName);
            view.destroy();
        },

        cleanNewView: function( view ) {
            this.currentView = view;

            view.$el.off(self.transEndEventName);
            $('body').removeClass('views-transitioning');
            this.currentView.$el.removeClass('transitioning-in');

            // Scroll to top of window
            helpers.scrollTo('body');

            // do the things show would normally do after showing a new view
            Marionette.triggerMethod.call(view, 'show', true);
            Marionette.triggerMethod.call(this, 'show', view);
        }

    });
});
