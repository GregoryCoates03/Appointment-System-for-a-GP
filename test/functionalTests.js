// https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../src/server.js');

chai.use(chaiHttp);


suite('Functional Tests', () => {
    let location;
    suite('Location Tests', () => {
        test('Create Location', async () => {
            const response = await chai
                .request(server)
                .keepOpen()
                .post('/api/locations/')
                .send({
                    location_name: "Test"
                })
    
            assert.equal(response.body[0].location_name, "Test");
            location = response.body[0].location_id;
        });
        
        test('Get Locations', async () => {
            const response = await chai
                .request(server)
                .keepOpen()
                .get('/api/locations/')

            assert.equal(response.body[response.body.length - 1].location_id, location);
            assert.equal(response.body[response.body.length - 1].location_name, "Test");
        })

        test('Update Location', async () => {
            const response = await chai
                .request(server)
                .keepOpen()
                .put('/api/locations/' + location)
                .send({
                    location_name: "Updated"
                })
            
            assert.equal(response.body[response.body.length - 1].location_id, location);
            assert.equal(response.body[response.body.length - 1].location_name, "Updated");
        })
    })
    
    let user;
    const agent = chai.request.agent(server);
    suite('User Tests', () => {
        test('Create New User', async () => {
            const { body } = await chai
                .request(server)
                .keepOpen()
                .post('/api/users/')
                .send({
                    first_name: "Test",
                    family_name: "Test",
                    email: "Test@Test",
                    phone_number: "123-456-789",
                    address: "Test",
                    password: "Test",
                    location_id: location
                });

            //console.log(body[0])
            const { user_id, first_name, family_name, email, phone_number, address, password, location_id, waiting_list_points, admin } = body[0];
            user = user_id;
            assert.equal(first_name, "Test");
            assert.equal(family_name, "Test"),
            assert.equal(email, "Test@Test");
            assert.equal(phone_number, "123-456-789");
            assert.equal(address, "Test");
            // PASSWORD COMPARE WITH BCRYPT
            assert.equal(location_id, location);
            assert.equal(waiting_list_points, 0);
            assert.equal(admin, false);
        });

        test('Get User', async () => {
            const { body } = await chai
                .request(server)
                .keepOpen()
                .get('/api/users/' + user)
            
            const { user_id, first_name, family_name, email, phone_number, address, password, location_id, waiting_list_points, admin } = body[0];
            user = user_id;
            assert.equal(first_name, "Test");
            assert.equal(family_name, "Test"),
            assert.equal(email, "Test@Test");
            assert.equal(phone_number, "123-456-789");
            assert.equal(address, "Test");
            // PASSWORD COMPARE WITH BCRYPT
            assert.equal(location_id, location);
            assert.equal(waiting_list_points, 0);
            assert.equal(admin, false);
        });

        test('Update User', async () => {
            const { body } = await chai
                .request(server)
                .keepOpen()
                .put('/api/users/' + user)
                .send({
                    first_name: "Updated",
                    family_name: "Updated",
                    email: "Updated@Updated",
                    address: "Updated",
                    password: "Updated"
                });

            console.log(body);
            const { first_name, family_name, email, phone_number, address, password } = body[0];
            assert.equal(first_name, "Updated");
            assert.equal(family_name, "Updated"),
            assert.equal(email, "Updated@Updated");
            assert.equal(address, "Updated");
            // PASSWORD COMPARE WITH BCRYPT
        });

        test('Login User', async () => {

            const { body } = await agent
                .post('/api/login/')
                .send({
                    email: "Updated@Updated",
                    password: "Updated"
                });

            assert.equal(body.message, "Valid credentials");
            assert.exists(body.user);
        });

        test('Check User Signed In', async () => {
            const { body } = await agent
                .get('/api/signed-in/');

            assert.equal(body.isAuthenticated, true);
            assert.exists(body.user);
        });
    });
    
    let doctor;
    suite('Doctor Tests', () => {
        test('Create Doctor', async () => {
            const { body } = await chai
                .request(server)
                .keepOpen()
                .post('/api/doctors')
                .send({
                    first_name: "Test",
                    last_name: "Test",
                    location_id: location,
                    start_time: "10:00:00",
                    break_time: "13:00:00",
                    end_time: "17:00:00"
                });

            const { doctor_id, first_name, last_name, location_id, start_time, break_time, end_time } = body[0];
            doctor = doctor_id;
            assert.equal(first_name, "Test");
            assert.equal(last_name, "Test");
            assert.equal(location_id, location);
            assert.equal(start_time, "10:00:00");
            assert.equal(break_time, "13:00:00");
            assert.equal(end_time, "17:00:00");
        });

        test('Get Doctor', async () => {
            const { body } = await chai
                .request(server)
                .keepOpen()
                .get('/api/doctors/' + doctor)
            
            const { doctor_id, first_name, last_name, location_id, start_time, break_time, end_time } = body[0];
            assert.equal(first_name, "Test");
            assert.equal(last_name, "Test");
            assert.equal(location_id, location);
            assert.equal(start_time, "10:00:00");
            assert.equal(break_time, "13:00:00");
            assert.equal(end_time, "17:00:00");
        });

        test('Get Doctors Who Work For Location', async () => {
            const { body } = await chai
                .request(server)
                .keepOpen()
                .get('/api/locations/' + location);

            assert.equal(body.length, 1);
        });

        test('Update Doctor', async () => {
            const { body } = await chai
                .request(server)
                .keepOpen()
                .put('/api/doctors/' + doctor)
                .send({
                    first_name: "Updated",
                    last_name: "Updated",
                    start_time: "11:00:00",
                    break_time: "14:00:00",
                    end_time: "18:00:00"
                })
            
            const { first_name, last_name, start_time, break_time, end_time } = body[0];

            assert.equal(first_name, "Updated");
            assert.equal(last_name, "Updated");
            assert.equal(start_time, "11:00:00");
            assert.equal(break_time, "14:00:00");
            assert.equal(end_time, "18:00:00");
        });
    });
    
    let appointment;
    suite('Appointment Tests', () => {
        test('Book Appointment', async () => {
            const { body } = await agent
                .post('/api/appointments/')
                .send({
                    location_id: location,
                    doctor_id: doctor,
                    time: "10:00:00",
                    date: "2024/03/23"
                });

            const { appointment_id, location_id, doctor_id, time, date } = body[0];
            appointment = appointment_id;
            assert.equal(location_id, location);
            assert.equal(doctor_id, doctor);
            assert.equal(time, "10:00:00");
            assert.equal(date, "2024-03-23T00:00:00.000Z");
            console.log(body);
        });
    })

    suite('Delete Tests', () => {
        test('Delete Appointment', async () => {
            const response = await chai
                .request(server)
                .keepOpen()
                .delete('/api/appointments/' + appointment);

            //console.log(response.body);
            assert.equal(response.body.message, "Deleted Appointment");
        });

        test('Delete User', async () => {
            const response = await chai
                .request(server)
                .keepOpen()
                .delete('/api/users/' + user);
    
            assert.equal(response.body.message, "Deleted User");
        });

        test('Delete Doctor', async () => {
            const response = await chai
                .request(server)
                .keepOpen()
                .delete('/api/doctors/' + doctor);
            
            assert.equal(response.body.message, "Deleted Doctor");
        });

        test('Delete Location', async () => {
            const response = await chai
                .request(server)
                .keepOpen()
                .delete('/api/locations/' + location);

            assert.equal(response.body.message, "Deleted Location");
        });
    });
});