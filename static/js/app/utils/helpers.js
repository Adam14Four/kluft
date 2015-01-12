define(function(require, exports, module) {
    var $ = require('jquery');
    var body = $('body');
    var constants = require('app/utils/constants');

    require('velocity');

    exports.coverVideo = function($elem, width, height) {

        // Get window element height and width
        var winHeight = $(window).height();
        var winWidth = $(window).width();

        // Get native video width and height
        var nativeWidth = width;
        var nativeHeight = height;

        // Get the scale factors
        var heightScaleFactor = winHeight / nativeHeight;
        var widthScaleFactor = winWidth / nativeWidth;

        // Based on highest scale factor set width and height
        if (widthScaleFactor > heightScaleFactor) {
            $elem.css({
                height: 'auto',
                width: winWidth + 'px'
            });
        } else {
            $elem.css({
                height: winHeight + 'px',
                width: 'auto'
            });
        }

    };

    exports.validEmail = function(email){
        var atPos = email.indexOf('@');
        var dotPos = email.lastIndexOf('.');

        if (atPos< 1 || dotPos<atPos+2 || dotPos+2>=email.length) {
            return false;
        }

        return true;
    };

    exports.setBackgroundSize = function(element, offset) {
        var winHeight = $(window).height();
        var heightOffset = offset ? offset : 0;


        element.css('height', winHeight - heightOffset);
    };

    exports.scrollTo = function(target, jump) {
        var targetOffset = $(target).offset().top;

        if (jump || Modernizr.touch) {
            body.scrollTop(targetOffset);
        } else {
            body.velocity('scroll', {
                duration: 300,
                easing: 'easeInOutCubic',
                offset: targetOffset
            });
        }
    };

    exports.prefixedTransEnd = (function() {
        var transEndEventNames = {
            'WebkitTransition' : 'webkitTransitionEnd',
            'MozTransition'    : 'transitionend',
            'OTransition'      : 'oTransitionEnd',
            'msTransition'     : 'MSTransitionEnd',
            'transition'       : 'transitionend'
        };
        return transEndEventNames[ Modernizr.prefixed('transition') ];
    })();

    exports.prefixedTransform = (function() {
        var str = Modernizr.prefixed('transform');
        str = str.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');
        return str;
    })();

    return exports;

});
