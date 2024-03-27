// https://www.npmjs.com/package/node-cron
// https://www.w3schools.com/nodejs/nodejs_email.asp

const cron = require('node-cron');
const sendEmail = require('./email');
const axios = require('axios');
require('dotenv').config({ path: 'secret.env'});

const task = cron.schedule('*/10 * * * *', async () => {
    const date = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(date.getDate() + 1);

    const { data } = await axios.get(`http://localhost:3001/api/email-list?date=${tomorrow.toLocaleDateString()}`);

    data.forEach((appointment) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const time = `${String(hours).length === 1 ? "0" + hours : hours}:${String(minutes).length === 1 ? "0" + minutes : minutes}:00`;

        if (appointment.time === time) {
            //console.log("aaaaa");
            sendEmail({
                from: process.env.EMAIL_EMAIL,
                to: appointment.email,
                subject: 'Appointment Reminder',
                text: `Reminder of your appointment on the ${new Date(appointment.date).toLocaleDateString()} at ${appointment.time}.`
            });
        }
    });
}, {
    scheduled: true,
    timezone: "Europe/London"
});

module.exports = task;