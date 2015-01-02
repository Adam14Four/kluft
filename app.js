/**
 * Module dependencies.
 */
var express = require('express'),
    path = require('path');
    // fav
// statics
// create express instance
var app = express();

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

// app.use(methodOverride(function(req, res) {
//     if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//         // look in urlencoded POST bodies and delete it
//         var method = req.body._method;
//         delete req.body._method;
//         return method;
//     }
// }));



// icon-website-staging
// icon-website

// define database connection & middleware

app.get('*', function(req, res){
    res.sendfile(__dirname + '/static/index.html');
});

// listen
app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'));
