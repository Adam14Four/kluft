/**
 * Module dependencies.
 */
var express = require('express'),
    nodemailer = require('nodemailer'),
    methodOverride = require('method-override'),
    path = require('path');

var bodyParser = require('body-parser');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'server.kluft@gmail.com',
        pass: 'kluft2015'
    }
});

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

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies

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

app.post('/form', function(req, res) {
    var mailOptions = {
        from: req.body.email, // sender address
        to: 'server.kluft@gmail.com', // list of receivers
        subject: 'Kluft Form Contact', // Subject line
        text: req.body.message, // plaintext body
        html: req.body.message // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });

    res.send(200);
});

app.get('*', function(req, res){
    res.sendfile(__dirname + '/static/index.html');
});

// listen
app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'));
