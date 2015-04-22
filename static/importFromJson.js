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

    // register location
    require('./server/model/location');

    // require model
    var Location = mongoose.model('Location');

    // read the json file
    fs.readFile('locations.json', function(err, data) {
        if (err) {
            throw err;
        }
        // parse result
        var locations = JSON.parse(data);

        // loop
        for (var i = 0; i < locations.length; i++) {
            // convert object into a new instance of the model
            var doc = new Location(locations[i]);
                doc.geo = [locations[i].lat, locations[i].lng];

            // save
            doc.save(function(err, doc) {
                // in case of error, tell a joke
                if(err) console.log('ERROR:', err);
            });
        };
    });


});

// run!
connect();