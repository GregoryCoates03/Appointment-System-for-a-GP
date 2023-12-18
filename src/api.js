const express = require('express');
const app = express();
const port = 3001;
const db = require('./db.js')

app.use(express.json())

app.route('/api/users/:user_id')
    .get(async (req, res) => {
        try {
            console.log(req.query)
            const result = await db.query('SELECT * FROM users WHERE user_id = $1;', [req.params.user_id]); // Parmeterised queries prevent SQL injection
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })
    .put(async (req, res) => {
        try {
            console.log(req.body);
            let update = '';
            let i = 2;
            for (key in req.body) {
                update += `${key} = $${i}`
                if (i <= Object.keys(req.body).length){
                    update += ', ';
                }
                i++;
            }
            let result = await db.query('SELECT * FROM users WHERE user_id = $1;', [req.params.user_id]);
            console.log(update)
            result = await db.query(`UPDATE users SET ${update} WHERE user_id = $1;`, [req.params.user_id, ...Object.values(req.body)]);
            res.send(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })
    .delete(async (req, res) => {
        try {
            let result = await db.query('DELETE FROM users WHERE user_id = $1;', [req.params.user_id]);
            res.send(result);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })

app.route('/api/users/')
    .post(async (req, res) => {
        try {
            console.log(req.body);
            const result = await db.query(`INSERT INTO users (first_name, family_name, email, phone_number, address, password, preferred_doctors) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [
                req.body.first_name || '',
                req.body.family_name || '',
                req.body.email || '',
                req.body.phone_number || '',
                req.body.address || '',
                req.body.password || '',
                req.body.preferred_doctors || ''
            ]);
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })
   /*.get('/appointments/', async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM users;');
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })*/

app.route('/api/appointments/:appointment_id')

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})