process.env.NODE_ENV = 'test';
const server = require('../../src/app');
const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Validates the course endpoint', () => {
    let signupBody = {
        fullName: 'test',
        email: "test123@gmail.com",
        role: 'admin',
        password: 'test1234'
    };
    let signinBody = {
        email: "test123@gmail.com",
        password: 'test1234'
    }
    let jwtToken = '';

    beforeEach((done) => {
        chai.request(server).post('/register').send(signupBody).end((err, res) => {
            chai.request(server).post('/login').send(signinBody).end((err2, res2) => {
                jwtToken = res2.body.accessToken;
                done();
            });
        });
    });

    it("Validates that authenticated user should be able to get courses", (done) => {
        chai.request(server).get('/courses').set('authorization', jwtToken).end((err, res) => {
            expect(res.status).equal(200);
    
            expect(res.body.airtribe.length).equal(2);
            done();
        });
    });

    it("In case of no authorization header, courses should not be allowed to accesssed", (done) => {
        chai.request(server).get('/courses').end((err, res) => {
            expect(res.status).equal(403);
            expect(res.body.message).equal('Authorization header not found');
            done();
        });
    });

    it("In case of invalid token, courses should not be allowed to accssed", (done) => {
        chai.request(server).get('/courses').set('authorization', jwtToken + 'fhdfhhfhf').end((err, res) => {
            expect(res.status).equal(403);
            expect(res.body.message).equal('Header verification failed');
            done();
        });
    });
});