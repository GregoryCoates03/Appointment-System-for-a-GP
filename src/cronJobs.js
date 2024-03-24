// https://www.npmjs.com/package/node-cron
// https://www.w3schools.com/nodejs/nodejs_email.asp

const cron = require('node-cron');
const sendEmail = require('./email');

const task = cron.schedule('1-59 * * * *', () => {
    /*sendEmail({
        from: process.env.EMAIL_EMAIL,
        to: process.env.EMAIL_EMAIL,
        subject: 'Test',
        text: 'Test'
    });*/
}, {
    scheduled: true,
    timezone: "Europe/London"
});

module.exports = task;