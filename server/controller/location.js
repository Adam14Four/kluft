var mongoose = require('mongoose'),
    Location = mongoose.model('Location'),
    multiparty = require('multiparty'),
    extend = require('util')._extend;

exports.load = function(req, res, next, id) {
    Location.load(id, function(err, location) {
        if (err) return next(err);
        if (!location) return next(new Error('not found'));
        req.location = location;
        next();
    });
};

exports.loadBySlug = function(req, res, next, id) {
    Location.loadBySlug(req.param('locationSlug'), function(err, location) {
        if (err) return next(err);
        if (!location) return next(new Error('not found'));
        req.location = location;
        next();
    });
};


exports.index = function(req, res) {
    var page = (req.param('page') > 0 ? req.param('page') : 1) - 1;
    var perPage = 30;
    var options = {
        perPage: perPage,
        page: page
    };

    Location.list(options, function(err, location) {
        if (err) return res.render('500');
        Location.count().exec(function(err, count) {
            return res.render('cms/location/index', {
                layout: 'admin',
                location: location,
                page: page + 1,
                pages: Math.ceil(count / perPage),
                message: req.flash('success'),
                error: req.flash('error')
            });
        });
    });
};

exports.new = function(req, res) {
    return res.render('cms/location/new', {
        layout: 'admin',
        location: new Location({}),
        message: req.flash('success'),
        error: req.flash('error')
    });
};

exports.create = function(req, res) {
    var location = new Location(req.body);

    if (parseFloat(req.body.lng) !== NaN)
        location.geo = [parseFloat(req.body.lat), parseFloat(req.body.lng)];

    location.update(function(err) {
        if (!err) {
            req.flash('success', 'Information updated');
            console.log(err)
        } else {
            req.flash('error', 'There was an error');
        }
        return res.redirect('/cms/location/');
    });
};

exports.edit = function(req, res) {
    return res.render('cms/location/edit', {
        layout: 'admin',
        location: req.location,
        message: req.flash('success'),
        error: req.flash('error')
    });
};

exports.update = function(req, res) {

    var location = req.location;
        location = extend(location, req.body);

    if (parseFloat(req.body.lng) !== NaN)
        location.geo = [parseFloat(req.body.lat), parseFloat(req.body.lng)];

    location.update(function(err) {
        if (!err) {
            req.flash('success', 'Information updated');
            console.log(err)
        } else {
            req.flash('error', 'There was an error');
        }
        return res.redirect('/cms/location/');
    });
};

exports.all = function(req, res) {
    Location.listAll(function(err, location) {
        return res.send(location);
    });
};

exports.show = function(req, res) {
    return res.send(req.location);
};

exports.destroy = function(req, res) {
    var location = req.location;
    location.remove(function(err) {
        req.flash('success', 'Information updated');
        res.redirect('/cms/location');
    });
};