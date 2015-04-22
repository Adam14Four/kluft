var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    extend = require('util')._extend;

var user = new User({
    username: 'admin',
    password: 'kluft2015'
}).save(function(err) {
    if (err) console.log('ERROR:', err);
});

/**
 * Load
 */
exports.load = function(req, res, next, id) {
    User.load(id, function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('not found'));
        req.user = user;
        next();
    });
};

/**
 * List
 */
exports.index = function(req, res) {
    var page = (req.param('page') > 0 ? req.param('page') : 1) - 1;
    var perPage = 30;
    var options = {
        perPage: perPage,
        page: page
    };

    User.list(options, function(err, user) {
        if (err) return res.render('500');
        User.count().exec(function(err, count) {
            return res.render('cms/user/index', {
                layout: 'admin',
                user: user,
                page: page + 1,
                pages: Math.ceil(count / perPage),
                message: req.flash('success'),
                error: req.flash('error')
            });
        });
    });
};

/**
 * New
 */

exports.new = function(req, res) {
    return res.render('cms/user/new', {
        layout: 'admin',
        user: new User({}),
        message: req.flash('success'),
        error: req.flash('error')
    });
};

/**
 * Create
 */
exports.create = function(req, res) {
    var user = new User(req.body);
    user.update(function(err, doc) {
        if (!err) {
            req.flash('success', 'Information updated');
        } else {

            req.flash('error', 'There was an error');
        }
        return res.redirect('/cms/user/');
    });
};

/**
 * Edit
 */
exports.edit = function(req, res) {
    return res.render('cms/user/edit', {
        layout: 'admin',
        user: req.user,
        message: req.flash('success'),
        error: req.flash('error')
    });
};

/**
 * Show
 */
exports.show = function(req, res) {
    return res.render('cms/user/show', {
        layout: 'admin',
        user: req.user,
        message: req.flash('success')
    });
};

/**
 * Delete
 */
exports.destroy = function(req, res) {
    var user = req.user;
    user.remove(function(err) {
        if (err)
            req.flash('success', 'Information updated');
        else
            req.flash('error', 'There was an error');

        res.redirect('/cms/user');
    });
};