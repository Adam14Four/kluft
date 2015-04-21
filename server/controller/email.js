var config = require('../config'),
    sendgrid  = require('sendgrid')(config.sendgrid.user,config.sendgrid.Kairiangel01);

exports.send = function (req, res) {
	sendgrid.send({
        to: 'QandA@ESKluft.com',
        from: req.body.email,
        subject: 'Aireloom Form Contact',
        text: req.body.message
    }, function(err, json) {
        if (err) return console.error(err);
        sendgrid.send({
            to: req.body.email,
            from: 'QandA@ESKluft.com',
            subject: 'Re: your Aireloom request',
            text: 'Hello,\nThank you for reaching out to E.S. Kluft & Company. Your query is important to us.\nWe typically answer emails within 2 business days of receiving them. Our business hours are Monday through Friday 10AM – 6PM PST.\n\nSincerely,\nThe E.S. Kluft & Company team'
        });
    });
}