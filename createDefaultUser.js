var config = require('./server/config'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    db = mongoose.connection;

/**
 * DB connection
 */
var connect = function() {
    var options = {
        server: {
            socketOptions: {
                keepAlive: 1
            },
            replset: {
                socketOptions: {
                    keepAlive: 1
                }
            }
        }
    };
    mongoose.connect(config.db.prefix + config.db.user + ':' + config.db.password + '@' + config.db.host, options);
};

mongoose.set('debug', true);
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
mongoose.connection.on('open', function() {

    // register user
    require('./server/model/user');

    // require user
    var User = mongoose.model('user');


    // parse result
    var user = new User({
        username: 'admin',
        password: 'hadouken'
    }).save(function(err) {
        if (err) console.log('ERROR:', err);
    });

});

// run!
connect();