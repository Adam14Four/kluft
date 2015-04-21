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
            "user": "heroku_app33289949",
            "password": "3lq8382g6bv82r4ki96is9qq69",
            "host": "ds061721.mongolab.com:61721/heroku_app33289949"
        }
    }
    
    return config;
};

module.exports = config();