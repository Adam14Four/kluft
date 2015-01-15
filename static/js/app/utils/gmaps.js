define(function(require, exports, module) {
    return {
        init: function(options) {
            options = options || {};
            if (typeof window.google === 'undefined' || typeof window.google.maps === 'undefined') {
                require(['async!http://maps.google.com/maps/api/js?sensor=false'], function() {
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
