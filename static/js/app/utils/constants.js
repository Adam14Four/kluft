define(function(require, exports, module) {

    exports.INITING_CLASS = 'is-initing';
    exports.READY_CLASS = 'is-ready';
    exports.VISIBLE_CLASS = 'is-visible';
    exports.ACTIVE_CLASS = 'is-active';
    exports.MENU_OPEN_CLASS = 'menu-is-open';
    exports.INFO_OPEN_CLASS = 'info-is-open';
    exports.LOADING_ASSETS_CLASS = 'is-loading-assets';
    exports.TRANSITION_IN_CLASS = 'is-transitioning-in';
    exports.floodlight = {
        SITE_LOAD: 'HR-VL0',
        MENU_SUBMIT: 'HR-VL0',
        NEWS_SUBMIT: 'ENDTA000',
        MENU_CONFIRMATION: 'ENDTA00',
        NEWS_CONFIRMATION: 'ENDTA001'
    };
    exports.omniturePages = {

        INTRO: {
            pageName: 'HR-V:INTRO',
            channel: 'HR-V',
            prop1: 'HR-V',
            prop25: '<PAGE URL>',
            prop26: 'AUTOS:MODEL',
            prop27: 'AUTOS:MODEL:INTRO'
        },

        STYLING: {
            pageName: 'HR-V:STYLING',
            channel: 'HR-V',
            prop1: 'HR-V',
            prop25: '<PAGE URL>',
            prop26: 'AUTOS:MODEL',
            prop27: 'AUTOS:MODEL:STYLING'
        },

        VERSATILITY: {
            pageName: 'HR-V:VERSATILITY',
            channel: 'HR-V',
            prop1: 'HR-V',
            prop25: '<PAGE URL>',
            prop26: 'AUTOS:MODEL',
            prop27: 'AUTOS:MODEL:VERSATILITY'
        },

        SIZE: {
            pageName: 'HR-V:SIZE',
            channel: 'HR-V',
            prop1: 'HR-V',
            prop25: '<PAGE URL>',
            prop26: 'AUTOS:MODEL',
            prop27: 'AUTOS:MODEL:SIZE'
        },

        INTERIOR: {
            pageName: 'HR-V:INTERIOR',
            channel: 'HR-V',
            prop1: 'HR-V',
            prop25: '<PAGE URL>',
            prop26: 'AUTOS:MODEL',
            prop27: 'AUTOS:MODEL:INTERIOR'
        },

        FEATURES: {
            pageName: 'HR-V:FEATURES',
            channel: 'HR-V',
            prop1: 'HR-V',
            prop25: '<PAGE URL>',
            prop26: 'AUTOS:MODEL',
            prop27: 'AUTOS:MODEL:FEATURES'
        },

        NEWS: {
            pageName: 'HR-V:NEWS',
            channel: 'HR-V',
            prop1: 'HR-V',
            prop25: '<PAGE URL>',
            prop26: 'AUTOS:MODEL',
            prop27: 'AUTOS:MODEL:NEWS'
        },

        CONFIRMATION: {
            pageName: 'HR-V:EMAIL SIGN UP CONFIRMATION',
            channel: 'HR-V',
            prop1: 'HR-V',
            prop25: '<PAGE URL>',
            prop26: 'AUTOS:MODEL',
            prop27: 'AUTOS:MODEL:EMAIL SIGN UP'
        }
    };
    exports.omnitureLinks = {

        PHOTO_STYLING: {
            linkName: 'HR-V:PHOTO LINK',
            prop1: 'HR-V',
            prop2: '2015',
            prop25: '<PAGE URL>',
            prop26: 'AUTOS:MODEL',
            prop27: 'AUTOS:MODEL:STYLING'
        },

        PHOTO_INTERIOR: {
            linkName: 'HR-V:PHOTO LINK',
            prop1: 'HR-V',
            prop2: '2015',
            prop25: '<PAGE URL>',
            prop26: 'AUTOS:MODEL',
            prop27: 'AUTOS:MODEL:INTERIOR'
        },

        THREESIXTY: {
            linkName: 'HR-V:360 VIEW LINK',
            prop1: 'HR-V',
            prop2: '2015',
            prop25: '<PAGE URL>',
            prop26: 'AUTOS:MODEL',
            prop27: 'AUTOS:MODEL:STYLING'
        },

        VIDEO_START: {
            linkName: 'HR-V:<VIDEO NAME> VIDEO START',
            prop1: 'HR-V',
            prop2: '2015',
            prop25: '<PAGE URL>',
            prop26: 'AUTOS:MODEL',
            prop27: 'AUTOS:MODEL:<SECTION>'
        },

        VIDEO_COMPLETE: {
            linkName: 'HR-V:<VIDEO NAME> VIDEO COMPLETE',
            prop1: 'HR-V',
            prop2: '2015',
            prop25: '<PAGE URL>',
            prop26: 'AUTOS:MODEL',
            prop27: 'AUTOS:MODEL:<SECTION>'
        },

        HONDA_LOGO: {
            linkName: 'HR-V:HONDA LOGO LINK',
            prop1: 'HR-V',
            prop2: '2015',
            prop25: '<PAGE URL>'
        },

        MENU: {
            linkName: 'HR-V:MENU LINK',
            prop1: 'HR-V',
            prop2: '2015',
            prop25: '<PAGE URL>'
        },

        NAV: {
            linkName: 'HR-V: <SECTION> LEFT NAVIGATION LINK',
            prop1: 'HR-V',
            prop2: '2015',
            prop25: '<PAGE URL>'
        },

        NAV_INTRO: {
            linkName: 'HR-V: INTRO LEFT NAVIGATION LINK',
            prop1: 'HR-V',
            prop2: '2015',
            prop25: '<PAGE URL>'
        },

        NAV_STYLING: {
            linkName: 'HR-V: STYLING LEFT NAVIGATION LINK',
            prop1: 'HR-V',
            prop2: '2015',
            prop25: '<PAGE URL>'
        },

        NAV_VERSATILITY: {
            linkName: 'HR-V: VERSATILITY LEFT NAVIGATION LINK',
            prop1: 'HR-V',
            prop2: '2015',
            prop25: '<PAGE URL>'
        },

        NAV_SIZE: {
            linkName: 'HR-V: SIZE LEFT NAVIGATION LINK',
            prop1: 'HR-V',
            prop2: '2015',
            prop25: '<PAGE URL>'
        },

        NAV_INTERIOR: {
            linkName: 'HR-V: INTERIOR LEFT NAVIGATION LINK',
            prop1: 'HR-V',
            prop2: '2015',
            prop25: '<PAGE URL>'
        },

        NAV_FEATURES: {
            linkName: 'HR-V: FEATURES LEFT NAVIGATION LINK',
            prop1: 'HR-V',
            prop2: '2015',
            prop25: '<PAGE URL>'
        },

        NAV_NEWS: {
            linkName: 'HR-V: NEWS LEFT NAVIGATION LINK',
            prop1: 'HR-V',
            prop2: '2015',
            prop25: '<PAGE URL>'
        },

        EMAIL: {
            linkName: 'HR-V:EMAIL SIGN UP LINK',
            prop1: 'HR-V',
            prop2: '2015',
            prop25: '<PAGE URL>'
        },

        FACEBOOK: {
            linkName: 'HR-V:FACEBOOK LINK',
            prop1: 'HR-V',
            prop2: '2015',
            prop25: '<PAGE URL>'
        }
    };

    return exports;
});
