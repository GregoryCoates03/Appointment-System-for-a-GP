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
        
        test('Get Locations / Test New Location Added', async () => {
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
                    preferred_doctors: "Test"
                });

            //console.log(body[0])
            const { user_id, first_name, family_name, email, phone_number, address, password, preferred_doctors, waiting_list_position, admin } = body[0];
            user = user_id;
            assert.equal(first_name, "Test");
            assert.equal(family_name, "Test"),
            assert.equal(email, "Test@Test");
            assert.equal(phone_number, "123-456-789");
            assert.equal(address, "Test");
            // PASSWORD COMPARE WITH BCRYPT
            assert.equal(preferred_doctors, "Test");
            assert.equal(waiting_list_position, 0);
            assert.equal(admin, false);
        });

        test('Get User', async () => {
            const { body } = await chai
                .request(server)
                .keepOpen()
                .get('/api/users/' + user)
            
            const { user_id, first_name, family_name, email, phone_number, address, password, preferred_doctors, waiting_list_position, admin } = body[0];
            user = user_id;
            assert.equal(first_name, "Test");
            assert.equal(family_name, "Test"),
            assert.equal(email, "Test@Test");
            assert.equal(phone_number, "123-456-789");
            assert.equal(address, "Test");
            // PASSWORD COMPARE WITH BCRYPT
            assert.equal(preferred_doctors, "Test");
            assert.equal(waiting_list_position, 0);
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
                    password: "Updated",
                    preferred_doctors: "Updated"
                });

            const { first_name, family_name, email, phone_number, address, password, preferred_doctors } = body[0];
            assert.equal(first_name, "Updated");
            assert.equal(family_name, "Updated"),
            assert.equal(email, "Updated@Updated");
            assert.equal(address, "Updated");
            // PASSWORD COMPARE WITH BCRYPT
            assert.equal(preferred_doctors, "Updated");
        });

        const agent = chai.request.agent(server)
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
            
            console.log(body);
        });

    })
    
    let doctor;
    suite('Doctor Tests', () => {
        test('Create Doctor', async () => {
            const response = await chai
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
        });
    })

    suite('Delete Tests', () => {
        test('Delete User', async () => {
            const response = await chai
                .request(server)
                .keepOpen()
                .delete('/api/users/' + user);
    
            assert.equal(response.body, "DELETED USER");
        });
    });
    /*test('Create New User', async () => {
        //const hashedPassword = await bcrypt.hash("E", 12);
        const response = await chai
            .request(server)
            .post('/api/users/')
            .send({
                first_name: "A",
                family_name: "B",
                email: "Test@Test",
                phone_number: 1,
                address: "D",
                password: "E",
                preferred_doctors: "Test"
            });
        
        console.log("aaaaaa" + response.body)

        assert.equal(response.body.first_name, "A");
    })*/
})