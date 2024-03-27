const bcrypt = require('bcrypt');
const passport = require('passport');
const sendEmail = require('./email');
require('dotenv').config({ path: 'secret.env'});
const saltRounds = 12;

module.exports = (app, db) => {
    const updateCategories = (body) => {
        let update = '';
        let i = 2;
        for (key in body) {
            update += `${key} = $${i}`
            if (i <= Object.keys(body).length){
                update += ', ';
            }
            i++;
        }
        return update;
    };
    
    app.route('/api/users/:user_id')
    .get(async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM users WHERE user_id = $1;', [req.params.user_id]); // Parameterised queries prevent SQL injection
            if (result.rows.length === 0){
                res.status(404).send('No User Found');
            } else {
                res.json(result.rows);
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })
    .put(async (req, res) => {
        try {
            if (req.body.password !== undefined && req.body.password != "") {
                req.body.password = await bcrypt.hash(req.body.password, saltRounds);
            }
            console.log("dddddddddddddd" + req.body);
            let result = await db.query(`UPDATE users SET ${updateCategories(req.body)} WHERE user_id = $1 RETURNING *;`, [req.params.user_id, ...Object.values(req.body)]);
            console.log(result);
            res.send(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })
    .delete(async (req, res) => {
        try {
            const result = await db.query('DELETE FROM users WHERE user_id = $1 RETURNING *;', [req.params.user_id]);
            res.send({
                message: "Deleted User"
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })
    
    app.route('/api/users/')
    .post(async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password || '', saltRounds);
            
            const result = await db.query(`INSERT INTO users (first_name, family_name, email, phone_number, address, password, location_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`, [
                req.body.first_name || '',
                req.body.family_name || '',
                req.body.email || '',
                req.body.phone_number || '',
                req.body.address || '',
                hashedPassword || '',
                req.body.location_id || ''
            ]);
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })

    app.route('/api/exists/')
    .post(async (req, res) => {
        try {
            const result = await db.query(`SELECT email, password, user_id FROM users WHERE email = $1;`, [req.body.email]);
            if (result.rows.length > 0) {
                if (result.rows[0].user_id != req.body.user_id){
                   res.json({ exists: true });
                } else {
                    res.json({ exists: false });
                }
            } else {
                res.json({ exists: false });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    })
    
    app.route('/api/login/')
    .post(passport.authenticate('local'), (req, res) => {
            res.json({ message: `Valid credentials`, user: req.user });
        });

    app.route('/api/appointments/:appointment_id')
    /*
    .get(async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM appointments WHERE user_id = $1;', [req.params.user_id]);
            if (result.rows.length === 0){
                res.status(404).send('No Appointment Found');
            } else {
                res.json(result.rows);
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })*/
    .put(async (req, res) => {
        try {
            let result = await db.query(`UPDATE appointments SET ${updateCategories(req.body)} WHERE appointment_id = $1 RETURNING *;`, [req.params.appointment_id, ...Object.values(req.body)]);
            res.send(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })
    .delete(async (req, res) => {
        try {
            const result = await db.query('DELETE FROM appointments WHERE appointment_id = $1 RETURNING *;', [req.params.appointment_id]);
            res.json({
                message: "Deleted Appointment"
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })

    app.route('/api/signed-in/')
    .get((req, res) => {
        try {
            console.log(req.session);
            if (req.isAuthenticated()){
                res.json({ isAuthenticated: true, user: req.user })
            } else {
                res.json({ isAuthenticated: false, user: req.user });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    })

    app.route('/api/get-user/')
    .get((req, res) => {
        try {
            res.json(req.user);
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    })
    
    app.route('/api/appointments/')
    .get(async (req, res) => {
        try {
            const result = await db.query('SELECT appointments.*, locations.location_name, doctors.first_name, doctors.last_name FROM appointments NATURAL JOIN locations NATURAL JOIN doctors WHERE user_id = $1;', [req.user.user_id]);
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })
    .post(async (req, res) => {
        try {
            const result = await db.query('INSERT INTO appointments (user_id, doctor_id, time, date, location_id) VALUES ($1,$2,$3,$4,$5) RETURNING *;', [req.user.user_id, req.body.doctor_id, req.body.time, req.body.date, req.body.location_id]);
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })

    app.route('/api/log-out/')
    .get((req, res) => {
        req.logout((err) => {
            if(err) {
                console.log(err);
            }
            res.json({ message: 'Logged out' });
        })
    })

    app.route('/api/locations/')
    .get(async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM locations;');
            res.json(result.rows);
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    })
    .post(async (req, res) => {
        try {
            const result = await db.query('INSERT INTO locations (location_name) VALUES ($1) RETURNING *;', [req.body.location_name]);
            res.json(result.rows);
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    })

    app.route('/api/doctors/')
    .get(async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM doctors;');
            res.json(result.rows);
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    })
    .post(async (req, res) => {
        try {
            const result = await db.query('INSERT INTO doctors (first_name, last_name, location_id, start_time, end_time, break_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', [req.body.first_name, req.body.last_name, req.body.location_id, req.body.start_time, req.body.end_time, req.body.break_time]);
            res.json(result.rows);
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    })

    app.route('/api/location/:location_id')
    .get(async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM locations WHERE location_id = $1;', [req.params.location_id]);
            res.json(result.rows);
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    })

    app.route('/api/locations/:location_id')
    .get(async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM doctors WHERE location_id = $1', [req.params.location_id]);
            res.json(result.rows);
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    })
    .put(async (req, res) => {
        try {
            let result = await db.query(`UPDATE locations SET location_name = $1 WHERE location_id = $2 RETURNING *;`, [req.body.location_name, req.params.location_id]);
            res.send(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })
    .delete(async (req, res) => {
        try {
            const result = await db.query('DELETE FROM locations WHERE location_id = $1 RETURNING *;', [req.params.location_id]);
            res.json({
                message: "Deleted Location"
            })
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    })

    app.route('/api/doctors/:doctor_id')
    .get(async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM doctors WHERE doctor_id = $1;', [req.params.doctor_id]);
            res.json(result.rows);
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    })
    .put(async (req, res) => {
        try {
            const result = await db.query(`UPDATE doctors SET ${updateCategories(req.body)} WHERE doctor_id=$1 RETURNING *;`, [req.params.doctor_id, ...Object.values(req.body)]);
            res.json(result.rows);
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    })
    .delete(async (req, res) => {
        try {
            const result = await db.query('DELETE FROM doctors WHERE doctor_id = $1 RETURNING *;', [req.params.doctor_id]);
            res.json({
                message: "Deleted Doctor"
            })
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    })

    app.route('/api/booked-appointments/:location_id/:doctor_id/:date/')
    .get(async (req, res) => {
        try {
            const result = await db.query('SELECT a.time FROM appointments AS a NATURAL JOIN doctors AS d NATURAL JOIN locations AS l WHERE a.date = $1 AND d.doctor_id = $2 AND l.location_id = $3;', [req.params.date, req.params.doctor_id, req.params.location_id]);
            res.json(result.rows);
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    })

    app.route('/api/confirmation/')
    .post(async (req, res) => {
        const mailOptions = {
            from: process.env.EMAIL_EMAIL,
            to: req.user.email,
            subject: 'Appointment Confirmation',
            text: req.body.text
        }

        sendEmail(mailOptions);
        res.json('Email Sent');
    })

    app.route('/api/available-appointment')
    .post(async (req, res) => {
        const mailOptions = {
            from: process.env.EMAIL_EMAIL,
            to: req.body.email,
            subject: 'Available Appointment',
            html: ` <div>
                        <p>A patient has cancelled an appointment so it is now available for you. Click the link below if you would like to book it.<p>
                        <a href=\"http://localhost:3000/appointments/${req.body.location_id}/${req.body.doctor_id}/${encodeURIComponent(new Date(req.body.date).toLocaleDateString())}/${req.body.time}?cancellation=true\">Book Here</a>
                    </div>
                `
        }

        sendEmail(mailOptions);
    })

    app.route('/api/upgrade')
    .put(async (req, res) => {
        try {
            const result = await db.query('UPDATE users SET doctor_id=$1 WHERE email=$2 RETURNING *;', [req.body.doctor_id, req.body.email]);
            res.json(result.rows);
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    })

    app.route('/api/get-appointments/:doctor_id')
    .get(async (req, res) => {
        try {
            const result = await db.query('SELECT users.first_name, users.family_name, appointments.time, appointments.date FROM appointments JOIN users ON appointments.user_id=users.user_id WHERE appointments.doctor_id=$1;', [req.params.doctor_id]);
            res.json(result.rows);
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    });

    app.route('/api/join-waiting-list')
    .post(async (req, res) => {
        try {
            const result = await db.query('INSERT INTO waiting_list (user_id, location_id, doctor_id, date) VALUES ($1, $2, $3, $4) RETURNING *;', [req.user.user_id, req.body.location_id, req.body.doctor_id, req.body.date]);
            res.json(result.rows);
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    });

    app.route('/api/waiting-list')
    .get(async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM waiting_list WHERE user_id=$1;', [req.user.user_id]);
            res.json(result.rows);
        } catch (err) {
            res.status(500).send('Internal Server Error');
        }
    });

    app.route('/api/check-waiting-list')
    .get(async (req, res) => {
        try {
            const result = await db.query('SELECT w.waiting_list_id, w.user_id, u.waiting_list_points FROM waiting_list AS w JOIN users AS u ON w.user_id=u.user_id WHERE w.date=$1 AND w.doctor_id=$2 AND w.location_id=$3;', [req.query.date, req.query.doctor_id, req.query.location_id]);
            res.json(result.rows);
        } catch (err) {
            res.status(500).send('Internal Server Error');
        }
    })
    .delete(async (req, res) => {
        try {
            const result = await db.query('DELETE FROM waiting_list WHERE user_id=$1 AND doctor_id=$2 AND location_id=$3 AND date=$4 RETURNING *;', [req.user.user_id, req.query.doctor_id, req.query.location_id, req.query.date]);
            res.json(result.rows);
        } catch (err) {
            res.status(500).send('Internal Server Error');
        }
    })

    app.route('/api/increment')
    .put(async (req, res) => {
        try {
            const result = await db.query('UPDATE users SET waiting_list_points=waiting_list_points+1 WHERE user_id=$1 RETURNING *;', [req.user.user_id]);
            res.json(result.rows);
        } catch (err) {
            console.log(err);
        }
    });

    app.route('/api/reset')
    .put(async (req, res) => {
        try {
            const result = await db.query('UPDATE users SET waiting_list_points=0 WHERE user_id=$1 RETURNING *;', [req.user.user_id]);
            res.json(result.rows);
        } catch (err) {
            console.log(err);
        }
    })

    app.route('/api/risk')
    .put(async (req, res) => {
        try {
            const result = await db.query('UPDATE users SET at_risk=$1 WHERE email=$2 RETURNING *;', [req.body.risk, req.body.email]);
            res.json(result.rows);
        } catch (err) {
            console.log(err);
        }
    })

    app.route('/api/email-list')
    .get(async (req, res) => {
        try {
            console.log(req.query.date);
            const result = await db.query('SELECT a.time, a.date, u.email FROM appointments AS a JOIN users AS u ON a.user_id=u.user_id WHERE date = $1;', [req.query.date]);
            res.json(result.rows);
        } catch (err) {
            console.log(err);
        }
    })
}