var config = function() {

    var env = process.env.NODE_ENV || 'development';

    // if you have multiple envs, you can have a switch case here
    var config = {
        "sendgrid": {
            "user": "calebjeffrey",
            "pass": "Kairiangel01"
        },
        "db": {
            "prefix": "mongodb://",
            "user": "heroku_app33332395",
            "password": "icfguqap4qvq24skvl29e9afb4",
            "host": "ds031711.mongolab.com:31711/heroku_app33332395"
        }
    };

    return config;
};

module.exports = config();