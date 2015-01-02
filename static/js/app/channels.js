define(function(require, exports, module) {

    require('backbone.radio');

    exports.globalChannel = Backbone.Radio.channel('global');

    return exports;

});
