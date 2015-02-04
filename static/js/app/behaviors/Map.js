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
            console.log(location)
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
            // this.checkResize();
            setTimeout(function(){
                self.showInitialMap();
            }, 1500);
        },

        showInitialMap: function() {
            var center = new GMaps.LatLng(34.09541, -117.56289);
            var latlng = center;
            var marker = new GMaps.Marker({
                position: latlng,
                map: this.map,
                visible: true,
                location: location
            });

            this.map.setCenter(center);

            var map = this.map;

            this.markers.push(marker);
            location.marker = marker;
        },

        mapStyles: function() {
            this.mapStyles = [{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"weight":"0.36"},{"gamma":"1.43"},{"lightness":"17"},{"saturation":"14"}]},{"featureType":"landscape.man_made","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"lightness":"0"}]},{"featureType":"landscape.natural.terrain","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"lightness":"40"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"lightness":"0"},{"weight":"1.00"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"lightness":"26"}]}];
            this.map.setOptions({ styles: this.mapStyles });
        },

        checkResize: function() {
            var self = this;
            google.maps.event.trigger(self.map, "resize");
        }

    });
});
