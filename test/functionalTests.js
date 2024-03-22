// https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../src/server.js');

chai.use(chaiHttp);


suite('Functional Tests', () => {
    test('Create New User', async () => {
        const hashedPassword = await bcrypt.hash("E", 12);
        const response = await chai
            .request(server)
            .keepOpen()
            .post('/api/users/')
            .send({
                first_name: "A",
                family_name: "B",
                email: "C",
                phone_number: 1,
                address: "D",
                password: hashedPassword,
                preferred_doctors: "F"
            });
        
        console.log("aaaaaa" + response.body)

        assert.equal(response.body.first_name, "A");
    })
})