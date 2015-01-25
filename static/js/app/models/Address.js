define(function(require, exports, module) {
    var Backbone = require('backbone'),
        gmaps = require('app/utils/gmaps'),
        GMaps;

    return Backbone.Model.extend({

        defaults: {
            active: false
        },

        initialize: function() {
            var self = this;
            gmaps.init({
                success: function(google) {
                    GMaps = google.maps;
                    self.on('change:address', self.updateGeo, self);

                    if (self.get('address') !== null) {
                        self.trigger('change:address');
                    }
                }
            });
        },

        updateGeo: function() {
            var geocoder = new GMaps.Geocoder();
            geocoder.geocode({
                'address': this.get('address')
            }, _.bind(this.setlocationsByResults, this));
        },

        setlocationsByResults: function(results, status) {
            if (status == window.google.maps.GeocoderStatus.OK) {
                this.set('location', results[0].geometry.location);
            } else {
                this.set('location', null);
            }
        }

    });

});
