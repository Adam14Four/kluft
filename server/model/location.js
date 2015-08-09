var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    config = require('../config');

/** Schemas **/
var LocationSchema = new Schema({
    "geo": {
        type: [Number],
        index: '2d',
        default: null
    },
    "title": String,
    "street": String,
    "city": String,
    "state": String,
    "zip": String,
    "country": String,
    "phone": String,
    "slug": String
});

String.prototype.fulltrim=function(){return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');};

/**
 * Methods
 */
LocationSchema.methods = {
    update: function(cb) {
        this.slug = this.title.toLowerCase().fulltrim().split(' ').join('-').replace(/[^a-zA-Z0-9-_]+/ig, '');
        this.save(cb);
    }
},


/**
 * Statics
 */
LocationSchema.statics = {

    load: function(id, cb) {
        this.findById(id).exec(cb);
    },

    loadBySlug: function(slug, cb) {
        this.findOne({slug: slug}).exec(cb);
    },

    list: function(options, cb) {
        var criteria = options.criteria || {};

        this.find(criteria)
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb);
    },

    search: function(options, cb) {
        var criteria = options.criteria || {};

        this.find(criteria)
            .exec(cb);
    },

    listAll: function(cb) {
        this.find({}).exec(cb);        
    }

};

mongoose.model('Location', LocationSchema);
