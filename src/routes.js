const bcrypt = require('bcrypt');
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
            let result = await db.query(`UPDATE users SET ${updateCategories(req.body)} WHERE user_id = $1 RETURNING *;`, [req.params.user_id, ...Object.values(req.body)]);
            res.send(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })
    .delete(async (req, res) => {
        try {
            let result = await db.query('DELETE FROM users WHERE user_id = $1 RETURNING *;', [req.params.user_id]);
            res.send(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })
    
    app.route('/api/users/')
    .post(async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password || '', saltRounds);
            
            const result = await db.query(`INSERT INTO users (first_name, family_name, email, phone_number, address, password, preferred_doctors) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`, [
                req.body.first_name || '',
                req.body.family_name || '',
                req.body.email || '',
                req.body.phone_number || '',
                req.body.address || '',
                hashedPassword || '',
                req.body.preferred_doctors || ''
            ]);
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })
    .get(async (req, res) => {
        try {
            const result = await db.query(`SELECT email FROM users WHERE email = $1;`, [req.query.email]);

            if (result.rows.length > 0) {
                res.json(`Email already exists`);
            } else {
                res.json(`Email doesn't exist`);
            }
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    })
    
    app.route('/api/appointments/:appointment_id')
    .get(async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM appointments WHERE appointment_id = $1;', [req.params.appointment_id]);
            if (result.rows.length === 0){
                res.status(404).send('No Appointment Found');
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
            res.send(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })
    
    app.route('/api/appointments/')
    .post(async (req, res) => {
        try {
            const result = await db.query('INSERT INTO appointments (user_id, appointment_type, practitioner, time, date) VALUES ($1,$2,$3,$4,$5) RETURNING *;', [req.body.user_id, req.body.appointment_type, req.body.practitioner, req.body.time, req.body.date]);
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })
}