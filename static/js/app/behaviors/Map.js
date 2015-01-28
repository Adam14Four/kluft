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
            zoom: 12,
            center: [34.09541, -117.56289]
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
            var latlng = new GMaps.LatLng(location.get('lat'), location.get('lng'));
            this.latLngBounds.extend(latlng);

            var marker = new GMaps.Marker({
                position: latlng,
                map: this.map,
                // icon: iconImage,
                title: location.get('title'),
                visible: true,
                location: location
            });

            var map = this.map;

            GMaps.event.addListener(marker, 'click', function() {
                self.view.triggerMethod('LocationMarkerClicked', location);
            });

            this.markers.push(marker);
            location.marker = marker;
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
            this.showInitialMap();
            this.checkResize();
        },

        showInitialMap: function() {
            this.map.setCenter(new GMaps.LatLng(34.09541, -117.56289));
        },

        checkResize: function() {
            var self = this;
            google.maps.event.trigger(self.map, "resize");
        }

    });
});
