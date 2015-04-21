var mongoose = require('mongoose'),
    config = require('../config'),
    User = mongoose.model('User');

exports.index = function(req, res) {
	return res.render('cms/index', {layout: 'admin', title:'Admin', error:req.flash('error')});
};

exports.login = function(req, res) {
	return res.render('cms/login', {layout: 'admin', message:req.flash('login'), error:req.flash('error')});
};

exports.validate = function(req, res, next) {
    if (req.session.logged === true) {
        next();
    } else {
        // req.flash('login', 'Check your credentials, please');
        res.redirect('/cms/login');
    }
};


exports.authenticate = function(req, res, next) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err || !user) {
            req.session.logged = false;
            req.flash('error', 'There was an error');
            return res.redirect('/cms');
        }

        user.comparePassword(req.body.password, function(err, isMatch) {
            if (err || !isMatch) {
                req.session.logged = false;
                req.flash('error', 'There was an error');
                return res.redirect('/cms');
            } else {
                req.session.logged = true;
                return res.redirect('/cms');    
            }
        });

    });
};

exports.signout = function (req, res) {
    req.session.logged = false;
    return res.redirect('/cms')
};
