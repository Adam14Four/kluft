var config = require('../config'),
    sendgrid  = require('sendgrid')(config.sendgrid.user,config.sendgrid.pass);

exports.send = function (req, res) {
    var emailID = Math.floor(Math.random() * 1000) + 1;
	sendgrid.send({
        to: 'QandA@ESKluft.com',
        from: req.body.email,
        subject: 'Kluft Form Contact ID#' + emailID,
        text: req.body.message
    }, function(err, json) {
        if (err) return res.send("{success:false}");
        sendgrid.send({
            to: req.body.email,
            from: 'QandA@ESKluft.com',
            subject: 'Re: your Kluft request',
            text: 'Hello,\nThank you for reaching out to E.S. Kluft & Company. Your query is important to us.\nWe typically answer emails within 2 business days of receiving them. Our business hours are Monday through Friday 10AM – 6PM PST.\n\nSincerely,\nThe E.S. Kluft & Company team'
        });

        return res.send("{success:true}");
    });
}