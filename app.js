/**
 * Module dependencies.
 */
var express = require('express'),
    methodOverride = require('method-override'),
    path = require('path'),
    bodyParser = require('body-parser'),
    config = require('./server/config'),
    session = require('express-session'),
    exphbs = require('express-handlebars'),
    multipart = require('connect-multiparty'),
    MongoStore = require('connect-mongo')(session),
    mongoose = require('mongoose'),
    flash = require('connect-flash');

// create express instance
var app = express();

// adding handlebars
app.set('views', path.join(__dirname + '/server', 'view'));
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: "./server/view/layouts/",
    partialsDir: "./server/view/partials/",
    helpers: {
        pagination: function(pages, current, section) {
            var content = "";
            for (var i = 1; i < pages + 1; i++) {
                if (i != current)
                    content += '<li><a href="/cms/' + section + '/page/' + i + ' ">' + i + '</a></li>'
                else
                    content += '<li class="active"><a href="/cms/' + section + '/page/' + i + ' ">' + i + '</a></li>'
            };
            return content
        }
    }
}));
app.set('view engine', '.hbs');


// static folder setup
app.use(express.static(path.join(__dirname, './static/')));

// initialize authentication
// cors
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

    next();
});

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use(multipart());

var db = new require('./server/database')();
db.on('done', function() {
    app.use(session({
    secret: 'kluftAdmin',
    store: new MongoStore({
            mongooseConnection: mongoose.connection
        }),
    saveUninitialized: false,
    resave: false
}));


app.use(flash());
app.use(function(req, res, next) {
    // if there's a flash message in the session request,
    // make it available in the response, then delete it
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

// load database

    // load all the routes
    var router = require('./server/route/index');
    app.use(router);
});

// listen
app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'));