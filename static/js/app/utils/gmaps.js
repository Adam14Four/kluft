define(function(require, exports, module) {
    return {
        init: function(options) {
            options = options || {};
            if (typeof window.google === 'undefined' || typeof window.google.maps === 'undefined') {
                require(['async!http://maps.google.com/maps/api/js?key=AIzaSyDrN-4xxe3I8wUWJJXndcmuZGYyj2EzaJg'], function() {
                    if (typeof options.success === 'function') {
                        options.success(window.google);
                    }
                });
            } else {
                if (typeof options.success === 'function') {
                    options.success(window.google);
                }
            }
        }
    };
});
