var mongoose = require('mongoose'),
    config = require('../config'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema,
    SALT_WORK_FACTOR = 10;

/** Schema **/
var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    }
});

/** Validations **/
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * @param {Object} images
     * @param {Function} cb
     * @api private
     */
    comparePassword: function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    },

    update: function(cb) {
        this.save(cb);
        return true;
    }
};

/**
 * Statics
 */
UserSchema.statics = {

    /**
     * @param {ObjectId} id
     * @param {Function} cb
     * @api private
     */

    load: function(id, cb) {
        this.findById(id)
            .exec(cb);
    },

    /**
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */

    list: function(options, cb) {
        var criteria = options.criteria || {};

        this.find(criteria)
            .sort({
                'createdAt': -1
            }) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb);
    }
};

module.exports = mongoose.model('User', UserSchema);