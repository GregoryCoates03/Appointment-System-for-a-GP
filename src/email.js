const nodemailer = require("nodemailer")
require('dotenv').config({ path: 'secret.env'});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_EMAIL,
        pass: process.env.EMAIL_PASS
    }
})

const sendEmail = (options) => {
    transporter.sendMail(options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email Sent: ' + info.response);
        }
    });
};

module.exports = sendEmail;