var router = require('express').Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    from: 'mjsnoop@gmail.com',
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
        user: '****',
        pass: '****'
    }
});

router.post('/email', function (req, res, next) {
    console.log("EMAIL BODY", req.body)
    var mailOptions = {
        to: '503lamb@gmail.com',
        subject: 'New Email From Landing Page',
        html: `
        <div class="header">
            <p>From: ${req.body.name}</p>
            <p>Contact Email: ${req.body.email}</p>
            <p>Email Type: ${req.body.msgType}</p>
        </div>
        </hr>
        <div class="body">
            <p>Message: ${req.body.body}</p>
        </div>  
        `,
    };
    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.send({
                message: 'API ERROR',
                error
            })
        } else {
            res.send({
                response: "Sent"
            })
        }
    })
})

module.exports = {
    router
};