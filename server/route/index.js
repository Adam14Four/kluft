var express = require('express');
var router = express.Router(),
    user = require('../controller/user'),
    location = require('../controller/location'),
    admin = require('../controller/admin'),
    path = require('path'),
    email = require('../controller/email');

router.param('locationId', location.load);
router.param('locationSlug', location.loadBySlug);
router.post('/cms/location', location.create);
router.post('/cms/location/:locationId', location.update);
router.get('/cms/location/', location.index);
router.get('/cms/location/download', location.download);
router.get('/cms/location/search_title/:searchTerm', location.searchTitle);
router.get('/cms/location/search_city/:searchTerm', location.searchCity);
router.get('/cms/location/search_state/:searchTerm', location.searchState);
router.get('/cms/location/search_zipcode/:searchTerm', location.searchZipcode);
router.get('/cms/location/page/:page', location.index);
router.get('/cms/location/new', admin.validate, location.new);
router.get('/cms/location/:locationId', admin.validate, location.edit);
router.get('/cms/location/:locationId/destroy', admin.validate, location.destroy);
router.get('/api/v1/location/:locationSlug', location.show);
router.get('/api/v1/location', location.all);

router.param('uid', user.load);
router.get('/cms/user', admin.validate, user.index);
router.get('/cms/user/new', admin.validate, user.new);
router.post('/cms/user', admin.validate, user.create);
router.get('/cms/user/:uid', admin.validate, user.show);
router.get('/cms/user/:uid/destroy', admin.validate, user.destroy);

router.get('/cms', admin.validate, admin.index);
router.get('/cms/login', admin.login);
router.post('/cms/login', admin.authenticate);
router.get('/cms/signout', admin.signout);

router.post('/form', email.send);

router.get('*', function(req, res) {
    res.sendFile(path.resolve('.') + '/static/index.html');
});



module.exports = router;