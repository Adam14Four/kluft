define(function(require, exports, module) {
    var Backbone = require('backbone'),
        Address = require('app/models/Address');

    return Backbone.Collection.extend({

        model: Address,

        setActiveModel: function(activeModel) {
            activeModel.set('active', true);
            this.each(function(model) {
                if (model === activeModel) return;
                model.set('active', false);
            });
        },

        onReset: function() {
            console.log('reset');
        },

    });
});
