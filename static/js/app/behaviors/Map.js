define(function(require, exports, module) {
    var
        Marionette = require('marionette'),
        channels = require('app/channels'),
        helpers = require('app/utils/helpers'),
        constants = require('app/utils/constants'),
        gmaps = require('app/utils/gmaps'),
        GMaps;

    return Marionette.Behavior.extend({

        defaults: {
            distanceLimit: 25,
            zoom: 12
        },

        ui: {
            'map': '.map'
        },

        modelEvents: {
            "change:location": "centerMap"
        },

        markers: [],

        centerMap: function() {
            this.latLngBounds = new GMaps.LatLngBounds();
            this.removeAllMarkers();
            this.checkResize();
            var location = this.view.model.get('location');
            this.map.setCenter(location);
            this.plotLocations();
        },

        onCenterLocation: function(model) {
            this.map.setCenter(new GMaps.LatLng(model.get('lat'), model.get('lng')));
        },

        onRender: function() {
            gmaps.init({
                success: _.bind(this.showMap, this)
            });
        },

        removeAllMarkers: function() {
            _.each(this.markers, function(marker) {
                marker.setMap(null);
            });
        },

        makeMarker: function(location, i) {
            var self = this;

            var iconImage = {
                url: '/img/get-face-tape/marker-' + (i + 1) + '.png',
                scaledSize: new GMaps.Size(40, 59),
                origin: new GMaps.Point(0, 0),
                anchor: new GMaps.Point(20, 59)
            };

            var latlng = new GMaps.LatLng(location.get('lat'), location.get('lng'));
            this.latLngBounds.extend(latlng);

            var marker = new GMaps.Marker({
                position: latlng,
                map: this.map,
                icon: iconImage,
                title: location.get('title'),
                visible: true,
                loaction: location
            });

            var map = this.map;

            GMaps.event.addListener(marker, 'click', function() {
                self.view.triggerMethod('LocationMarkerClicked', location);
            });

            this.markers.push(marker);
            location.marker = marker;
            console.log('make marker');

        },

        plotLocations: function() {
            var self = this;
            var markersMade = this.view.collection.each(this.makeMarker, this);

            this.map.fitBounds(this.latLngBounds);
        },

        showMap: function(google) {
            GMaps = google.maps;
            var mapOptions = this.options;
            var self = this;
            this.map = new GMaps.Map(self.ui.map.get(0), mapOptions);
            this.checkResize();
        },

        checkResize: function() {
            var self = this;
            google.maps.event.trigger(self.map, "resize");
        }

    });
});
