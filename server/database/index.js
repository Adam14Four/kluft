var events = require('events');
function db () {
    var config = require('../config'),
        mongoose = require('mongoose'),
        fs = require('fs'),
        db = mongoose.connection;

    // Connect to mongodb
    var connect = function () {
      var options = { server: { socketOptions: { keepAlive: 1 }, replset: { socketOptions: { keepAlive: 1 } } } };
      mongoose.connect(config.db.prefix + config.db.user + ':' + config.db.password + '@' + config.db.host, options);
    };

    mongoose.set('debug', false);
    mongoose.connection.on('error', console.log);
    mongoose.connection.on('disconnected', connect);
    mongoose.connection.on('open', function () {
        console.log('---- registering models ----');
    
        require('../model/location');
        require('../model/user');
        
        db.emit('done');
    });

    connect();

    return db;
}


db.prototype = new events.EventEmitter;


module.exports = db;
